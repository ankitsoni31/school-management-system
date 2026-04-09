import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", data);

      localStorage.setItem("token", res.data.token);

      alert("Login Success");

      navigate("/manage-student");

    } catch (err) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7fb]">

      {/* CARD */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-lg w-96 space-y-6"
      >

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e)=>setData({...data, email:e.target.value})}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e)=>setData({...data, password:e.target.value})}
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;