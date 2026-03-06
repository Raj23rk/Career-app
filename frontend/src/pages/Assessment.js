import API from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const res = await API.get("/questions");
    setQuestions(res.data);
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers, { questionId: questions[currentIdx]._id, answerValue: value }];
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers) => {
    const userId = localStorage.getItem("userId");
    await API.post("/assessment/submit", { userId, answers: finalAnswers });
    navigate("/result");
  };

  if (!questions.length) return <div className="flex items-center justify-center h-screen">Loading Assessment...</div>;

  const currentQuestion = questions[currentIdx];
  const progress = (currentIdx / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Question {currentIdx + 1} of {questions.length}</span>
            <span className="text-sm font-medium text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-4">
          {[
            { label: "Strongly Agree", value: 5, color: "bg-blue-600 hover:bg-blue-700" },
            { label: "Agree", value: 4, color: "bg-blue-500 hover:bg-blue-600" },
            { label: "Neutral", value: 3, color: "bg-gray-400 hover:bg-gray-500" },
            { label: "Disagree", value: 2, color: "bg-orange-500 hover:bg-orange-600" },
            { label: "Strongly Disagree", value: 1, color: "bg-red-600 hover:bg-red-700" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full py-4 px-6 text-left rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${option.color}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assessment;