import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AssignTask = () => {

  const [students, setStudents] = useState([]);
  const [taskData, setTaskData] = useState({
    studentId: "",
    task: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/tasks", taskData);

    alert("Task Assigned");

    setTaskData({ studentId: "", task: "" });
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-60 p-6">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Assign Task
        </h2>

        {/* CENTER WRAPPER */}
        <div className="flex justify-center">

          {/* FINAL WIDTH CARD */}
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* SELECT STUDENT */}
              <select
                value={taskData.studentId}
                onChange={(e)=>setTaskData({...taskData, studentId:e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              >
                <option value="">Select Student</option>
                {students.map((s)=>(
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* TASK INPUT */}
              <input
                value={taskData.task}
                onChange={(e)=>setTaskData({...taskData, task:e.target.value})}
                placeholder="Enter Task"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Assign Task
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AssignTask;