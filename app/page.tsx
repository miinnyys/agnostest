"use client";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const translations = {
  "en-US": {
    stepLabel: "Step", of: "of", patientDetails: "Patient Details",
    personalInfo: "Personal Information", step2Label: "Medical Info", step3Label: "Review",
    description: "Please fill in all required information so we can keep track of your medical records more easily.",
    yourName: "Your Name", firstName: "First Name", middleName: "Middle Name", lastName: "Last Name",
    birthday: "Birthday", gender: "Gender", select: "Select", male: "Male", female: "Female", other: "Other", preferNot: "Prefer not to say",
    nationality: "Nationality", phoneNumber: "Phone Number",
    email: "Email", emailPlaceholder: "E-mail",
    address: "Address", addressPlaceholder: "Address",
    emergencyContact: "Emergency Contact", name: "Name", relationship: "Relationship",
    religion: "Religion", religionPlaceholder: "Religion",
    submit: "Submit",
    home: "Home", supporting: "Supporting", history: "History", profile: "Profile",
    alertName: "First and Last name are required",
    alertEmail: "Invalid email format",
    alertPhone: "Phone number must be 9-10 digits",
    alertBirthday: "Birthday cannot be in the future",
    alertSuccess: "Submitted successfully!",
    alertError: "Something went wrong.",
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    monthsShort: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    nationalities: [
      { value: "TH", label: "Thai" }, { value: "US", label: "American" },
      { value: "GB", label: "British" }, { value: "CN", label: "Chinese" },
      { value: "JP", label: "Japanese" }, { value: "KR", label: "Korean" },
      { value: "SG", label: "Singaporean" }, { value: "IN", label: "Indian" },
      { value: "AU", label: "Australian" },
    ],
  },
  "th-TH": {
    stepLabel: "ขั้นตอน", of: "จาก", patientDetails: "ข้อมูลผู้ป่วย",
    personalInfo: "ข้อมูลส่วนตัว", step2Label: "ข้อมูลการแพทย์", step3Label: "ตรวจสอบ",
    description: "กรุณากรอกข้อมูลที่จำเป็นทั้งหมด เพื่อให้เราสามารถติดตามประวัติการรักษาของคุณได้",
    yourName: "ชื่อของคุณ", firstName: "ชื่อ", middleName: "ชื่อกลาง", lastName: "นามสกุล",
    birthday: "วันเกิด", gender: "เพศ", select: "เลือก", male: "ชาย", female: "หญิง", other: "อื่นๆ", preferNot: "ไม่ระบุ",
    nationality: "สัญชาติ", phoneNumber: "เบอร์โทรศัพท์",
    email: "อีเมล", emailPlaceholder: "อีเมล",
    address: "ที่อยู่", addressPlaceholder: "ที่อยู่",
    emergencyContact: "ผู้ติดต่อฉุกเฉิน", name: "ชื่อ", relationship: "ความสัมพันธ์",
    religion: "ศาสนา", religionPlaceholder: "ศาสนา",
    submit: "ส่งข้อมูล",
    home: "หน้าหลัก", supporting: "สนับสนุน", history: "ประวัติ", profile: "โปรไฟล์",
    alertName: "กรุณากรอกชื่อและนามสกุล",
    alertEmail: "รูปแบบอีเมลไม่ถูกต้อง",
    alertPhone: "เบอร์โทรต้องมี 9-10 หลัก",
    alertBirthday: "วันเกิดต้องไม่เป็นอนาคต",
    alertSuccess: "ส่งข้อมูลสำเร็จ!",
    alertError: "เกิดข้อผิดพลาด กรุณาลองใหม่",
    months: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],
    monthsShort: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],
    nationalities: [
      { value: "TH", label: "ไทย" }, { value: "US", label: "อเมริกัน" },
      { value: "GB", label: "อังกฤษ" }, { value: "CN", label: "จีน" },
      { value: "JP", label: "ญี่ปุ่น" }, { value: "KR", label: "เกาหลี" },
      { value: "SG", label: "สิงคโปร์" }, { value: "IN", label: "อินเดีย" },
      { value: "AU", label: "ออสเตรเลีย" },
    ],
  },
  "zh-CN": {
    stepLabel: "步骤", of: "共", patientDetails: "患者信息",
    personalInfo: "个人信息", step2Label: "医疗信息", step3Label: "确认",
    description: "请填写所有必要信息，以便我们更好地追踪您的医疗记录。",
    yourName: "您的姓名", firstName: "名", middleName: "中间名", lastName: "姓",
    birthday: "生日", gender: "性别", select: "请选择", male: "男", female: "女", other: "其他", preferNot: "不愿透露",
    nationality: "国籍", phoneNumber: "电话号码",
    email: "电子邮件", emailPlaceholder: "电子邮件",
    address: "地址", addressPlaceholder: "地址",
    emergencyContact: "紧急联系人", name: "姓名", relationship: "关系",
    religion: "宗教", religionPlaceholder: "宗教",
    submit: "提交",
    home: "首页", supporting: "支持", history: "历史", profile: "个人资料",
    alertName: "请填写姓名",
    alertEmail: "邮箱格式不正确",
    alertPhone: "电话号码必须为9-10位数字",
    alertBirthday: "生日不能是未来日期",
    alertSuccess: "提交成功！",
    alertError: "出错了，请重试。",
    months: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    monthsShort: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    nationalities: [
      { value: "TH", label: "泰国" }, { value: "US", label: "美国" },
      { value: "GB", label: "英国" }, { value: "CN", label: "中国" },
      { value: "JP", label: "日本" }, { value: "KR", label: "韩国" },
      { value: "SG", label: "新加坡" }, { value: "IN", label: "印度" },
      { value: "AU", label: "澳大利亚" },
    ],
  },
};

