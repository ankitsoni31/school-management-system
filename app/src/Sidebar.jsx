import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaSignOutAlt,
  FaUserPlus,
  FaUsers,
  FaTasks,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = (path) =>
    `flex items-center p-3 rounded-xl transition ${
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-700 hover:bg-purple-100"
    }`;

  return (
    <div className="bg-white text-gray-800 w-60 h-screen fixed left-0 top-0 p-5">

      <h2 className="text-xl font-bold mb-6 text-center">
        Admin Dashboard
      </h2>

      <ul className="space-y-2">

        <li>
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            <FaChartPie className="mr-3" />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/manage-student" className={linkClass("/manage-student")}>
            <FaUsers className="mr-3" />
            Manage Students
          </Link>
        </li>

        <li>
          <Link to="/add-student" className={linkClass("/add-student")}>
            <FaUserPlus className="mr-3" />
            Add Student
          </Link>
        </li>

        <li>
          <Link to="/assign-task" className={linkClass("/assign-task")}>
            <FaTasks className="mr-3" />
            Assign Task
          </Link>
        </li>

        <li>
          <Link to="/tasks" className={linkClass("/tasks")}>
            <FaClipboardList className="mr-3" />
            View Tasks
          </Link>
        </li>

        <li className="pt-4">
          <button
            onClick={handleLogout}
            style={{ backgroundColor: "#e60073" }}
            className="w-full flex items-center justify-center text-white p-3 rounded-xl"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;