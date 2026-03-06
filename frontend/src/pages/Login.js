import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("userId", res.data.user._id);
      navigate("/"); // Navigate to landing page (Dashboard) after login
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-800 to-teal-700 p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4 border border-white/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-blue-100 font-medium">Continue your path to excellence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-white/70 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              name="email" 
              type="email"
              placeholder="john@example.com" 
              onChange={handleChange} 
              required
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-white/70 uppercase tracking-widest ml-1">Secure Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-indigo-700 font-black py-4 rounded-2xl shadow-xl hover:bg-blue-50 active:scale-95 transition-all text-lg mb-4"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/60 font-medium mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-black hover:underline tracking-tight">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;