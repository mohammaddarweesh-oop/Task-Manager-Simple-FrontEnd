// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditTask = () => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     completed: false,
//   });
//   const { taskId } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   // جلب البيانات الخاصة بالمهمة من الخادم
//   const fetchTask = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/tasks/${userId}/${taskId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTask(data);
//     } catch (error) {
//       console.error("Error fetching task:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTask();
//   }, [userId, taskId, token]);

//   // التعامل مع التغيير في البيانات
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // إرسال التحديثات إلى الخادم
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/tasks/${userId}/${taskId}`,
//         task,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       navigate(`/dashboard/${userId}`); // إعادة التوجيه إلى لوحة التحكم بعد التحديث
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-8 transition-all duration-300 hover:shadow-2xl">
//         <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
//           Edit Task
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label
//               htmlFor="title"
//               className="block text-gray-700 font-semibold mb-2"
//             >
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={task.title}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               placeholder="Enter task title"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-semibold mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={task.description}
//               onChange={handleChange}
//               className="w-full h-32 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               placeholder="Enter task description"
//               required
//             ></textarea>
//           </div>
//           <div className="mb-6 flex items-center">
//             <input
//               type="checkbox"
//               id="completed"
//               name="completed"
//               checked={task.completed}
//               onChange={() =>
//                 setTask((prevState) => ({
//                   ...prevState,
//                   completed: !prevState.completed,
//                 }))
//               }
//               className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label htmlFor="completed" className="text-gray-700 font-semibold">
//               Completed
//             </label>
//           </div>
//           <div className="flex justify-between items-center">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//             >
//               Update Task
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate(`/dashboard/${userId}`)}
//               className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTask;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const { taskId } = useParams(); // الحصول على taskId من رابط الصفحة
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // دالة لجلب البيانات الخاصة بالمهمة
  const fetchTask = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/tasks/${userId}/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTask(data); // تعبئة البيانات في النموذج
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // استخدام useEffect لجلب البيانات عند تحميل الصفحة
  useEffect(() => {
    if (userId && taskId && token) {
      fetchTask();
    }
  }, [userId, taskId, token]);

  // التعامل مع التغيير في الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // إرسال التحديثات إلى الخادم
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${userId}/${taskId}`,
        task,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/dashboard/${userId}`); // إعادة التوجيه إلى لوحة التحكم بعد التحديث
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Edit Task
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full h-32 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task description"
            ></textarea>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={task.completed}
              onChange={() =>
                setTask((prevState) => ({
                  ...prevState,
                  completed: !prevState.completed,
                }))
              }
              className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="text-gray-700 font-semibold">
              Completed
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={() => navigate(`/dashboard/${userId}`)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
