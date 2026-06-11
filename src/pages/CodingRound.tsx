import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Editor from "@monaco-editor/react"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    starterCode: {
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}",
      python: "class Solution:\n    def twoSum(self, nums, target):\n        # Write your solution here\n        pass",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};",
    },
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    starterCode: {
      java: "class Solution {\n    public void reverseString(char[] s) {\n        // Write your solution here\n        \n    }\n}",
      python: "class Solution:\n    def reverseString(self, s):\n        # Write your solution here\n        pass",
      cpp: "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your solution here\n        \n    }\n};",
    },
  },
]

const difficultyColors: Record<string, string> = {
  Easy: "text-green-600 bg-green-100",
  Medium: "text-yellow-600 bg-yellow-100",
  Hard: "text-red-600 bg-red-100",
}

export default function CodingRound() {
  const navigate = useNavigate()
  const [currentProblem, setCurrentProblem] = useState(0)
  const [language, setLanguage] = useState("java")
  const [code, setCode] = useState(problems[0].starterCode.java)
  const [output, setOutput] = useState("")
  const [running, setRunning] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [testResults, setTestResults] = useState<boolean[]>([])

  const problem = problems[currentProblem]

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    setCode(problem.starterCode[lang as "java" | "python" | "cpp"])
    setOutput("")
    setTestResults([])
  }

  const handleProblemChange = (index: number) => {
    setCurrentProblem(index)
    setCode(problems[index].starterCode[language as "java" | "python" | "cpp"])
    setOutput("")
    setTestResults([])
    setSubmitted(false)
  }

  const runCode = async () => {
    setRunning(true)
    setOutput("")
    await new Promise((r) => setTimeout(r, 1500))
    setOutput("Running test cases...\nTest case 1 passed\nTest case 2 passed\n\nAll visible test cases passed!")
    setRunning(false)
  }

  const submitCode = async () => {
    setRunning(true)
    await new Promise((r) => setTimeout(r, 2000))
    const results = [true, true, false, true, false]
    setTestResults(results)
    const passed = results.filter(Boolean).length
    setOutput("Submission Results:\n" + passed + "/" + results.length + " test cases passed\nRuntime: 2ms\nMemory: 42.3 MB")
    setSubmitted(true)
    setRunning(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-semibold">HireNova</span>
          <span className="text-gray-500 mx-2">|</span>
          <span className="text-sm text-gray-400">Coding Round</span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg border border-gray-600"
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-400 hover:text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 52px)" }}>
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Problems</p>
            {problems.map((p, i) => (
              <button
                key={p.id}
                onClick={() => handleProblemChange(i)}
                className={"w-full text-left p-2 rounded-lg text-sm mb-1 " + (currentProblem === i ? "bg-indigo-600" : "hover:bg-gray-700")}
              >
                <span className="font-medium">{p.title}</span>
                <span className={"ml-2 text-xs px-1.5 py-0.5 rounded " + difficultyColors[p.difficulty]}>
                  {p.difficulty}
                </span>
              </button>
            ))}
          </div>
          <div className="p-4">
            <h2 className="font-semibold mb-2">{problem.title}</h2>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{problem.description}</p>
            <p className="text-xs text-gray-400 font-medium mb-2">Examples:</p>
            {problem.examples.map((ex, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-3 mb-2 text-xs">
                <p className="text-gray-400">Input: <span className="text-white">{ex.input}</span></p>
                <p className="text-gray-400">Output: <span className="text-white">{ex.output}</span></p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(val) => setCode(val || "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
              }}
            />
          </div>
          <div className="bg-gray-800 border-t border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <p className="text-sm text-gray-400">Output</p>
              <div className="flex gap-2">
                <button
                  onClick={runCode}
                  disabled={running}
                  className="bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-600"
                >
                  {running ? "Running..." : "Run"}
                </button>
                <button
                  onClick={submitCode}
                  disabled={running}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-indigo-700"
                >
                  {running ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
            <div className="p-4 h-32 overflow-y-auto">
              {output ? (
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{output}</pre>
              ) : (
                <p className="text-sm text-gray-500">Click Run to test your code</p>
              )}
              {submitted && testResults.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {testResults.map((passed, i) => (
                    <div
                      key={i}
                      className={"w-6 h-6 rounded text-xs flex items-center justify-center font-medium " + (passed ? "bg-green-600" : "bg-red-600")}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}