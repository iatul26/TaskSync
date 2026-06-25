import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },

  assignee: {
    type: String,
    default: 'Unassigned'
  },

  deadline: {
    type: Date,
    default: null
  }

}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);