import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Result() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await API.get(`/result/${userId}`);
      setMatches(res.data.topMatches);
    } catch (error) {
      console.error("Error fetching results", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Assessment Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">It seems you haven't completed your assessment yet. Start your journey now!</p>
        <Link to="/assessment" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors">
          Start Assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Your Career Destiny
          </h1>
          <p className="text-xl text-gray-500 font-medium">Precision mapped recommendations based on your unique profile.</p>
        </header>

        {/* Top Matches Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {matches.map((match, idx) => (
            <div key={idx} className={`relative bg-white rounded-3xl p-8 shadow-2xl overflow-hidden border-2 ${idx === 0 ? 'border-blue-500 transform scale-105 z-10' : 'border-transparent'}`}>
              {idx === 0 && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-xs font-bold rounded-bl-xl">BEST FIT</div>
              )}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{match.careerDetails?.careerCluster || "Unknown"}</h3>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">{match.careerDetails?.careerRole || "Pending Assessment"}</h2>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-black text-blue-600">{match.fitPercentage}%</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Match</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{match.careerDetails?.description || "Complete your profile to unlock full detailed analysis."}"</p>
              
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-xl p-3">
                  <span className="block text-[10px] font-black text-blue-400 uppercase mb-1">Subject Stream</span>
                  <span className="text-sm font-bold text-blue-900">{match.careerDetails?.subjectStream || "N/A"}</span>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <span className="block text-[10px] font-black text-green-400 uppercase mb-1">Growth Index</span>
                  <span className="text-sm font-bold text-green-900">{match.careerDetails?.futureScope || "Evaluating..."}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Analysis Section (Based on Primary Match) */}
        <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <section className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-8 bg-blue-600 rounded-full mr-4 inline-block"></span>
                  Why This Career Matches You
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-600">
                  {matches[0].careerDetails?.explanation || "Based on your responses, you show high potential in this field. We are currently calibrating the specific reasons for this recommendation."}
                </p>
              </section>

              <section className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-8 bg-indigo-600 rounded-full mr-4 inline-block"></span>
                  Courses & Degree Path
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matches[0].careerDetails?.courses?.map((course, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold border border-indigo-100 italic">
                      {course}
                    </span>
                  )) || <span className="text-gray-400 text-sm italic">Recommended courses list pending.</span>}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-8 bg-teal-500 rounded-full mr-4 inline-block"></span>
                  Skill Matrix
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                    <h4 className="text-[10px] font-black text-teal-600 uppercase mb-3 tracking-widest">Hard Skills</h4>
                    <ul className="space-y-2">
                      {matches[0].careerDetails?.skills?.technical?.map((skill, i) => (
                        <li key={i} className="text-sm font-semibold text-teal-900 flex items-center">
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span> {skill}
                        </li>
                      )) || <li className="text-sm text-gray-400 italic text-center">Data coming soon</li>}
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                    <h4 className="text-[10px] font-black text-purple-600 uppercase mb-3 tracking-widest">Soft Skills</h4>
                    <ul className="space-y-2">
                      {matches[0].careerDetails?.skills?.soft?.map((skill, i) => (
                        <li key={i} className="text-sm font-semibold text-purple-900 flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span> {skill}
                        </li>
                      )) || <li className="text-sm text-gray-400 italic text-center">Data coming soon</li>}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <section className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-8 bg-orange-500 rounded-full mr-4 inline-block"></span>
                  5-Year Action Plan
                </h3>
                <div className="relative border-l-2 border-orange-200 ml-4 space-y-8">
                  {[1, 2, 3, 4, 5].map((year) => (
                    <div key={year} className="relative pl-10">
                      <div className="absolute -left-[11px] top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow-md"></div>
                      <h4 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-1">Year {year}</h4>
                      <p className="text-gray-600 font-medium">{matches[0].careerDetails?.actionPlan?.[`year${year}`] || "Planning phase in progress..."}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-8 bg-gray-400 rounded-full mr-4 inline-block"></span>
                  Alternate Backup Careers
                </h3>
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-6 rounded-3xl">
                  <ul className="space-y-3">
                    {matches[0].careerDetails?.backupCareers?.map((backup, i) => (
                      <li key={i} className="flex items-center justify-between text-gray-700 font-bold">
                        <span>{backup}</span>
                        <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-md uppercase">Secondary Match</span>
                      </li>
                    )) || <li className="text-sm text-gray-400 italic text-center">No backup options listed yet.</li>}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;