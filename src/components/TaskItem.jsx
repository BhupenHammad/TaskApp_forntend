import { useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const startEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      onEdit(task._id, editText.trim());
      setIsEditing(false);
    } else {
      alert('Task text cannot be empty');
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-gray-200/50 flex items-center justify-between font-poppins">
      <div className="flex items-center space-x-4 flex-grow">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, task.completed)}
          className="h-6 w-6 rounded text-black focus:ring-2 focus:ring-offset-2 focus:ring-black border-gray-300 transition duration-200"
        />

        {!isEditing ? (
          <div className="flex-grow">
            <p className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]`}>
              {task.text}
            </p>
            <small className="text-gray-500">
              {new Date(task.createdAt).toLocaleString('en-US')}
            </small>
          </div>
        ) : (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow p-2 bg-gradient-to-r from-gray-100 to-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
            autoFocus
          />
        )}
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {!isEditing ? (
          <>
            <button onClick={startEdit} title="Edit Task" className="text-blue-600">
              <FaEdit />
            </button>
            <button onClick={() => onDelete(task._id)} className="text-red-500">
              <FaTrash />
            </button>
          </>
        ) : (
          <>
            <button onClick={saveEdit} title="Save" className="text-green-600">
              <FaSave />
            </button>
            <button onClick={cancelEdit} title="Cancel" className="text-gray-500">
              <FaTimes />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
