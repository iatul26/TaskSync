import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

const API_BASE = 'http://localhost:5000/api/tasks';
const socket = io('http://localhost:5000');

function App() {
  const [tasks, setTasks] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    deadline: ''
  });

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err =>
        console.error(
          'Could not fetch initial data stream:',
          err
        )
      );

    socket.on('taskCreated', (newTask) => {
      setTasks(prev => [...prev, newTask]);
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks(prev =>
        prev.map(t =>
          t._id === updatedTask._id
            ? updatedTask
            : t
        )
      );
    });

    socket.on('taskDeleted', (id) => {
      setTasks(prev =>
        prev.filter(t => t._id !== id)
      );
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    setForm({
      title: '',
      description: '',
      assignee: '',
      deadline: ''
    });
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData(
      'text/plain',
      taskId
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e,
    targetStatus
  ) => {
    const taskId =
      e.dataTransfer.getData(
        'text/plain'
      );

    setTasks(prev =>
      prev.map(t =>
        t._id === taskId
          ? {
              ...t,
              status: targetStatus
            }
          : t
      )
    );

    await fetch(
      `${API_BASE}/${taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type':
            'application/json'
        },
        body: JSON.stringify({
          status: targetStatus
        })
      }
    );
  };

  const handleDelete = async (id) => {
    await fetch(
      `${API_BASE}/${id}`,
      {
        method: 'DELETE'
      }
    );
  };

  const tasksDueOnSelectedDate =
    tasks.filter(task => {
      if (!task.deadline)
        return false;

      const taskDate =
        new Date(
          task.deadline
        ).toDateString();

      const selected =
        selectedDate.toDateString();

      return taskDate === selected;
    });

  const renderColumn = (
    statusValue,
    titleText
  ) => {
    const columnTasks =
      tasks.filter(
        t => t.status === statusValue
      );

    return (
      <div
        className="column"
        onDragOver={handleDragOver}
        onDrop={(e) =>
          handleDrop(
            e,
            statusValue
          )
        }
      >
        <h2>
          {titleText} (
          {columnTasks.length})
        </h2>

        <div className="task-list">
          {columnTasks.map(task => {
            const isOverdue =
              task.deadline &&
              new Date(
                task.deadline
              ) < new Date() &&
              task.status !== 'done';

            return (
              <div
                key={task._id}
                className={`task-card ${
                  isOverdue
                    ? 'overdue'
                    : ''
                }`}
                draggable
                onDragStart={(e) =>
                  handleDragStart(
                    e,
                    task._id
                  )
                }
              >
                <h3>{task.title}</h3>

                <p>
                  {task.description ||
                    'No description provided.'}
                </p>

                {task.deadline && (
                  <div className="deadline">
                    📅 Deadline:{' '}
                    {new Date(
                      task.deadline
                    ).toLocaleDateString()}
                  </div>
                )}

                <div className="card-footer">
                  <span className="assignee-badge">
                    👤{' '}
                    {task.assignee ||
                      'Unassigned'}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        task._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1>TaskSync Board</h1>
        <p>
          Real-Time Team Operations
          Hub
        </p>
      </header>

      <form
        className="task-form"
        onSubmit={
          handleCreateTask
        }
      >
        <input
          type="text"
          placeholder="Task Title..."
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Short description..."
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Assignee Name..."
          value={form.assignee}
          onChange={(e) =>
            setForm({
              ...form,
              assignee:
                e.target.value
            })
          }
        />

        <input
          type="date"
          value={form.deadline}
          onChange={(e) =>
            setForm({
              ...form,
              deadline:
                e.target.value
            })
          }
        />

        <button type="submit">
          Add Task
        </button>
      </form>

      <section className="calendar-section">
        <h2>
          📅 Task Calendar
        </h2>

        <Calendar
          onChange={
            setSelectedDate
          }
          value={selectedDate}
        />

        <div className="due-tasks">
          <h3>
            Tasks Due On{' '}
            {selectedDate.toLocaleDateString()}
          </h3>

          {tasksDueOnSelectedDate
            .length === 0 ? (
            <p>
              No tasks due on
              this date.
            </p>
          ) : (
            tasksDueOnSelectedDate.map(
              task => (
                <div
                  key={
                    task._id
                  }
                  className="due-task-item"
                >
                  • {task.title}
                </div>
              )
            )
          )}
        </div>
      </section>

      <main className="board">
        {renderColumn(
          'todo',
          'To Do'
        )}
        {renderColumn(
          'in-progress',
          'In Progress'
        )}
        {renderColumn(
          'done',
          'Completed'
        )}
      </main>
    </div>
  );
}

export default App;