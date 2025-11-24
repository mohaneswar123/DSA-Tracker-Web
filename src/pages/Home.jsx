import { Link } from 'react-router-dom'
import questionsData from '../questions.js'
import './Home.css'

function toSlug(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function Home() {
  // Preserve the given order from questions.js
  const topics = questionsData.map(section => ({
    topicName: section.topicName,
  }))

  return (
    <div className="container home-page">
      <h1 className="page-title">Topics</h1>
      <ul className="topic-list">
        {topics.map((t) => (
          <li key={t.topicName} className="topic-item">
            <Link className="topic-link" to={`/topic/${toSlug(t.topicName)}`}>
              {t.topicName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
