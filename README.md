# 🏥 Doctor Appointment System

A full-stack healthcare appointment booking platform built with the MERN stack, featuring separate portals for patients, doctors, and admins, with integrated online payments.

**Live demo:** [🔗 Live: https://doctor-appointment-system-mu-lemon.vercel.app/]

---

## ✨ Features

- **Patient Portal** — browse doctors by specialty, book/cancel appointments, view appointment history, secure login/signup
- **Doctor Portal** — manage appointment requests, update availability, view earnings and patient details
- **Admin Portal** — manage doctors (add/remove/edit), oversee all appointments, view platform-wide analytics
- **Online Payments** — integrated Razorpay for appointment fee payments
- **Authentication** — JWT-based auth with role-based access (patient / doctor / admin)
- **Responsive UI** — fully responsive across desktop and mobile

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas
**Auth:** JSON Web Tokens (JWT)
**Payments:** Razorpay
**Image Hosting:** Cloudinary
**Deployment:** Vercel (frontend + admin panel), Render (backend)

---

## 📁 Project Structure

```
doctor-appointment-system/
├── frontend/        # Patient-facing React app
├── admin/           # Doctor + Admin dashboard (React app)
├── backend/         # Express API server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account
- Razorpay account (test mode is fine for development)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/AkhtarAli945/Doctor-Appointment-System.git
   cd Doctor-Appointment-System
   ```

2. Install dependencies for each app
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../admin && npm install
   ```

3. Set up environment variables (see below), then run each app in its own terminal:
   ```bash
   # backend
   cd backend && npm run server

   # frontend
   cd frontend && npm run dev

   # admin
   cd admin && npm run dev
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` folder based on `.env.example`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

> ⚠️ Never commit your actual `.env` file — only `.env.example` with placeholder values should be tracked in git.

Frontend and admin apps each need their own `.env` pointing to the deployed/local backend URL:
```
VITE_BACKEND_URL=http://localhost:4000
```

---

## 📸 Screenshots

*(Add screenshots or a short demo GIF here — this is the single highest-impact addition for recruiters skimming the repo)*

---

## 🗺️ Roadmap / Future Improvements

- [ ] Email notifications for appointment confirmations
- [ ] SMS reminders
- [ ] Doctor rating & review system
- [ ] Video consultation support

---

## 👤 Author

**Akhtar Ali**
- LinkedIn: [in/akhtarali-mern](https://www.linkedin.com/in/akhtarali-mern)
- Portfolio: [akhtarali-portfolio-live.vercel.app](https://akhtarali-portfolio-live.vercel.app/#home)
- GitHub: [@AkhtarAli945](https://github.com/AkhtarAli945)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
