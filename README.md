# Agnos – Patient Registration & Management System

A modern web application designed to streamline patient registration and management with real-time cloud synchronization.
This project demonstrates a scalable and user-friendly interface for handling patient data in a healthcare context.

---

## Features

* Multi-step Patient Registration Form
* Multi-language Support (EN / TH / CN)
* Custom Date Picker with validation
* Fully Responsive (Mobile & Desktop)
* Real-time data synchronization using Firebase Firestore
* Staff Dashboard for viewing and editing patient records

---

## Live Demo

* User Page: https://agnostest.vercel.app
* Staff Dashboard: https://agnostest.vercel.app/staff

---

## Tech Stack

* Frontend: Next.js (React + TypeScript)
* Styling: Tailwind CSS
* Backend / Database: Firebase Firestore
* Deployment: Vercel

---

## Project Structure

```
/app            → Application routes (User form, Staff dashboard)
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
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the project

```
npm run dev
```

Open: http://localhost:3000

---

## Development Planning Documentation

### Project Structure

The project follows Next.js App Router architecture.

* `/app` contains all route-based pages
* `/lib` stores shared configurations such as Firebase setup
* `/public` contains static assets

---

### Design Decisions

* Mobile-first approach to ensure accessibility across devices
* Clean and minimal UI for better usability in a healthcare context
* Custom components (e.g., date picker, dropdowns) to improve user experience
* Consistent design system implemented with Tailwind CSS

---

### Component Architecture

* Form Components → Handle user input and validation
* CalendarPicker → Reusable date selection component
* Navigation Components → Mobile and desktop navigation layouts
* Dashboard Components → Patient listing, searching, and editing

---

### Real-Time Synchronization Flow

1. User submits patient data through the form
2. Input is validated on the client side
3. Data is stored in Firebase Firestore
4. Staff dashboard retrieves data dynamically
5. Updates are written back and reflected in real-time

---

## Notes

* Firebase configuration is managed via environment variables
* This project is a prototype and does not include authentication
* Designed to demonstrate frontend architecture and real-time data handling

---

## Author

Developed by Paemika Aditepsatid

---