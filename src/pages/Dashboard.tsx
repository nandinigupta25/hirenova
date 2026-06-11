import { useNavigate } from "react-router-dom"

const stats = [
  { label: "Interviews Taken", value: "12" },
  { label: "Avg Score", value: "74%" },
  { label: "Topics Practiced", value: "8" },
  { label: "Readiness Index", value: "68%" },
]

const recentInterviews = [
  { role: "Software Engineer", company: "Google", score: 82, date: "Jun 9", difficulty: "Advanced" },
  { role: "Frontend Developer", company: "Microsoft", score: 74, date: "Jun 7", difficulty: "Intermediate" },
  { role: "Full Stack Developer", company: "Amazon", score: 68, date: "Jun 5", difficulty: "Advanced" },
]

const topics = [
  { name: "DSA", score: 72 },
  { name: "System Design", score: 58 },
  { name: "HR", score: 90 },
  { name: "OOP", score: 80 },
  { name: "DBMS", score: 64 },
  { name: "OS", score: 55 },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-semibold text-gray-800">HireNova</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Welcome back!</span>
          <button
  onClick={() => navigate("/resume")}
  className="text-sm text-indigo-600 hover:text-indigo-700"
>
  Resume Analysis
</button>
<button
  onClick={() => { localStorage.removeItem("token"); navigate("/login") }}
  className="text-sm text-red-500 hover:text-red-600"
>
  Logout
</button>
<button
  onClick={() => navigate("/profile")}
  className="text-sm text-indigo-600 hover:text-indigo-700"
>
  Profile
</button>
<button
  onClick={() => navigate("/coding")}
  className="text-sm text-indigo-600 hover:text-indigo-700"
>
  Coding Round
</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Track your interview preparation progress</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border p-4">
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Start New Interview</h2>
            <div className="space-y-3">
              <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700">
                <option>Select Role</option>
                <option>Software Engineer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Analyst</option>
              </select>
              <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700">
                <option>Select Company</option>
                <option>Google</option>
                <option>Amazon</option>
                <option>Microsoft</option>
                <option>Adobe</option>
                <option>Flipkart</option>
                <option>Infosys</option>
                <option>TCS</option>
              </select>
              <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700">
                <option>Select Difficulty</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <button
  onClick={() => navigate("/interview")}
  className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium"
>
  Start Interview
</button>

            </div>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Topic Scores</h2>
            <div className="space-y-3">
              {topics.map((topic) => (
                <div key={topic.name}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{topic.name}</span>
                    <span>{topic.score}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: topic.score + "%" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Interviews</h2>
          <div className="space-y-3">
            {recentInterviews.map((interview, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{interview.role}</p>
                  <p className="text-xs text-gray-500">{interview.company} · {interview.difficulty} · {interview.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-indigo-600">{interview.score}%</span>
                  <button className="text-xs text-gray-500 border rounded-lg px-3 py-1 hover:bg-gray-100">
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

