# 🚀 TaskSync

## Real-Time Kanban Task Management System

TaskSync is a real-time task management application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.io** for live collaboration.

The application enables teams to create, organize, assign, and track tasks through an intuitive Kanban board while synchronizing updates instantly across multiple users.

---

# 📌 Features

### ✅ Task Management

* Create tasks
* Delete tasks
* Assign tasks to team members
* Add task descriptions
* Track task status

### ✅ Kanban Workflow

Tasks are organized into:

* 📝 To Do
* 🔄 In Progress
* ✅ Completed

### ✅ Drag and Drop

Move tasks between columns using drag-and-drop functionality.

### ✅ Real-Time Collaboration

Powered by Socket.io:

* Instant task creation updates
* Instant status changes
* Instant task deletion updates

### ✅ Deadlines

Assign deadlines to tasks using a date picker.

### ✅ Calendar View

View tasks according to their due dates using an integrated calendar.

### ✅ Overdue Detection

Tasks whose deadlines have passed are automatically highlighted.

### ✅ Persistent Storage

All tasks are stored securely in MongoDB.

---

# 🛠 Technology Stack

## Frontend

* React.js
* Vite
* CSS3
* Socket.io Client
* React Calendar

## Backend

* Node.js
* Express.js
* Socket.io
* Mongoose

## Database

* MongoDB

---

# 🏗 Project Architecture

```text
TaskSync
│
├── backend
│   ├── models
│   │   └── Task.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend
    │
    ├── src
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── index.html
    └── package.json
```

---

# ⚙️ System Workflow

```text
User
 │
 ▼
React Frontend
 │
 ▼
REST API + Socket.io
 │
 ▼
Node.js / Express Server
 │
 ▼
MongoDB Database
```

### Working Process

1. User creates a task.
2. React sends data to Express API.
3. Express stores task information in MongoDB.
4. Socket.io broadcasts updates.
5. Connected users receive changes instantly.
6. Tasks can be moved between workflow stages.
7. Deadlines are displayed in both the Kanban board and calendar view.

---

# 📅 Calendar & Deadline Management

### Deadline Assignment

Each task can be assigned a due date.

### Calendar Integration

Users can:

* Select a date
* View tasks due on that date
* Monitor upcoming deadlines

### Overdue Tasks

Tasks are marked overdue when:

```text
Current Date > Deadline
AND
Task Status ≠ Completed
```

Overdue tasks are highlighted with a red border.

---

# 🚀 Installation Guide

## Prerequisites

Install:

* Node.js
* npm
* MongoDB Community Server

Verify installation:

```bash
node -v
npm -v
mongosh
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/tasksync
PORT=5000
```

Start server:

```bash
npm run dev
```

Expected output:

```text
🚀 TaskSync Server accelerating smoothly on port 5000
✅ Connected to MongoDB safely.
```

Backend URL:

```text
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install calendar package:

```bash
npm install react-calendar
```

Run application:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## Get All Tasks

```http
GET /api/tasks
```

Returns all tasks.

---

## Create Task

```http
POST /api/tasks
```

Request:

```json
{
  "title": "Complete README",
  "description": "Prepare GitHub documentation",
  "assignee": "Atul",
  "deadline": "2025-08-01"
}
```

---

## Update Task

```http
PUT /api/tasks/:id
```

Used for:

* Status changes
* Updating task information

---

## Delete Task

```http
DELETE /api/tasks/:id
```

Deletes a task permanently.

---

# 🎯 Key Features Demonstration

### Task Creation

Users can create tasks with:

* Title
* Description
* Assignee
* Deadline

### Drag & Drop

Tasks can move through:

```text
To Do
   ↓
In Progress
   ↓
Completed
```

### Real-Time Sync

Changes instantly appear on all connected clients.

### Calendar Tracking

Tasks can be viewed based on due dates.

---

# 📂 Database Schema

```javascript
{
  title: String,
  description: String,
  status: String,
  assignee: String,
  deadline: Date
}
```

---

# 📈 Applications

### Software Development Teams

* Sprint planning
* Bug tracking
* Feature management

### Student Projects

* Team assignments
* Project tracking

### Businesses

* Workflow management
* Employee task monitoring

### Personal Productivity

* Daily planning
* Goal tracking

---

# ✅ Advantages

* Real-time collaboration
* User-friendly Kanban interface
* Deadline management
* Calendar integration
* Fast updates using WebSockets
* Scalable MERN architecture
* Persistent cloud-ready storage

---

# ⚠️ Current Limitations

* No user authentication
* No role-based permissions
* No file uploads
* No notifications
* No task comments
* No activity history

---

# 🔮 Future Scope

### Authentication

* Login & Signup
* JWT Authentication

### Task Enhancements

* Priority Levels
* Tags & Labels
* Recurring Tasks
* Subtasks

### Collaboration

* Team Workspaces
* Task Comments
* Activity Logs

### Notifications

* Email Reminders
* Push Notifications

### Analytics Dashboard

* Task Statistics
* Productivity Reports
* Performance Metrics

### AI Features

* Smart Task Prioritization
* Deadline Prediction
* Productivity Recommendations

### Mobile Support

* Android Application
* iOS Application

---

# 🌐 Deployment

Recommended deployment architecture:

```text
Frontend
│
├── GitHub Pages
├── Vercel
└── Netlify

Backend
│
├── Render
├── Railway
└── Fly.io

Database
│
└── MongoDB Atlas
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Atul**

TaskSync – Real-Time Team Operations Hub

---

# 📄 License

This project is developed for educational, internship, and learning purposes.

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

---

Thank You for using TaskSync!
