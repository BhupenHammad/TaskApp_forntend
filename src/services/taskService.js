import axios from 'axios';

const API_URL = 'https://taskapp-backend-x2cx.onrender.com/api/tasks/';

const createTask = async (taskData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

const getTasks = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const updateTask = async (taskId, taskData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.put(API_URL + taskId, taskData, config);
  return response.data;
};

const deleteTask = async (taskId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.delete(API_URL + taskId, config);
  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskService;