import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {

  const [studentData, setStudentData] = useState({
    name: "",
    class: "",
    batchYear: "",
    gender: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    const res = await axios.get(`http://localhost:5000/students/${id}`);
    setStudentData(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:5000/students/${id}`, studentData);
        alert("Student Updated");
      } else {
        await axios.post("http://localhost:5000/students", studentData);
        alert("Student Added");
      }

      navigate("/manage-student");

    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-60 p-6">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {id ? "Edit Student" : "Add Student"}
        </h2>

        {/* CENTER */}
        <div className="flex justify-center">

          {/* 🔥 WIDTH FIXED */}
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

              {/* NAME */}
              <input
                value={studentData.name}
                onChange={(e)=>setStudentData({...studentData, name:e.target.value})}
                type="text"
                placeholder="Name"
                className="col-span-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              {/* CLASS */}
              <input
                value={studentData.class}
                onChange={(e)=>setStudentData({...studentData, class:e.target.value})}
                type="text"
                placeholder="Class"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              {/* BATCH */}
              <input
                value={studentData.batchYear}
                onChange={(e)=>setStudentData({...studentData, batchYear:e.target.value})}
                type="number"
                placeholder="Batch Year"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              {/* GENDER */}
              <select
                value={studentData.gender}
                onChange={(e)=>setStudentData({...studentData, gender:e.target.value})}
                className="col-span-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* BUTTON */}
              <button
                type="submit"
                className="col-span-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                {id ? "Update Student" : "Add Student"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AddStudent;