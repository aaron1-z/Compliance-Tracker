# Compliance Tracker

 <img width="953" height="446" alt="image" src="https://github.com/user-attachments/assets/9ca40636-3c36-40ea-8329-68298096e89d" />

 <img width="959" height="446" alt="image" src="https://github.com/user-attachments/assets/b3964e1b-309e-442e-bd1c-6ffcd3862668" />

*Live:** [https://compliance-tracker-pearl.vercel.app](https://compliance-tracker-pearl.vercel.app)
**API:** [https://compliance-tracker-api-n2pm.onrender.com](https://compliance-tracker-api-n2pm.onrender.com)

A full-stack web app to manage compliance tasks and deadlines for clients.
## Tech Stack
- **Frontend:** React 19, Vite 8, Axios
- **Backend:** Express 5, SQLite3, UUID
## Getting Started
### Backend
```bash
cd backend
npm install
npm start
Runs on http://localhost:5000.

Frontend
cd frontend
npm install
npm run dev
Runs on http://localhost:5173

Features
--View and select clients
--Add compliance tasks with category, priority, and due date
--Filter tasks by status (All / Pending / Completed)
--Toggle task status between Pending and Completed
--Overdue task highlighting

Tradeoffs
--SQLite for simplicity — not suited for concurrent/multi-user scaling
--No auth — scope limited to task management
--Render free tier has ~30s cold start after inactivity

Assumptions
--Small-scale, single-user usage
--Clients are pre-seeded; no client CRUD UI
--Fixed categories (Tax, Audit, Legal, Regulatory) and priorities (Low, Medium, High)
