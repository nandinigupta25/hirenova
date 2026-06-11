import { useState } from "react"
import { useNavigate } from "react-router-dom"

const mockSkills = ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "REST APIs", "Git", "Docker"]
const mockMissing = ["Kubernetes", "AWS", "Redis", "System Design", "Microservices"]
const mockSuggestions = [
  "Add more quantifiable achievements to your experience section",
  "Include a summary/objective at the top of your resume",
  "Add links to your GitHub and LinkedIn profiles",
  "Mention specific project outcomes and impact",
]

export default function Resume() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [score, setScore] = useState(0)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (f: File) => {
    if (f.type === "application/pdf") {
      setFile(f)
      setAnalyzed(false)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const analyzeResume = async () => {
    if (!file) return
    setUploading(true)
    await new Promise((r) => setTimeout(r, 2500))
    setScore(72)
    setAnalyzed(true)
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-semibold text-gray-800">HireNova</span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="text-sm text-gray-500">Resume Intelligence</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Resume Intelligence</h1>
          <p className="text-gray-500 text-sm mt-1">Upload your resume and get AI-powered analysis</p>
        </div>

        {!analyzed ? (
          <div className="bg-white rounded-2xl border p-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragOver ? "border-indigo-400 bg-indigo-50" : "border-gray-200"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-gray-700 font-medium mb-1">Drop your resume here</p>
              <p className="text-gray-400 text-sm mb-4">Supports PDF format only</p>
              <label className="cursor-pointer bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
                Browse File
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                />
              </label>
            </div>

            {file && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={analyzeResume}
                  disabled={uploading}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {uploading ? "Analyzing..." : "Analyze Resume"}
                </button>
              </div>
            )}

            {uploading && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                <p className="text-sm text-indigo-600 font-medium mb-2">AI is analyzing your resume...</p>
                <div className="w-full bg-indigo-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-indigo-500">✓ Extracting text content</p>
                  <p className="text-xs text-indigo-500">✓ Identifying skills</p>
                  <p className="text-xs text-indigo-400">⏳ Scoring resume...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#6366f1" strokeWidth="3"
                      strokeDasharray={`${score} ${100 - score}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">{score}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">Resume Score</p>
                <p className="text-xs text-gray-400 mt-1">Out of 100</p>
              </div>

              <div className="bg-white rounded-2xl border p-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Skills Found</p>
                <div className="flex flex-wrap gap-2">
                  {mockSkills.map((skill) => (
                    <span key={skill} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Missing Skills</p>
                <div className="flex flex-wrap gap-2">
                  {mockMissing.map((skill) => (
                    <span key={skill} className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <p className="text-sm font-semibold text-gray-700 mb-4">Improvement Suggestions</p>
              <div className="space-y-3">
                {mockSuggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                    <span className="text-yellow-500 mt-0.5">💡</span>
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setFile(null); setAnalyzed(false) }}
                className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium"
              >
                Upload New Resume
              </button>
              <button
                onClick={() => navigate("/interview")}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                Start Interview Based on Resume →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}