import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Landing() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 italic">Future<span className="text-blue-600">Ready</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide text-gray-500 uppercase">
            <a href="#metrics" className="hover:text-blue-600 transition-colors">Why Us</a>
            <a href="#methodology" className="hover:text-blue-600 transition-colors">Methodology</a>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition-colors font-bold">Sign Out</button>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600 transition-colors font-bold">Sign In</Link>
                <Link to="/register" className="bg-[#FF4B4B] text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-200 font-bold">Register Now</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">AI Powered Career Test</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-[1.05] mb-8 tracking-tight">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Career Discovery</span> & Intelligence
            </h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium max-w-xl">
              Understand your Interest, Personality, and Aptitude with our proprietary Assessment engine. Join 50,000+ students mapped to their perfect career path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/assessment" 
                className="bg-[#FF4B4B] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-red-200 hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all text-center uppercase tracking-widest"
              >
                Take the Test
              </Link>
              <div className="flex items-center gap-4 px-6">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-gray-400">Trusted by <span className="text-gray-900">2.5M+</span> users</div>
              </div>
            </div>
          </div>
          <div className="relative z-10 hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(37,99,235,0.3)] transform rotate-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
                <div className="text-white text-xs font-black uppercase tracking-widest mb-2 opacity-60">Real-time Progress</div>
                <div className="flex items-end gap-1 h-32 items-baseline">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/30 rounded-t-lg transition-all hover:bg-white" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                </div>
                <div>
                  <div className="text-2xl font-black">97.2%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Accuracy Index</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Why Choose Us</h2>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight">Data-Driven Success</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { label: "Students Mapped", value: "2.5M+", icon: "👨‍🎓" },
              { label: "Careers Analyzed", value: "50,000", icon: "🚀" },
              { label: "Accuracy Index", value: "97.2%", icon: "🎯" },
              { label: "Expert Counselors", value: "1,200", icon: "🤝" }
            ].map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{m.icon}</div>
                <div className="text-4xl font-black text-gray-900 mb-1">{m.value}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section (PIAV Model) */}
      <section id="methodology" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-blue-600 rounded-[4rem] flex items-center justify-center p-20 shadow-2xl relative overflow-hidden">
                 {/* Internal graphic placeholder */}
                 <div className="w-full h-full border-4 border-white/20 rounded-full animate-spin-slow flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-4 border-white/40 rounded-full flex items-center justify-center">
                       <span className="text-white text-8xl font-black italic">IA</span>
                    </div>
                 </div>
                 {/* Absolute labels */}
                 <div className="absolute top-10 left-10 bg-white p-4 rounded-2xl shadow-xl font-black text-blue-600">P</div>
                 <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl font-black text-indigo-600">I</div>
                 <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl font-black text-teal-600">A</div>
                 <div className="absolute bottom-10 right-10 bg-white p-4 rounded-2xl shadow-xl font-black text-orange-600">V</div>
              </div>
            </div>
            <div>
              <h2 className="text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
                The P-I-A-V Scientific <br /><span className="text-blue-600">Methodology</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { t: "Personality", d: "Understanding your behavioral traits and social dynamics.", c: "text-blue-600", bg: "bg-blue-50" },
                  { t: "Interest", d: "Mapping what you love to do with high-growth roles.", c: "text-indigo-600", bg: "bg-indigo-50" },
                  { t: "Aptitude", d: "Measuring cognitive strengths and logical reasoning.", c: "text-teal-600", bg: "bg-teal-50" },
                  { t: "Values", d: "Aligning your career path with your core ethics.", c: "text-orange-600", bg: "bg-orange-50" }
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} p-6 rounded-3xl border border-transparent hover:border-white transition-all`}>
                    <h4 className={`text-xl font-black mb-2 ${item.c}`}>{item.t}</h4>
                    <p className="text-sm text-gray-500 font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black text-white">F</div>
                <span className="text-xl font-black text-white italic">Future<span className="text-blue-400">Ready</span></span>
              </div>
              <p className="text-gray-400 font-medium mb-8 leading-relaxed max-w-xs">
                Empowering the next generation of professionals through AI-driven psychometric intelligence.
              </p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Product</h4>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><Link to="/assessment" className="hover:text-white transition-colors">Career Assessment</Link></li>
                <li><button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit p-0">College Library</button></li>
                <li><button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit p-0">Expert Counseling</button></li>
                <li><button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit p-0">Price Plans</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Get In Touch</h4>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li className="flex items-center gap-3"><span className="text-lg">📧</span> contact@futureready.ai</li>
                <li className="flex items-center gap-3"><span className="text-lg">📞</span> +1 (800) FUTURE-AI</li>
                <li className="flex items-start gap-3"><span className="text-lg">📍</span> 101 AI Tower, <br />Innovation District, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:row items-center justify-between gap-6">
            <p className="text-gray-500 font-bold text-xs">© 2026 FutureReady AI. All Rights Reserved.</p>
            <div className="flex gap-8 text-gray-500 font-bold text-xs uppercase tracking-widest">
              <button className="hover:text-white bg-transparent border-none cursor-pointer text-inherit font-inherit p-0">Privacy Policy</button>
              <button className="hover:text-white bg-transparent border-none cursor-pointer text-inherit font-inherit p-0">Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Landing;