import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // جلب التوكن و userId من localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // التحقق من وجود التوكن
  if (!token || !userId) {
    navigate("/login"); // إذا لم يوجد التوكن، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
  }

  // جلب المهام من الخادم
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/tasks/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId, token]);

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // حذف المهمة
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${userId}/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasks.filter((task) => task._id !== taskId)); // تحديث واجهة المستخدم بعد الحذف
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  console.log(tasks);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 flex justify-between">
        <button
          onClick={() => navigate("/create-task")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>

      {/* عرض المهام */}
      <div className="task-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No tasks found.
          </p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h2>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-gray-500 text-sm">{task.date}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/tasks/${userId}/${task._id}`)}
                    // onClick={() => navigate(`/tasks/:userId/:id`)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
