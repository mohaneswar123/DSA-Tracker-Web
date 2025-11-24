import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import TopicPage from './pages/TopicPage.jsx'
import Saved from './pages/Saved.jsx'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav">
          <Link to="/" className="brand">DSA Tracker</Link>
          <nav className="nav-links">
            <Link to="/saved" className="nav-link">Saved</Link>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicSlug" element={<TopicPage />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </main>
      <footer className="app-footer">Keep going. One problem at a time.</footer>
    </div>
  )
}

export default App
