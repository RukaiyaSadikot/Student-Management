<div align="center">

# Project : Student Management System

**A responsive full-stack student management web app built with React and Redux Thunk. Features secure admin login with protected routes, a dashboard with summary stats, full CRUD for student records backed by a json-server REST API, live search, sorting and class filtering, a photo-preview student form, and a themed UI built with Bootstrap and custom CSS variables.**

</div>

---

## 📑 Table of Contents

- [Project Description](#-project-description)
- [How This Project is Made](#-how-this-project-is-made)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [React Concepts Covered](#-react-concepts-covered)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Demo](#-demo)
- [Author](#-author)

---

## 📌 Project Description

Student Management System is a React-based web application for schools and colleges to keep track of their students. After signing in, an administrator lands on a dashboard with an overview of the student body, and can browse the full student list, add new students with a photo, edit details inline, delete records, and quickly find anyone using search, sorting and class filters.

This project was built as a React JS practical exam to practice full-stack fundamentals: structuring a multi-page app with React Router, managing global state with Redux and Redux Thunk, talking to a REST API with Axios, protecting pages behind authentication, and designing a clean, responsive interface with Bootstrap plus a hand-written CSS theme.

---

## 🚀 How This Project is Made

This project is built using **React (Vite)**, **Redux with Redux Thunk**, **React Router DOM**, **Axios**, **Bootstrap 5**, **react-icons** and **json-server** as a mock backend.

### 🧱 Component Structure

- The app is composed of small, single-responsibility components (`Navbar`, `PrivateRoute`, `StudentList`, `StudentDetails`, `StudentForm`) and page-level components (`Login`, `Dashboard`, `Profile`), all wired together in `App.jsx`.
- The **Navbar** is a responsive Bootstrap navbar that collapses on small screens, with links to the dashboard, student list and add form, plus the signed-in user's name (linking to the profile) and a sign-out button.
- **PrivateRoute** wraps every protected page. It reads the user from the Redux store and redirects logged-out visitors to `/login`.
- **StudentList** is the main table view. It fetches students from the store, and applies search, sort and class filter before rendering one `StudentDetails` row per student.
- **StudentDetails** renders a single student row (avatar, roll number, contact, grade and class badges) and owns the inline **edit** panel and the **delete** action for that student.
- **StudentForm** is the add-student page, with grouped fields, a live round photo preview, and validation on every input.
- **Dashboard** shows a greeting, three stat cards and a "Recently Added" list, all calculated from the same Redux state.
- **Profile** shows the signed-in admin's details with a sign-out button.

### 🗂️ Redux Setup

- The store is created with `createStore`, `combineReducers` and `applyMiddleware(thunk)`, with two slices: `students` and `auth`.
- **Thunks** handle every asynchronous operation: `fetchStudents`, `addStudent`, `updateStudent`, `deleteStudent` and `login`.
- The students slice tracks `students`, `loading` and `error`, so the UI can show a spinner while data loads and an alert if the request fails.
- The auth slice stores the signed-in user (without the password) and any login error, and initializes itself from `localStorage` so the session survives a page refresh.

### 🗄️ JSON Server Backend

- `db.json` acts as the database, holding a `students` collection and a `users` collection.
- json-server automatically exposes REST endpoints (`GET`, `POST`, `PUT`, `DELETE` on `/students`) with no backend code.
- Login is performed by querying `/users?email=...&password=...` and checking for a match.

### 🎨 CSS Styling

- Bootstrap 5 provides the grid, navbar collapse behavior, spinner and alerts.
- A custom stylesheet adds the card layout, pill-shaped inputs, gradient hero band, badges and hover effects.
- CSS custom properties (`--hero-1`, `--hero-2`, `--primary`, `--primary-dark`, `--primary-soft`, `--ink`, `--muted`) centralize the navy and teal color palette, so the whole theme can be changed from one block in `index.css`.
- Grade and class values are shown as colored pill badges, and Edit and Delete are styled action buttons that fill with color on hover.
- Media queries stack the toolbar, form grid and buttons on mobile screens.

### ⚙️ React Functionality

- **React Router DOM** handles client-side routing, a root redirect to the dashboard, and a catch-all route for unknown URLs.
- **react-redux hooks** (`useSelector`, `useDispatch`) connect components to the store.
- `useEffect` fetches students when the list, dashboard and profile pages mount.
- `useState` manages form fields, the edit panel, search text, sort option and the selected class filter.
- **Axios** performs all HTTP requests inside the thunks.
- `react-icons` supplies the icons used in the dashboard cards, buttons and navbar.

---

## ✨ Features

- Admin login with protected routes and a persistent session
- Dashboard with student, class and Grade A counts plus recently added students
- Student table with avatars, contact details, and grade and class badges
- Add student form with live photo preview, dropdown suggestions and validation
- Inline edit panel for updating any student
- Delete with a confirmation prompt
- Live search by student name
- Sort by name or roll number
- Filter by class using a dropdown or quick tabs
- Loading spinner and error alerts for API requests
- Profile page with sign-out
- Fully responsive layout with a collapsing navbar
- Themeable design through CSS variables

---

## 🔧 Technologies Used

- React (Vite)
- JavaScript (ES6+)
- Redux, React-Redux and Redux Thunk
- React Router DOM
- Axios
- Bootstrap 5
- CSS3 (custom properties)
- react-icons
- json-server

---

## 📚 React Concepts Covered

- Functional components and component composition
- Props for passing data between parent and child components
- State management with `useState`
- Side effects with `useEffect`
- Global state with Redux (store, actions, reducers, `combineReducers`)
- Asynchronous actions with Redux Thunk middleware
- Client-side routing with React Router (`Routes`, `Route`, `Link`, `Navigate`, `useNavigate`)
- Protected routes (a `PrivateRoute` wrapper component)
- Controlled form inputs and form submission handling
- Conditional rendering (loading, error and empty states)
- Derived data (filtering, sorting and counting without mutating state)
- REST API integration with Axios (full CRUD)

---

## 🔄 How It Works

### Login
- Submits the email and password to `/users?email=...&password=...`.
- On a match, the user (minus the password) is saved to Redux and `localStorage`, and the app redirects to the dashboard.
- On failure, an error message appears on the form.

### Dashboard
- Counts students, distinct classes and Grade A / A+ students from the Redux state.
- Lists the five most recently added students with their class and grade badges.

### Student List
- Fetches all students on mount and stores them in Redux.
- Search, sort and filter are applied to a copy of the data, so the stored state is never mutated.
- The class tabs and the class dropdown share one piece of state, so they always stay in sync.

### Add Student
- Collects name, roll number, phone, email, age, class, grade and photo URL.
- Shows the photo as a live preview and falls back to the first letter of the name if the link is broken.
- On submit, `addStudent` posts to the server, updates the store and returns to the student list.

### Update Student
- Clicking **Edit** opens a panel under the row, pre-filled with the current values.
- **Save** sends a `PUT /students/:id` request using the student's unique `id`, then updates the store.

### Delete Student
- Asks for confirmation, then sends `DELETE /students/:id` and removes the student from the store.

### Profile
- Shows the signed-in admin's name and email, with a button that clears the session and returns to the login page.

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### 1. Install dependencies

```bash
cd student-app
npm install
```

To set the project up from scratch instead:

```bash
npm install react-router-dom redux react-redux redux-thunk axios bootstrap react-icons
npm install -D json-server
```

### 2. Start the backend

```bash
npx json-server db.json --port 5000
```

### 3. Start the frontend (in a second terminal)

```bash
npm run dev
```

Open the address shown in the terminal, usually `http://localhost:5173`.

### 4. Sign in

| Email | Password |
|---|---|
| `admin@gmail.com` | `admin123` |

> Both servers must be running at the same time. If the student list shows a network error, check that json-server is still running.

---

## 🔌 API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/students` | Fetch all students |
| `POST` | `/students` | Add a new student |
| `PUT` | `/students/:id` | Update a student |
| `DELETE` | `/students/:id` | Delete a student |
| `GET` | `/users?email=&password=` | Look up a user for login |

**Student object**

```json
{
  "id": "1",
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@gmail.com",
  "age": 20,
  "class": "BCA",
  "grade": "A",
  "rollNumber": "101",
  "image": "https://i.pravatar.cc/300?img=12"
}
```

---

## 📂 Project Structure

```text
student-app/
│
├── public/
│   └── output/
│       ├── addstudent.jpeg
│       ├── dashboard.jpeg
│       ├── login.jpeg
│       ├── profile.jpeg
│       └── view-students.jpeg
|
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── StudentList.jsx
│   │   ├── StudentDetails.jsx
│   │   └── StudentForm.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Profile.jsx
│   │
│   ├── redux/
│   │   ├── actions/
│   │   │   ├── authActions.js
│   │   │   └── studentActions.js
│   │   ├── reducers/
│   │   │   ├── authReducer.js
│   │   │   ├── studentReducer.js
│   │   │   └── index.js
│   │   └── store.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── db.json
├── index.html
├── package.json
└── README.md
```

---

## 📸 Screenshots

### Login
<img src="output/login.jpeg" width="800" alt="Login Page">

### Dashboard
<img src="output/dashboard.jpeg" width="800" alt="Login Page">

### Student List (Search, Sort and Filter)
<img src="output/view-students.jpeg" width="800" alt="Login Page">

### Add Student
<img src="output/addstudent.jpeg" width="800" alt="Login Page">

### Profile
<img src="output/profile.jpeg" width="800" alt="Login Page">

---


---

<div align="center">

**Your Name**

⭐ Thank you for visiting this repository!

</div>