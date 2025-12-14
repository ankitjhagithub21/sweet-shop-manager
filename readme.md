# 🍬 Sweet Shop Manager

A **full-stack Sweet Shop Management System** built to manage sweets, inventory, and users with **role-based access control**. This project was designed as a real-world assessment showcasing clean architecture, scalable backend design, and modern frontend practices.

---

## 🚀 Features

### 👤 Authentication & Authorization

* User **Register & Login** using JWT (stored securely in cookies)
* **Role-based access control** (Admin / User)
* Protected & public routes
* Auto-login on page refresh (`/api/auth/me`)

### 🍭 Sweet Management (Admin)

* Add new sweets with **image upload**
* Update sweet details using **modal-based edit**
* Delete sweets with **confirmation modal**
* View all sweets in a responsive grid

### 📦 Inventory Management

* Purchase sweets (quantity updates automatically)
* Prevent purchase when stock is empty
* Show **Out of Stock** badge

### 🔍 Search & Filter

* Search sweets by name (debounced)
* Filter by category
* Filter by min & max price
* Combined filters supported

### 🎨 UI / UX

* Modern UI using **Tailwind CSS + DaisyUI**
* Smooth animations using **Framer Motion**
* Toast notifications for actions
* Responsive design (mobile-friendly)

---

## 🧠 Tech Stack

### Frontend

* **React + TypeScript**
* **Vite**
* **Zustand** (State Management)
* **Axios** (API calls)
* **Tailwind CSS + DaisyUI** (UI)
* **Framer Motion** (Animations)
* **React Router DOM**

### Backend

* **Node.js**
* **Express.js (TypeScript)**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Multer** (File upload)
* **ImageKit** (Image storage)

---

## 📦 Important Packages

### Backend

```bash
express
mongoose
jsonwebtoken
bcryptjs
multer
cors
dotenv
imagekit
validator
```

### Frontend

```bash
react
zustand
axios
react-router-dom
framer-motion
react-hot-toast
daisyui
tailwindcss
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=8080
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
FRONTEND_URL=your_frontend_url
```

### Frontend `.env`

```env
VITE_SERVER_URL=http://localhost:8080
```

---

## 🛠️ How to Setup Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/sweet-shop-manager.git
cd sweet-shop-manager
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`
Backend runs on: `http://localhost:8080`

---

## 🗂️ Project Structure
```
sweet-shop-manager/
├── .gitignore
├── backend/
│   ├── package-lock.json
│   ├── package.json
│   ├── src/
│   │   ├── app.ts
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   ├── imagekit.ts
│   │   │   └── multer.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── inventory.controller.ts
│   │   │   └── sweet.controller.ts
│   │   ├── interfaces/
│   │   │   ├── sweet.schema.ts
│   │   │   └── user.schema.ts
│   │   ├── middlewares/
│   │   │   ├── admin.middleware.ts
│   │   │   └── auth.middleware.ts
│   │   ├── models/
│   │   │   ├── sweet.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── inventory.routes.ts
│   │   │   └── sweet.routes.ts
│   │   ├── server.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── inventory.service.ts
│   │   │   └── sweet.service.ts
│   │   ├── types/
│   │   │   └── express/
│   │   │       ├── custom.d.ts
│   │   │       └── index.d.ts
│   │   └── utils/
│   │       ├── jwt.ts
│   │       ├── uploadImage.ts
│   │       └── validateRegister.ts
│   └── tsconfig.json
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.tsx
    │   ├── assets/
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── DeleteSweetModal.tsx
    │   │   ├── EditSweetModal.tsx
    │   │   ├── Loader.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── Route.tsx
    │   │   ├── SearchFilter.tsx
    │   │   ├── Spinner.tsx
    │   │   ├── SweetCard.tsx
    │   │   └── Sweets.tsx
    │   ├── constants.ts
    │   ├── index.css
    │   ├── layouts/
    │   │   └── MainLayout.tsx
    │   ├── main.tsx
    │   ├── pages/
    │   │   ├── AddSweetPage.tsx
    │   │   ├── HomePage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── NotFoundPage.tsx
    │   │   └── RegisterPage.tsx
    │   ├── routes/
    │   │   ├── AdminRoute.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   └── PublicRoute.tsx
    │   ├── store/
    │   │   ├── useSweetStore.ts
    │   │   └── useUserStore.ts
    │   └── types.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vercel.json
    └── vite.config.ts
```

### Backend (Clean Architecture)

* `controllers/` → Handle HTTP requests
* `services/` → Business logic
* `models/` → MongoDB schemas
* `routes/` → API routes
* `middlewares/` → Auth & role guards
* `utils/` → JWT, image upload, validations
* `config/` → Env, multer, imagekit setup

### Frontend

* `pages/` → Route-level pages
* `components/` → Reusable UI components
* `store/` → Zustand stores
* `routes/` → Protected/Admin routes
* `layouts/` → App layout

---

## 📄 Pages Overview

### 🔐 Authentication

* Login Page
* Register Page

### 🏠 Home Page

* Navbar
* Search & filters
* Sweet listing

### ➕ Add Sweet Page (Admin)

* Form with image upload

### ✏️ Edit Sweet (Admin)

* DaisyUI modal

### 🗑 Delete Sweet (Admin)

* Confirmation modal

### 🚫 404 Page

* Friendly not found page

---

## 🧪 API Endpoints (Sample)

```http
Auth Routes
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

Sweet Routes
GET    /api/sweets
GET    /api/sweets/search
POST   /api/sweets (Admin)
PUT    /api/sweets/:id (Admin)
DELETE /api/sweets/:id (Admin)

Inventory Routes
POST   /api/inventory/:id/purchase
PORT /api/inventory/:id/restock

```

---

## 🧑‍💻 Assessment Highlights

* Clean folder structure
* Separation of concerns (Controller / Service)
* Type-safe backend & frontend
* Real-world patterns (RBAC, modals, debouncing)
* Production-ready codebase

---

## 📸 Screenshots

> Add screenshots here when submitting assessment:

* Login Page
* Register Page
* Home Page (Sweet Listing)
* Add Sweet Page
* Edit Sweet Modal
* Delete Confirmation Modal

---

## 📌 Future Improvements

* Pagination
* Order history
* Admin dashboard
* Unit & integration tests
* CI/CD pipeline

---

## 🙌 Author

**Ankit Jha**
