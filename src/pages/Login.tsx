import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await loginUser({ email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err: any) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to HireNova</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input className="w-full border rounded-lg px-4 py-2 mb-3 text-sm" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-2 mb-4 text-sm" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50">
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">No account? <a href="/register" className="text-indigo-600">Register</a></p>
      </div>
    </div>
  )
}
