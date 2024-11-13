import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token) {
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, date };
      await axios.post(
        `http://localhost:5000/api/tasks/${userId}/create`,
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/dashboard/:userId");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Task</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
