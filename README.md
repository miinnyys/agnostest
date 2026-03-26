# Agnos – Patient Registration & Management System

A modern web application for collecting, managing, and reviewing patient information with real-time cloud synchronization.

---

## Features

* Multi-step Patient Registration Form
* Multi-language Support (EN / TH / CN)
* Custom Date Picker (with validation)
* Fully Responsive (Mobile + Desktop)
* Real-time Database with Firebase Firestore
* Staff Dashboard for viewing & editing patient data

---

## Demo Routes

- User Page: agnostest.vercel.app
- Staff Dashboard: agnostest.vercel.app/staff

---

## Tech Stack

* **Frontend:** Next.js (React + TypeScript)
* **Styling:** Tailwind CSS
* **Backend / Database:** Firebase Firestore
* **Deployment:** Vercel

---

## Project Structure

```
/app            → Main pages (Patient Form, Staff Dashboard)
/lib            → Firebase configuration
/public         → Static assets (images, icons)
```

---

## Setup & Run Locally

### 1. Clone the repository

```
git clone https://github.com/miinnyys/agnostest.git
cd agnostest
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=your_sender_id
NEXT_PUBLIC_FIREBASE_APPID=your_app_id
```

### 4. Run the project

```
npm run dev
```

Open: http://localhost:3000

---

## Real-Time Synchronization Flow

1. User submits patient data via the form
2. Data is validated on the client side
3. Data is stored in Firebase Firestore
4. Staff dashboard fetches data in real-time
5. Updates are written back instantly to Firestore

---

## Design Decisions

* Clean and minimal UI for medical usability
* Mobile-first approach for accessibility
* Custom components (date picker, dropdowns) for better UX
* Consistent design system using Tailwind CSS

---

## Component Architecture

* **Form Components** → Handle user input and validation
* **CalendarPicker** → Custom reusable date selector
* **Navigation Components** → Mobile & Desktop navigation
* **Dashboard Components** → Patient listing and editing

---

## Notes

* Firebase config is stored via environment variables for security
* This project is designed as a prototype for healthcare systems
* No authentication is implemented (can be extended)

---

## Author

Developed by Paemika Aditepsatid

---