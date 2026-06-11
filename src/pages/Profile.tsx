import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState("Nandini Gupta")
  const [bio, setBio] = useState("Final year CSE student | Aspiring Software Engineer | Java & React enthusiast")
  const [email] = useState("guptanandini2004@gmail.com")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMsg, setPasswordMsg] = useState("")

  const interviewHistory = [
    { role: "Software Engineer", company: "Google", score: 82, date: "Jun 9, 2026", difficulty: "Advanced" },
    { role: "Frontend Developer", company: "Microsoft", score: 74, date: "Jun 7, 2026", difficulty: "Intermediate" },
    { role: "Full Stack Developer", company: "Amazon", score: 68, date: "Jun 5, 2026", difficulty: "Advanced" },
    { role: "Backend Developer", company: "Flipkart", score: 79, date: "Jun 3, 2026", difficulty: "Intermediate" },
    { role: "Software Engineer", company: "Adobe", score: 85, date: "Jun 1, 2026", difficulty: "Advanced" },
  ]

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatar(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMsg("Please fill all fields")
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg("New passwords do not match")
      return
    }
    if (newPassword.length < 6) {
      setPasswordMsg("Password must be at least 6 characters")
      return
    }
    setPasswordMsg("Password changed successfully!")
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setPasswordMsg(""), 3000)
  }

  const avgScore = Math.round(
    interviewHistory.reduce((a, b) => a + b.score, 0) / interviewHistory.length
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="font-semibold text-gray-800">HireNova</span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="text-sm text-gray-500">Profile</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-6 bg-white rounded-2xl border p-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-indigo-600">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs">+</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{email}</p>
            <p className="text-sm text-gray-500 mt-1">{bio}</p>
          </div>
          <div className="ml-auto flex gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-600">{interviewHistory.length}</p>
              <p className="text-xs text-gray-500">Interviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{avgScore}%</p>
              <p className="text-xs text-gray-500">Avg Score</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {["profile", "history", "password"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={"px-4 py-2 rounded-lg text-sm font-medium capitalize " +
                (activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white border text-gray-600 hover:bg-gray-50")}
            >
              {tab === "profile" ? "Edit Profile" : tab === "history" ? "Interview History" : "Change Password"}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 text-sm text-gray-400 bg-gray-50"
                  value={email}
                  disabled
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Bio</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Interview History</h2>
            <div className="space-y-3">
              {interviewHistory.map((interview, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{interview.role}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {interview.company} · {interview.difficulty} · {interview.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={"text-sm font-bold " + (interview.score >= 80 ? "text-green-600" : interview.score >= 70 ? "text-yellow-600" : "text-red-500")}>
                      {interview.score}%
                    </div>
                    <div className={"text-xs px-2 py-1 rounded-full " + (interview.score >= 80 ? "bg-green-100 text-green-700" : interview.score >= 70 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600")}>
                      {interview.score >= 80 ? "Excellent" : interview.score >= 70 ? "Good" : "Needs Work"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Change Password</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Current Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">New Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              {passwordMsg && (
                <p className={"text-sm font-medium " + (passwordMsg.includes("success") ? "text-green-600" : "text-red-500")}>
                  {passwordMsg}
                </p>
              )}
              <button
                onClick={handlePasswordChange}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}