const countries = [
  { code: "66", label: "+66", flag: "/assets/th.png" },
  { code: "1",  label: "+1",  flag: "/assets/us.png" },
  { code: "44", label: "+44", flag: "/assets/gb.png" },
  { code: "86", label: "+86", flag: "/assets/cn.png" },
  { code: "81", label: "+81", flag: "/assets/jp.png" },
];

type LangKey = keyof typeof translations;

const BORDER = "border-2 border-[oklch(28.2%_0.091_267.935)]";
const fieldCls = `w-full ${BORDER} rounded-[10px] h-[38px] px-[10px] text-[13.5px] outline-none bg-transparent`;
const wrapCls = `${BORDER} rounded-[10px] h-[38px] px-[10px] flex items-center`;

function CalendarPicker({
  value, onChange, placeholder, months, monthsShort,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  months: string[];
  monthsShort: string[];
}) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() =>
    value ? parseInt(value.split("-")[0]) : new Date().getFullYear() - 25
  );
  const [viewMonth, setViewMonth] = useState(() =>
    value ? parseInt(value.split("-")[1]) - 1 : new Date().getMonth()
  );

  const parsed = value ? new Date(value + "T00:00:00") : null;
  const today = new Date();

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const displayValue = parsed
    ? `${parsed.getDate()} ${monthsShort[parsed.getMonth()]} ${parsed.getFullYear()}`
    : "";

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (d: number) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    onChange(`${viewYear}-${mm}-${dd}`);
    setOpen(false);
  };

  const isSelected = (d: number) =>
    parsed &&
    parsed.getFullYear() === viewYear &&
    parsed.getMonth() === viewMonth &&
    parsed.getDate() === d;

  const isFuture = (d: number) => new Date(viewYear, viewMonth, d) > today;

  return (
    <div className="relative w-full">
      <div
        className={`${wrapCls} cursor-pointer justify-between`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={`text-[13.5px] ${displayValue ? "text-zinc-800" : "text-zinc-400"}`}>
          {displayValue || placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 w-[290px]">
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <select value={viewMonth} onChange={e => setViewMonth(Number(e.target.value))}
                className="text-sm font-semibold text-zinc-800 outline-none bg-transparent cursor-pointer">
                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))}
                className="text-sm font-semibold text-zinc-800 outline-none bg-transparent cursor-pointer">
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={nextMonth}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="text-center text-[11px] font-semibold text-zinc-400 py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <button
                key={d}
                type="button"
                disabled={isFuture(d)}
                onClick={() => selectDay(d)}
                className={`
                  w-8 h-8 mx-auto flex items-center justify-center rounded-full text-[13px] transition-colors
                  ${isSelected(d) ? "bg-[oklch(28.2%_0.091_267.935)] text-white font-semibold" : ""}
                  ${!isSelected(d) && !isFuture(d) ? "hover:bg-sky-50 text-zinc-700 cursor-pointer" : ""}
                  ${isFuture(d) ? "text-zinc-300 cursor-not-allowed" : ""}
                `}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const NavIcons = {
  home: (active?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#0284c7" : "#a1a1aa"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/>
    </svg>
  ),
  supporting: (active?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#0284c7" : "#a1a1aa"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  history: (active?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#0284c7" : "#a1a1aa"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  profile: (active?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#0284c7" : "#a1a1aa"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

export default function Home() {
  const [lang, setLang] = useState<LangKey>("en-US");
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[lang];

  const [birthday, setBirthday] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [religion, setReligion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) { alert(t.alertName); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { alert(t.alertEmail); return; }
    const phoneRegex = /^\d{9,10}$/;
    if (!phoneRegex.test(phone)) { alert(t.alertPhone); return; }
    if (birthday && new Date(birthday) > new Date()) { alert(t.alertBirthday); return; }
    try {
      await addDoc(collection(db, "patients"), {
        firstName, middleName, lastName, birthday, gender, nationality,
        phone: `+${selectedCountry.code}${phone}`,
        email, address,
        emergencyContact: { name: emergencyName, relationship },
        religion, createdAt: new Date(),
      });
      setFirstName(""); setMiddleName(""); setLastName(""); setBirthday("");
      setGender(""); setNationality(""); setPhone(""); setEmail("");
      setAddress(""); setEmergencyName(""); setRelationship(""); setReligion("");
      setSelectedCountry(countries[0]);
      alert(t.alertSuccess);
    } catch (error) {
      console.error("Error:", error);
      alert(t.alertError);
    }
  };

  const LangDropdown = () => (
    <div className="relative">
      <div className="flex flex-row gap-2 items-center cursor-pointer select-none"
        onClick={() => setLangOpen(o => !o)}>
        <span className="text-sm font-medium text-zinc-600">{lang}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {langOpen && (
        <ul className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-md z-50 p-1 w-[80px]">
          {(["en-US", "th-TH", "zh-CN"] as LangKey[]).map(l => (
            <li key={l} onClick={() => { setLang(l); setLangOpen(false); }}
              className={`px-2 py-1 text-sm rounded cursor-pointer hover:bg-zinc-100 ${lang === l ? "font-bold text-sky-600" : "text-zinc-600"}`}>
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const steps = [t.personalInfo, t.step2Label, t.step3Label];
  const currentStep = 1;

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-[60px] items-center px-8 justify-between">
        <div className="flex items-center gap-3">
          <img src="/agnoslogo.png" alt="Agnos" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg text-[oklch(28.2%_0.091_267.935)]">Agnos</span>
        </div>

        <div className="flex items-center gap-1">
          {[
            { key: "home", label: t.home, icon: NavIcons.home },
            { key: "supporting", label: t.supporting, icon: NavIcons.supporting },
            { key: "history", label: t.history, icon: NavIcons.history },
            { key: "profile", label: t.profile, icon: NavIcons.profile, active: true },
          ].map(({ key, label, icon, active }) => (
            <button key={key}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${active ? "bg-sky-50 text-sky-600" : "text-zinc-400 hover:text-sky-600 hover:bg-sky-50"}`}>
              {icon(active)}
              {label}
              {active && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 ml-0.5" />}
            </button>
          ))}
        </div>

        <LangDropdown />
      </nav>

      <main className="w-full mx-auto min-h-screen pb-24 pt-0 px-4 max-w-[390px] md:max-w-7xl md:pt-[155px] md:pb-12 md:px-10">

        <div className="flex flex-col justify-center items-center md:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 pb-0 px-4" style={{ paddingTop: "max(8px, env(safe-area-inset-top))" }}>
          <div className="flex flex-row items-center gap-[5px]">
            <div className="w-[5px] h-[5px] border-l border-b border-zinc-700 rotate-45" />
            <p className="text-xs font-semibold text-zinc-500">
              {t.stepLabel} <span className="text-sky-600">1</span> {t.of} 3
            </p>
            <div className="w-[5px] h-[5px] border-l border-b border-zinc-700 rotate-[225deg]" />
          </div>
          <p className="text-sm font-semibold">{t.patientDetails}</p>
          <div className="w-full h-[5px] rounded border border-zinc-200 mt-[6px]">
            <div className="w-1/3 h-full rounded bg-sky-600" />
          </div>
        </div>

        <div className="md:hidden" style={{ height: "calc(60px + env(safe-area-inset-top))" }} />

        <div className="hidden md:flex fixed top-[60px] left-0 right-0 z-40 items-start justify-center gap-0 py-4">
          {steps.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
              <div key={i} className="flex items-start">
                {i > 0 && (
                  <div className={`w-20 h-[2px] mt-[18px] ${isDone ? "bg-[oklch(28.2%_0.091_267.935)]" : "bg-zinc-200"}`} />
                )}
                <div className="flex flex-col items-center gap-1 w-[80px]">
                  <div className={`
                    w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                    ${isActive ? "bg-[oklch(28.2%_0.091_267.935)] border-[oklch(28.2%_0.091_267.935)] text-white" : ""}
                    ${isDone ? "bg-[oklch(28.2%_0.091_267.935)] border-[oklch(28.2%_0.091_267.935)] text-white" : ""}
                    ${!isActive && !isDone ? "bg-white border-zinc-300 text-zinc-400" : ""}
                  `}>
                    {stepNum}
                  </div>
                  <span className={`text-[11px] font-semibold text-center leading-tight ${isActive ? "text-[oklch(28.2%_0.091_267.935)]" : "text-zinc-400"}`}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row justify-between items-center mb-[4px]">
          <p className="text-lg font-bold">{t.personalInfo}</p>
          <div className="md:hidden"><LangDropdown /></div>
        </div>
        <p className="text-sm mb-4 md:mb-6 w-[85%] md:w-full text-zinc-600">{t.description}</p>

        <form onSubmit={handleSubmit}>

          <p className="text-sm font-semibold mb-[4px]">{t.yourName}</p>
          <div className="flex flex-row gap-2 mb-4 h-[38px]">
            <input type="text" id="firstname" name="firstname" placeholder={t.firstName}
              className={fieldCls} value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" id="middlename" name="middlename" placeholder={t.middleName}
              className={fieldCls} value={middleName} onChange={e => setMiddleName(e.target.value)} />
            <input type="text" id="lastname" name="lastname" placeholder={t.lastName}
              className={fieldCls} value={lastName} onChange={e => setLastName(e.target.value)} required />
          </div>

          <div className="md:flex md:flex-row md:gap-6 md:items-start mb-4">

            <div className="md:w-[34%] mb-4 md:mb-0">
              <p className="text-sm font-semibold mb-[4px]">{t.birthday}</p>
              <CalendarPicker
                value={birthday}
                onChange={setBirthday}
                placeholder={t.birthday}
                months={t.months}
                monthsShort={t.monthsShort}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex flex-row gap-2 ">
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-[4px]">{t.gender}</p>
                  <div className={wrapCls}>
                    <select name="gender" id="gender"
                      className={`w-full outline-none bg-transparent text-[13.5px] ${gender ? "text-zinc-800" : "text-zinc-400"}`}
                      value={gender} onChange={e => setGender(e.target.value)} required>
                      <option value="">{t.select}</option>
                      <option value="male">{t.male}</option>
                      <option value="female">{t.female}</option>
                      <option value="other">{t.other}</option>
                      <option value="prefer_not">{t.preferNot}</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-[4px]">{t.nationality}</p>
                  <div className={wrapCls}>
                    <select id="nationality" name="nationality"
                      className={`w-full outline-none bg-transparent text-[13.5px] ${nationality ? "text-zinc-800" : "text-zinc-400"}`}
                      value={nationality} onChange={e => setNationality(e.target.value)} required>
                      <option value="">{t.select}</option>
                      {t.nationalities.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 mb-4">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-[4px]">{t.phoneNumber}</p>
              <div className={wrapCls + " gap-2"}>
                <div className="relative flex flex-row items-center gap-1 shrink-0">
                  <img src={selectedCountry.flag} alt="" className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-[13.5px]">{selectedCountry.label}</span>
                  <button type="button" onClick={() => setCountryOpen(o => !o)}
                    className="w-[6px] h-[6px] border-l border-b border-zinc-600 -rotate-45 cursor-pointer mt-[-3px]" />
                  {countryOpen && (
                    <ul className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-md z-50 p-1 w-[70px]">
                      {countries.map(c => (
                        <li key={c.code} onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                          className="flex items-center gap-1 cursor-pointer hover:bg-zinc-50 py-1 px-1">
                          <img src={c.flag} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-[13px]">{c.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-px h-5 bg-zinc-300 shrink-0" />
                <input className="outline-none bg-transparent flex-1 text-[13.5px]"
                  type="tel" placeholder={t.phoneNumber}
                  value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold mb-[4px]">{t.email}</p>
              <div className={wrapCls}>
                <input type="text" id="email" placeholder={t.emailPlaceholder}
                  className="outline-none bg-transparent w-full text-[13.5px]"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-[4px]">{t.address}</p>
            <div className={wrapCls}>
              <input type="text" id="address" placeholder={t.addressPlaceholder}
                className="outline-none bg-transparent w-full text-[13.5px]"
                value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
          </div>

          <p className="text-sm font-semibold mb-[4px]">{t.emergencyContact}</p>
          <div className="flex flex-row gap-2 mb-4">
            <div className={`flex-1 ${wrapCls}`}>
              <input type="text" id="emergencyname" placeholder={t.name}
                className="outline-none bg-transparent w-full text-[13.5px]"
                value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
            </div>
            <div className={`flex-1 ${wrapCls}`}>
              <input type="text" id="relationship" placeholder={t.relationship}
                className="outline-none bg-transparent w-full text-[13.5px]"
                value={relationship} onChange={e => setRelationship(e.target.value)} />
            </div>
          </div>

          <p className="text-sm font-semibold mb-[4px]">{t.religion}</p>
          <div className={`${wrapCls} mb-6`}>
            <input type="text" id="religion" placeholder={t.religionPlaceholder}
              className="outline-none bg-transparent w-full text-[13.5px]"
              value={religion} onChange={e => setReligion(e.target.value)} />
          </div>

          <button type="submit"
            className="bg-[oklch(28.2%_0.091_267.935)] hover:opacity-90 active:opacity-80 transition-opacity text-white text-sm font-semibold px-10 py-[10px] rounded-[10px] shadow-md">
            {t.submit}
          </button>

        </form>
      </main>

      <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around px-2 pt-3" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        <button className="flex flex-col items-center gap-1 w-14 group">
          {NavIcons.home()}
          <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-sky-600 transition-colors">{t.home}</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-14 group">
          {NavIcons.supporting()}
          <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-sky-600 transition-colors">{t.supporting}</span>
        </button>
        <button className="flex flex-col items-center -mt-8">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shadow-lg hover:bg-zinc-50 transition-colors">
            <img src="/agnoslogo.png" alt="" className="w-8 h-8 object-contain" />
          </div>
        </button>
        <button className="flex flex-col items-center gap-1 w-14 group">
          {NavIcons.history()}
          <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-sky-600 transition-colors">{t.history}</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-14">
          {NavIcons.profile(true)}
          <span className="text-[10px] font-semibold text-sky-600">{t.profile}</span>
          <div className="w-1 h-1 rounded-full bg-sky-600" />
        </button>
      </nav>
    </>
  );
}