import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const isAuthed = Boolean(localStorage.getItem('token'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">Rahi Enterprise</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link className="text-gray-700 hover:text-blue-700" to="/">Home</Link>
          {!isAuthed && <Link className="text-gray-700 hover:text-blue-700" to="/admin">Admin Login</Link>}
          <Link className="text-gray-700 hover:text-blue-700" to="/dashboard">Admin Panel</Link>
          {isAuthed && (
            <button onClick={logout} className="ml-2 rounded bg-blue-600 text-white px-3 py-1.5 hover:bg-blue-700">Logout</button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
