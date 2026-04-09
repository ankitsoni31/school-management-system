import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markComplete = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-60 p-6">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Tasks
        </h2>

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl shadow-md p-5">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead>
              <tr className="text-gray-500">
                <th className="pb-4">Student</th>
                <th className="pb-4">Task</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="space-y-3">

              {tasks.map((t) => (
                <tr
                  key={t._id}
                  className="bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition"
                >
                  {/* STUDENT */}
                  <td className="py-4 px-2 font-semibold text-gray-800">
                    {t.studentId?.name}
                  </td>

                  {/* TASK */}
                  <td className="py-4 px-2 text-gray-600">
                    {t.task}
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        t.completed
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {t.completed ? "Done" : "Pending"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-2 text-center">

                    {!t.completed && (
                      <button
                        onClick={() => markComplete(t._id)}
                        className="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition"
                      >
                        Complete
                      </button>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default Tasks;