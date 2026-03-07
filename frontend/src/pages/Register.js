import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
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
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      // handle error silently
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4 border border-white/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-blue-100 font-medium">Start your journey to success</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-white/70 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              name="name" 
              placeholder="John Doe" 
              onChange={handleChange} 
              required
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </div>

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
            className="w-full bg-white text-blue-700 font-black py-4 rounded-2xl shadow-xl hover:bg-blue-50 active:scale-95 transition-all text-lg mb-4"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="text-center text-white/60 font-medium mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-black hover:underline tracking-tight">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;