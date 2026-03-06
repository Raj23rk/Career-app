require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/Question");
const Career = require("../models/Career");
const connectDB = require("../config/db");

const questions = [
  // Interest
  { questionText: "I enjoy writing code and solving technical puzzles.", category: "interest", careerCluster: "Technology", weight: 2 },
  { questionText: "I like analyzing financial data and market trends.", category: "interest", careerCluster: "Finance", weight: 2 },
  { questionText: "I am interested in scientific research and experiments.", category: "interest", careerCluster: "Science", weight: 2 },
  
  // Aptitude
  { questionText: "I can easily spot bugs in a logic flow.", category: "aptitude", careerCluster: "Technology", weight: 1.5 },
  { questionText: "I am comfortable with complex mathematical calculations.", category: "aptitude", careerCluster: "Finance", weight: 1.5 },
  { questionText: "I have strong logical reasoning skills.", category: "aptitude", careerCluster: "Science", weight: 1.5 },

  // Personality
  { questionText: "I prefer working independently on complex tasks.", category: "personality", careerCluster: "Technology", weight: 1 },
  { questionText: "I am detail-oriented and precise.", category: "personality", careerCluster: "Finance", weight: 1 },
  { questionText: "I am curious and observant.", category: "personality", careerCluster: "Science", weight: 1 },

  // Values, Academic, Future Scope... (Adding more to satisfy logic)
  { questionText: "Innovation and creating something new is important to me.", category: "values", careerCluster: "Technology", weight: 1 },
  { questionText: "Stability and growth are my top priorities.", category: "values", careerCluster: "Finance", weight: 1 },
  { questionText: "I excelled in Science and Math in school.", category: "academic_strength", careerCluster: "Technology", weight: 2 },
  { questionText: "I want a career with high global demand in 2030.", category: "future_scope", careerCluster: "Technology", weight: 1 }
];

const careers = [
  {
    careerCluster: "Technology",
    careerRole: "Software Engineer",
    description: "Design, develop, and maintain software systems.",
    explanation: "Your high score in logic, math, and interest in coding makes you an ideal fit for software engineering. You value innovation and possess the independent personality required for deep technical work.",
    subjectStream: "Science (PCM)",
    courses: ["B.Tech Computer Science", "BCA", "Full Stack Development Certification"],
    actionPlan: {
      year1: "Learn Data Structures & Algorithms and mastered one language (JS/Python).",
      year2: "Build a portfolio of projects and contribute to Open Source.",
      year3: "Intern at a tech company and learn cloud technologies.",
      year4: "Specialize in AI/ML or Web Architecture.",
      year5: "Land a Senior Developer role or start a technical venture."
    },
    skills: {
      technical: ["JavaScript", "React", "Node.js", "System Design"],
      soft: ["Problem Solving", "Continuous Learning", "Teamwork"]
    },
    futureScope: "Excellent - Anticipated 22% growth in demand over the next decade.",
    backupCareers: ["Data Analyst", "Cybersecurity Specialist"]
  },
  {
    careerCluster: "Finance",
    careerRole: "Investment Banker",
    description: "Help companies raise capital and provide financial advice.",
    explanation: "Your precision, mathematical aptitude, and interest in markets align perfectly with a career in Finance.",
    subjectStream: "Commerce",
    courses: ["B.Com", "MBA Finance", "CFA"],
    actionPlan: {
      year1: "Focus on Accounting and Microeconomics.",
      year2: "Prepare for CFA Level 1.",
      year3: "Intern at a bank or financial firm.",
      year4: "Master Financial Modeling.",
      year5: "Junior Associate at a Major Bank."
    },
    skills: {
      technical: ["Financial Modeling", "Excel VBA", "Market Analysis"],
      soft: ["Attention to Detail", "Negotiation", "Work Ethic"]
    },
    futureScope: "Strong - Steady demand in global financial hubs.",
    backupCareers: ["Financial Planner", "Accountant"]
  },
  {
    careerCluster: "Science",
    careerRole: "Research Scientist",
    description: "Conduct experiments and analyze data to advance scientific knowledge.",
    explanation: "Your strong interest in research, logical reasoning, and observant personality makes you an excellent fit for a career in Science. You excel in curiosity and academic strength in PCM.",
    subjectStream: "Science (PCM/PCB)",
    courses: ["B.Sc in Physics/Chemistry/Biology", "Integrated M.Sc", "Ph.D. in Research"],
    actionPlan: {
      year1: "Focus on core scientific principles and laboratory skills.",
      year2: "Engage in undergraduate research projects and internships.",
      year3: "Prepare for entrance exams for higher studies (JEST/GATE).",
      year4: "Start a Master's program in a specialized field.",
      year5: "Co-author a research paper and apply for Ph.D. positions."
    },
    skills: {
      technical: ["Laboratory Techniques", "Data Analysis", "Scientific Writing"],
      soft: ["Critical Thinking", "Patience", "Attention to Detail"]
    },
    futureScope: "Steady - Continuous need for innovation in healthcare and technology.",
    backupCareers: ["Laboratory Manager", "Science Communicator"]
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Question.deleteMany();
    await Career.deleteMany();
    await Question.insertMany(questions);
    await Career.insertMany(careers);
    console.log("Database Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
