# 📚 ShuleConnect — Full Stack Learning Hub

**ShuleConnect** is a collaborative learning platform where students can upload, browse, review, and share educational materials. Built with a React + Bootstrap frontend and a Django REST Framework backend.

## ⚙️ Tech Stack

### 🖥️ Frontend:

- React.js
- Bootstrap 5
- Axios
- React Router

### 🛠️ Backend:

- Django & Django REST Framework
- PostgreSQL (or SQLite for local)
- JWT Authentication
- SMTP Email (for OTP verification)

---

## 🚀 Features

### 🌐 Frontend

- Responsive and mobile-friendly UI
- User authentication (login, register, OTP verification)
- Upload and view learning materials

### 🔙 Backend

- RESTful API with JWT auth
- Email-based OTP verification
- Learning material CRUD
- Review creation, update, delete with rating logic
- User permissions and ownership checks

---

## 🏗️ How to Run Locally

### 1. Clone the Repository

- git clone https://github.com/G-Gakii/EdTech#
- cd EdTech

### 2. Backend Setup (Django)

- cd backend
- python -m venv env
- source env/bin/activate # or `env\Scripts\activate` on Windows
- pip install -r requirements.txt
- set up environment variables
  1. EMAIL
  2. PASSWORD
  3. SECRET_KEY
- python manage.py migrate
- python manage.py runserver

### 3. Frontend Setup (React)

- cd ../frontend
- npm install
- set up environment variables: VITE_API_URL
- npm start

### 4. Learning Material APIs

- `/materials	GET` List all materials (searchable by title, category)
- `/materials	POST` Upload new material (authenticated users)
- `/materials/<uuid:pk>/` GET Retrieve material details
- `/materials/<uuid:pk>/` PUT/DELETE Update or delete (owner only)
- `/featured/` GET Returns latest 3 uploaded materials
- `/materials/<uuid:pk>/reviews` POST Submit a review for a material
- `/materials/review/<uuid:pk>/` GET/PUT/DELETE View/update/delete own review

### 5.Notes

- Auth-protected routes are handled using JWT in both frontend and backend.
- Material reviews support average rating calculations and review restrictions.
- Permissions ensure users can only modify their own data.
