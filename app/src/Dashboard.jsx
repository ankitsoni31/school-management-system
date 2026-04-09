// Ankit - Final Dashboard (Final UI + Better Table)

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalStudent = students.length;

  const maleStudent = students.filter(
    (s) => s.gender?.toLowerCase() === "male"
  ).length;

  const femaleStudent = students.filter(
    (s) => s.gender?.toLowerCase() === "female"
  ).length;

  const batchData = students.reduce((acc, s) => {
    const batch = s.batchYear || "Unknown";
    acc[batch] = (acc[batch] || 0) + 1;
    return acc;
  }, {});

  const batchChartData = Object.keys(batchData).map((year) => ({
    batchYear: year,
    students: batchData[year],
  }));

  const classData = students.reduce((acc, s) => {
    const cls = s.class || "Unknown";
    acc[cls] = (acc[cls] || 0) + 1;
    return acc;
  }, {});

  const classChartData = Object.keys(classData).map((cls) => ({
    className: cls,
    students: classData[cls],
  }));

  const recentStudents = [...students].slice(-2).reverse();

  const genderData = [
    { name: "Male", value: maleStudent },
    { name: "Female", value: femaleStudent },
  ];

  const COLORS = ["#7c3aed", "#e60073"];

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-60">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Student Dashboard
        </h2>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl text-center shadow-md">
            <h3 className="text-gray-500">Total Students</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">
              {totalStudent}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl text-center shadow-md">
            <h3 className="text-gray-500">Male Students</h3>
            <p className="text-3xl font-bold mt-2 text-purple-600">
              {maleStudent}
            </p>
          </div>

          <div
            className="p-5 rounded-xl text-center shadow-md text-white"
            style={{ backgroundColor: "#e60073" }}
          >
            <h3>Female Students</h3>
            <p className="text-3xl font-bold mt-2">
              {femaleStudent}
            </p>
          </div>

        </div>

        {/* TOP CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Students Per Batch
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={batchChartData}>
                <XAxis dataKey="batchYear" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="students" fill="#7c3aed" radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Gender Distribution
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={genderData} dataKey="value" outerRadius={80} label>
                  {genderData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* CLASS */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Students Per Class
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classChartData}>
                <XAxis dataKey="className" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="students" fill="#22c55e" radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 UPDATED TABLE */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Recent Students
            </h3>

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Class</th>
                  <th className="pb-2">Batch</th>
                </tr>
              </thead>

              <tbody>
                {recentStudents.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b hover:bg-gray-50 even:bg-gray-50 transition"
                  >
                    <td className="py-3 font-semibold text-gray-800">
                      {s.name}
                    </td>

                    <td className="py-3 text-gray-600">
                      {s.class}
                    </td>

                    <td className="py-3 text-gray-600">
                      {s.batchYear}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;