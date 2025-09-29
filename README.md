# Task Manager

A simple **Task Manager** app built with:
- **Frontend**: React + Vite + TailwindCSS  
- **Backend**: Python (FastAPI) with an in-memory store  

---

## 🚀 Features
- Add a new task (title + description)
- View tasks (pending & completed separately)
- Mark tasks as completed
- Minimal, clean UI with TailwindCSS
- REST APIs with FastAPI (auto-generated Swagger docs)

---

## 🗂️ Project Structure

```text
task-manager/
├─ backend/        # FastAPI backend
│  ├─ app/
│  │  ├─ __init__.py
│  │  ├─ main.py
│  │  ├─ models.py
│  │  ├─ storage.py
│  │  └─ crud.py
│  └─ requirements.txt
│
├─ frontend/       # React + Vite + Tailwind frontend
│  ├─ src/
│  │  ├─ main.jsx
│  │  ├─ App.jsx
│  │  ├─ api.js
│  │  ├─ index.css
│  │  └─ components/
│  │     ├─ AddTask.jsx
│  │     └─ TaskList.jsx
│  ├─ index.html
│  ├─ package.json
│  ├─ tailwind.config.cjs
│  └─ postcss.config.cjs
│
└─ README.md       


## ⚙️ Setup Instructions

### 1️⃣ Backend (FastAPI)

cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate   # Linux/Mac
# or: .venv\Scripts\activate   # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
API runs at: http://localhost:8000

Interactive docs: http://localhost:8000/docs

2️⃣ Frontend (React + Tailwind)

cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
Frontend runs at: http://localhost:5173

It connects to the backend on http://localhost:8000

🔗 API Endpoints
POST /tasks → Add a new task

GET /tasks → Get all tasks

?status=pending → only pending

?status=completed → only completed

PUT /tasks/{id}/complete → Mark task as completed

📖 Approach
Backend: FastAPI was chosen for its simplicity, speed, and built-in validation with Pydantic. Tasks are stored in-memory (list) for now.

Frontend: React with TailwindCSS provides a clean UI. State is managed locally using useState. API calls are abstracted in api.js.

Future Improvements:

Add persistent database (SQLite/Postgres)

Add user authentication

Add task editing/deletion

Improve UI with filters and sorting

🛠️ Tech Stack
Backend: Python, FastAPI, Uvicorn

Frontend: React, Vite, TailwindCSS

Other: REST API, in-memory storage

