import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api/auth"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    setLoading(true)
    setError("")
    try {
      await registerUser({ name, email, password })
      navigate("/login")
    } catch (err: any) {
      setError("Registration failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2">Create account</h1>
        <p className="text-gray-500 text-sm mb-6">Join HireNova for free</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input className="w-full border rounded-lg px-4 py-2 mb-3 text-sm" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-2 mb-3 text-sm" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-lg px-4 py-2 mb-4 text-sm" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister} disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50">
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <a href="/login" className="text-indigo-600">Sign in</a></p>
      </div>
    </div>
  )
}
