import { useState } from "react"
import { useNavigate } from "react-router-dom"

const questions = [
  {
    id: 1,
    category: "Technical",
    question: "Explain the difference between Stack and Queue. Where would you use each?",
  },
  {
    id: 2,
    category: "DSA",
    question: "How would you find the middle element of a linked list in one pass?",
  },
  {
    id: 3,
    category: "System Design",
    question: "Design a URL shortening service like Bit.ly. Walk me through your approach.",
  },
  {
    id: 4,
    category: "HR",
    question: "Tell me about a time you faced a difficult challenge in a project and how you overcame it.",
  },
  {
    id: 5,
    category: "OOP",
    question: "Explain SOLID principles with real world examples.",
  },
]

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-100 text-blue-700",
  DSA: "bg-purple-100 text-purple-700",
  "System Design": "bg-orange-100 text-orange-700",
  HR: "bg-green-100 text-green-700",
  OOP: "bg-pink-100 text-pink-700",
}

export default function InterviewRoom() {
  const navigate = useNavigate()
  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [finished, setFinished] = useState(false)
  const [scores, setScores] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(120)

  const question = questions[currentQ]

  const getFeedback = async () => {
    if (!answer.trim()) return
    setLoading(true)
    setShowFeedback(false)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      const mockFeedback = [
        "Good answer! You covered the key points well. Consider adding more real-world examples to strengthen your response.",
        "Solid understanding shown. Your explanation was clear but could go deeper on time complexity analysis.",
        "Great structural approach. Try to be more specific about database schema and scaling strategies.",
        "Well communicated! Use the STAR method more explicitly to structure your behavioral answers.",
        "Good grasp of OOP concepts. Adding code snippets or diagrams would make this even stronger.",
      ]
      const mockScore = Math.floor(Math.random() * 30) + 65
      setFeedback(mockFeedback[currentQ])
      setScores((prev) => [...prev, mockScore])
      setShowFeedback(true)
    } finally {
      setLoading(false)
    }
  }

  const nextQuestion = () => {
    setAnswers((prev) => [...prev, answer])
    setAnswer("")
    setShowFeedback(false)
    setFeedback("")
    if (currentQ + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentQ((prev) => prev + 1)
      setTimeLeft(120)
    }
  }

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Interview Complete!</h1>
          <p className="text-gray-500 text-sm mb-6">Here is your performance summary</p>
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-4xl font-bold text-indigo-600">{avgScore}%</p>
            <p className="text-sm text-indigo-500 mt-1">Overall Score</p>
          </div>
          <div className="space-y-2 mb-6">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{q.category}</span>
                <span className="text-sm font-semibold text-indigo-600">{scores[i] || 0}%</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
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
          <span className="text-sm text-gray-500">Interview Room</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQ + 1} of {questions.length}
          </span>
          <div className="bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full">
            ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all"
              style={{ width: ((currentQ + 1) / questions.length) * 100 + "%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">AI</span>
            </div>
            <span className="text-sm font-medium text-gray-700">HireNova Interviewer</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[question.category]}`}>
              {question.category}
            </span>
          </div>
          <p className="text-gray-800 text-base leading-relaxed">{question.question}</p>
        </div>

        <div className="bg-white rounded-2xl border p-6 mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Your Answer</label>
          <textarea
            className="w-full border rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
            rows={6}
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={getFeedback}
              disabled={loading || !answer.trim()}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Evaluating..." : "Get AI Feedback"}
            </button>
            {showFeedback && (
              <button
                onClick={nextQuestion}
                className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                {currentQ + 1 >= questions.length ? "Finish Interview" : "Next Question →"}
              </button>
            )}
          </div>
        </div>

        {showFeedback && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 font-medium text-sm">AI Feedback</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Score: {scores[scores.length - 1]}%
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}