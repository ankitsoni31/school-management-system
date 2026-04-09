import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase()) ||
    s.batchYear.toString().includes(search)
  );

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-60">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Manage Students
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by Name, Class or Batch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl shadow-md p-5">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead>
              <tr className="text-gray-500">
                <th className="pb-4">Name</th>
                <th className="pb-4">Class</th>
                <th className="pb-4">Batch</th>
                <th className="pb-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="space-y-3">

              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition"
                >
                  {/* NAME */}
                  <td className="py-4 px-2 font-semibold text-gray-800">
                    {student.name}
                  </td>

                  {/* CLASS */}
                  <td className="py-4 px-2 text-gray-600">
                    {student.class}
                  </td>

                  {/* BATCH */}
                  <td className="py-4 px-2 text-gray-600">
                    {student.batchYear}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4 px-2 text-center space-x-2">

                    <button
                      className="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition"
                      onClick={() => navigate(`/edit-student/${student._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-[#e60073] text-white px-4 py-1 rounded-lg hover:opacity-90 transition"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>

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

export default ManageStudent;