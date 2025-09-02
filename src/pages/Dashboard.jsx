import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import TaskItem from '../components/TaskItem';

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask({ text });
      setText('');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await taskService.updateTask(id, { completed: !currentStatus });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id, newText) => {
    try {
      await taskService.updateTask(id, { text: newText });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-gray-50 py-10">
      <div className="w-full max-w-2xl p-8 bg-white/30 backdrop-blur-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-gray-200/50">
        <section className="text-center mb-8 font-poppins">
          <h1 className="text-4xl font-bold text-gray-800 [text-shadow:0_2px_4px_rgba(0,0,0,0.15)]">Welcome {user && user.name}</h1>
          <p className="text-gray-600 mt-2 font-medium">Tasks Dashboard</p>
        </section>

        <section className="mb-8 font-poppins">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow p-3 bg-gradient-to-r from-gray-100 to-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-black to-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Add
            </button>
          </form>
        </section>

        <section className="font-poppins">
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 font-medium">You have not set any tasks</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
