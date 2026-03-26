"use client";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

type Patient = {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthday: string;
    gender: string;
    nationality: string;
    address: string;
    emergencyContact: { name: string; relationship: string };
    religion: string;
    email: string;
    phone: string;
};

const nationalities = [
    { value: "TH", label: "Thai" },
    { value: "US", label: "American" },
    { value: "GB", label: "British" },
    { value: "CN", label: "Chinese" },
    { value: "JP", label: "Japanese" },
    { value: "KR", label: "Korean" },
    { value: "SG", label: "Singaporean" },
    { value: "IN", label: "Indian" },
    { value: "AU", label: "Australian" },
];

const inputCls =
    "w-full border-2 border-[oklch(28.2%_0.091_267.935)] rounded-[10px] h-[33px] px-[8px] text-[13px] outline-none bg-white";
const selectCls =
    "w-full border-2 border-[oklch(28.2%_0.091_267.935)] rounded-[10px] h-[33px] px-[8px] text-[13px] outline-none bg-white";

function getInitials(p: Patient) {
    return `${p.firstName?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.toUpperCase();
}

function getNationalityLabel(val: string) {
    return nationalities.find((n) => n.value === val)?.label ?? val ?? "—";
}

const AVATAR_COLORS = [
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-cyan-100 text-cyan-700",
];

function PatientFields({
    patient,
    form,
    editing,
    setForm,
}: {
    patient: Patient;
    form: Patient;
    editing: boolean;
    setForm: (p: Patient) => void;
}) {
    const Field = ({
        label,
        value,
        onChange,
    }: {
        label: string;
        value: string;
        onChange?: (v: string) => void;
    }) => (
    <div>
        <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">{label}</p>
        {editing && onChange ? (
            <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        ) : (
            <p className="text-[13.5px] font-medium text-zinc-800">{value || "—"}</p>
        )}
    </div>
    );

    return (
        <>
        <div className="flex flex-row gap-2 mb-4">
            <div className="flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">First Name</p>
            {editing ? (
                <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputCls} />
            ) : (
                <p className="text-[13.5px] font-medium text-zinc-800">{patient.firstName}</p>
            )}
            </div>
            {(patient.middleName || editing) && (
            <div className="flex-1">
                <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Middle</p>
                {editing ? (
                <input value={form.middleName} onChange={(e) => setForm({ ...form, middleName: e.target.value })} className={inputCls} />
                ) : (
                <p className="text-[13.5px] font-medium text-zinc-800">{patient.middleName}</p>
                )}
            </div>
            )}
            <div className="flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Last Name</p>
            {editing ? (
                <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputCls} />
            ) : (
                <p className="text-[13.5px] font-medium text-zinc-800">{patient.lastName}</p>
            )}
            </div>
        </div>

        <div className="flex flex-row gap-2 mb-4">
            <div className="flex-1">
            <Field label="Birthday" value={editing ? form.birthday : patient.birthday}
                onChange={editing ? (v) => setForm({ ...form, birthday: v }) : undefined} />
            </div>
            <div className="flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Gender</p>
            {editing ? (
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={selectCls}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
                </select>
            ) : (
                <p className="text-[13.5px] font-medium text-zinc-800 capitalize">
                {patient.gender === "prefer_not" ? "—" : patient.gender || "—"}
                </p>
            )}
            </div>
        </div>

        <div className="flex flex-row gap-2 mb-4">
            <div className="flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Nationality</p>
            {editing ? (
                <select value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className={selectCls}>
                <option value="">Select</option>
                {nationalities.map((n) => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                ))}
                </select>
            ) : (
                <p className="text-[13.5px] font-medium text-zinc-800">{getNationalityLabel(patient.nationality)}</p>
            )}
            </div>
            <div className="flex-1">
            <Field label="Religion" value={editing ? form.religion : patient.religion}
                onChange={editing ? (v) => setForm({ ...form, religion: v }) : undefined} />
            </div>
        </div>

        <div className="mb-4">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Address</p>
            {editing ? (
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3} className="w-full border-2 border-[oklch(28.2%_0.091_267.935)] rounded-[10px] px-[8px] py-[6px] text-[13px] outline-none resize-none bg-white" />
            ) : (
            <p className="text-[13.5px] font-medium text-zinc-800 whitespace-pre-wrap">{patient.address || "—"}</p>
            )}
        </div>

        <div className="flex flex-row gap-2 mb-4">
            <div className="flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Emergency Name</p>
            {editing ? (
                <input value={form.emergencyContact?.name} onChange={(e) => setForm({ ...form, emergencyContact: { ...form.emergencyContact, name: e.target.value } })} className={inputCls} />
            ) : (
                <p className="text-[13.5px] font-medium text-zinc-800">{patient.emergencyContact?.name || "—"}</p>
            )}
            </div>
            <div className="flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 mb-[2px]">Relationship</p>
            {editing ? (
                <input value={form.emergencyContact?.relationship} onChange={(e) => setForm({ ...form, emergencyContact: { ...form.emergencyContact, relationship: e.target.value } })} className={inputCls} />
            ) : (
                <p className="text-[13.5px] font-medium text-zinc-800">{patient.emergencyContact?.relationship || "—"}</p>
            )}
            </div>
        </div>

        <div className="flex flex-row gap-2 mb-4">
            <div className="flex-1">
            <Field label="Email" value={editing ? form.email : patient.email}
                onChange={editing ? (v) => setForm({ ...form, email: v }) : undefined} />
            </div>
            <div className="flex-1">
            <Field label="Phone" value={editing ? form.phone : patient.phone}
                onChange={editing ? (v) => setForm({ ...form, phone: v }) : undefined} />
            </div>
        </div>
        </>
    );
    }

    function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around px-2 pt-3 pb-5">
        <button className="flex flex-col items-center gap-1 w-14 group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-sky-600 transition-colors">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" /><path d="M9 21V12h6v9" />
            </svg>
            <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-sky-600 transition-colors">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-14 group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-sky-600 transition-colors">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-sky-600 transition-colors">Supporting</span>
        </button>
        <button className="flex flex-col items-center -mt-8">
            <div className="w-14 h-14 rounded-full bg-white border border-zinc-100 flex items-center justify-center shadow-lg hover:bg-zinc-50 transition-colors">
            <img src="/agnoslogo.png" alt="Agnos" className="w-8 h-8 object-contain" />
            </div>
        </button>
        <button className="flex flex-col items-center gap-1 w-14 group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-sky-600 transition-colors">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-sky-600 transition-colors">History</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-14">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] font-semibold text-sky-600">Profile</span>
            <div className="w-1 h-1 rounded-full bg-sky-600" />
        </button>
        </nav>
    );
    }

    export default function StaffPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<Patient | null>(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<Patient | null>(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
        const snapshot = await getDocs(collection(db, "patients"));
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Patient[];
        setPatients(data);
        if (data.length > 0) setForm(data[0]);
        };
        fetchPatients();
    }, []);

    const mobilePatient = patients[current];

    const handleMobileEdit = () => { setForm({ ...mobilePatient }); setEditing(true); };
    const handleMobileCancel = () => { setForm({ ...mobilePatient }); setEditing(false); };
    const handleMobileSave = async () => {
        if (!form) return;
        setSaving(true);
        try {
        await updateDoc(doc(db, "patients", form.id), {
            firstName: form.firstName, middleName: form.middleName, lastName: form.lastName,
            birthday: form.birthday, gender: form.gender, nationality: form.nationality,
            address: form.address, emergencyContact: form.emergencyContact,
            religion: form.religion, email: form.email, phone: form.phone,
        });
        const updated = [...patients];
        updated[current] = form;
        setPatients(updated);
        setEditing(false);
        } catch (err) { console.error(err); alert("Save failed."); }
        setSaving(false);
    };

    const filtered = patients.filter((p) => {
        const q = search.toLowerCase();
        return (
        p.firstName?.toLowerCase().includes(q) || p.lastName?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) || p.phone?.toLowerCase().includes(q)
        );
    });

    const handleSelect = (p: Patient) => { setSelected(p); setForm({ ...p }); setEditing(false); };
    const handleDesktopEdit = () => setEditing(true);
    const handleDesktopCancel = () => { setForm(selected ? { ...selected } : null); setEditing(false); };
    const handleDesktopSave = async () => {
        if (!form || !selected) return;
        setSaving(true);
        try {
        await updateDoc(doc(db, "patients", form.id), {
            firstName: form.firstName, middleName: form.middleName, lastName: form.lastName,
            birthday: form.birthday, gender: form.gender, nationality: form.nationality,
            address: form.address, emergencyContact: form.emergencyContact,
            religion: form.religion, email: form.email, phone: form.phone,
        });
        const updated = patients.map((p) => (p.id === form.id ? form : p));
        setPatients(updated);
        setSelected(form);
        setEditing(false);
        } catch (err) { console.error(err); alert("Save failed."); }
        setSaving(false);
    };

    const bgGradient = "linear-gradient(135deg, #D6EEFF 0%, #EAF5FF 40%, #F0F9FF 100%)";

    return (
        <>
        <main className="md:hidden max-w-[390px] w-full mx-auto min-h-screen pt-8 pb-24 px-4"
            style={{ background: bgGradient }}>

            <div className="flex flex-row justify-between items-start mb-6">
            <div>
                <p className="text-2xl font-bold text-zinc-800">Hello, <span className="text-sky-600">Admin</span></p>
                <p className="text-sm text-zinc-500 mt-1">Here's your patient overview for today.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                <img src="/agnoslogo.png" alt="logo" className="w-8 h-8 object-contain" />
            </div>
            </div>

            {patients.length === 0 && (
            <div className="text-center text-zinc-400 mt-20 text-sm">No patients registered yet.</div>
            )}

            {mobilePatient && form && (
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex flex-row justify-between items-center mb-4">
                <button onClick={() => { setCurrent((c) => Math.max(0, c - 1)); setEditing(false); }}
                    disabled={current === 0} className="text-xs text-zinc-400 disabled:opacity-30">← Prev</button>
                <p className="text-xs text-zinc-400">{current + 1} / {patients.length}</p>
                <button onClick={() => { setCurrent((c) => Math.min(patients.length - 1, c + 1)); setEditing(false); }}
                    disabled={current === patients.length - 1} className="text-xs text-zinc-400 disabled:opacity-30">Next →</button>
                </div>

                <PatientFields patient={mobilePatient} form={form} editing={editing} setForm={setForm} />

                <div className="flex flex-row gap-2 mt-2">
                {editing ? (
                    <>
                    <button onClick={handleMobileCancel}
                        className="flex-1 border-2 border-zinc-300 text-zinc-500 text-sm font-semibold py-2 rounded-[10px] hover:bg-zinc-50 transition-colors">Cancel</button>
                    <button onClick={handleMobileSave} disabled={saving}
                        className="flex-1 bg-[oklch(28.2%_0.091_267.935)] text-white text-sm font-semibold py-2 rounded-[10px] hover:opacity-90 disabled:opacity-50">
                        {saving ? "Saving..." : "Save"}
                    </button>
                    </>
                ) : (
                    <button onClick={handleMobileEdit}
                    className="w-full bg-[oklch(28.2%_0.091_267.935)] text-white text-sm font-semibold py-2 rounded-[10px] hover:opacity-90">Edit</button>
                )}
                </div>
            </div>
            )}

            <BottomNav />
        </main>

        <div className="hidden md:flex min-h-screen flex-col" style={{ background: bgGradient }}>

            <header className="bg-white shadow-sm flex items-center justify-between px-8 py-3 sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <img src="/agnoslogo.png" alt="Agnos" className="w-8 h-8 object-contain" />
                <span className="font-bold text-lg text-[oklch(28.2%_0.091_267.935)]">Agnos</span>
            </div>

            <nav className="flex items-center gap-1">
                {[
                { label: "Home", active: false, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg> },
                { label: "Supporting", active: false, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
                { label: "History", active: false, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
                { label: "Profile", active: true, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                ].map((item) => (
                <button key={item.label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${item.active ? "bg-sky-50 text-sky-600" : "text-zinc-400 hover:text-sky-600 hover:bg-sky-50"}`}>
                    {item.icon}{item.label}
                    {item.active && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 ml-0.5" />}
                </button>
                ))}
            </nav>

            <div className="flex items-center gap-2">
                <div className="text-right">
                <p className="text-sm font-bold text-zinc-800">Hello, <span className="text-sky-600">Admin</span></p>
                <p className="text-xs text-zinc-400">Staff Dashboard</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-sm">A</div>
            </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-5 flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-sky-400 transition-colors" />
                </div>
                <p className="text-xs text-zinc-400">{filtered.length} patient{filtered.length !== 1 ? "s" : ""}</p>
                </div>

                {filtered.length === 0 && (
                <div className="text-center text-zinc-400 mt-20 text-sm">
                    {patients.length === 0 ? "No patients registered yet." : "No results found."}
                </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                {filtered.map((p, i) => {
                    const colorCls = AVATAR_COLORS[i % AVATAR_COLORS.length];
                    const isActive = selected?.id === p.id;
                    return (
                    <button key={p.id} onClick={() => handleSelect(p)}
                        className={`text-left bg-white rounded-2xl p-4 shadow-sm border-2 transition-all hover:shadow-md ${isActive ? "border-sky-500 shadow-sky-100" : "border-transparent hover:border-sky-200"}`}>
                        <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorCls}`}>
                            {getInitials(p)}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-zinc-800 text-sm truncate">{p.firstName} {p.lastName}</p>
                            <p className="text-xs text-zinc-400 truncate">{p.email || "—"}</p>
                        </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                        {p.gender && p.gender !== "prefer_not" && (
                            <span className="text-[11px] bg-zinc-100 text-zinc-500 rounded-full px-2 py-0.5 capitalize">{p.gender}</span>
                        )}
                        {p.nationality && (
                            <span className="text-[11px] bg-sky-50 text-sky-600 rounded-full px-2 py-0.5">{getNationalityLabel(p.nationality)}</span>
                        )}
                        {p.phone && (
                            <span className="text-[11px] bg-zinc-100 text-zinc-500 rounded-full px-2 py-0.5">{p.phone}</span>
                        )}
                        </div>
                    </button>
                    );
                })}
                </div>
            </div>

            {selected && form && (
                <aside className="w-[340px] flex-shrink-0 bg-white border-l border-zinc-100 overflow-y-auto p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-zinc-800 text-base">Patient Detail</h2>
                    <button onClick={() => { setSelected(null); setEditing(false); }}
                    className="text-zinc-300 hover:text-zinc-500 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    </button>
                </div>

                <div className="flex flex-col items-center py-2">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${AVATAR_COLORS[patients.indexOf(selected) % AVATAR_COLORS.length]}`}>
                    {getInitials(selected)}
                    </div>
                    <p className="mt-2 font-bold text-zinc-800">{selected.firstName} {selected.middleName} {selected.lastName}</p>
                    <p className="text-xs text-zinc-400">{selected.email}</p>
                </div>

                <hr className="border-zinc-100" />

                <PatientFields patient={selected} form={form} editing={editing} setForm={setForm} />

                <div className="flex gap-2 pt-2 mt-auto sticky bottom-0 bg-white pb-2">
                    {editing ? (
                    <>
                        <button onClick={handleDesktopCancel}
                        className="flex-1 border-2 border-zinc-300 text-zinc-500 text-sm font-semibold py-2 rounded-[10px] hover:bg-zinc-50 transition-colors">Cancel</button>
                        <button onClick={handleDesktopSave} disabled={saving}
                        className="flex-1 bg-[oklch(28.2%_0.091_267.935)] text-white text-sm font-semibold py-2 rounded-[10px] hover:opacity-90 disabled:opacity-50">
                        {saving ? "Saving..." : "Save"}
                        </button>
                    </>
                    ) : (
                    <button onClick={handleDesktopEdit}
                        className="w-full bg-[oklch(28.2%_0.091_267.935)] text-white text-sm font-semibold py-2 rounded-[10px] hover:opacity-90">Edit</button>
                    )}
                </div>
                </aside>
            )}
            </div>
        </div>
        </>
    );
}