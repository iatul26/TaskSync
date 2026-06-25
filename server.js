import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Task } from './models/Task.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS for local development environments
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors());
app.use(express.json());

// Fallback to local MongoDB instance if environment variable is absent
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tasksync';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB safely.'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// REST API Endpoints
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    
    // Broadcast the newly created task to all active websocket connections
    io.emit('taskCreated', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Broadcast updates (e.g., status/drag updates) instantly across users
    io.emit('taskUpdated', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    io.emit('taskDeleted', req.params.id);
    res.json({ message: 'Task removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Socket.io Real-time Protocol Handlers
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 TaskSync Server accelerating smoothly on port ${PORT}`);
});