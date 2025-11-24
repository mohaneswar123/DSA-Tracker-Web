import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import questionsData from '../questions.js'
import useLocalProgress from '../state/useLocalProgress.js'
import './TopicPage.css'

function toSlug(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function TopicPage() {
  const { topicSlug } = useParams()

  const section = useMemo(() => {
    return questionsData.find(s => toSlug(s.topicName) === topicSlug)
  }, [topicSlug])

  const { isDone, toggleDone, isSaved, toggleSaved } = useLocalProgress()

  if (!section) {
    return (
      <div className="container">
        <h1 className="page-title">Topic Not Found</h1>
        <Link to="/" className="btn">Back to Topics</Link>
      </div>
    )
  }

  return (
    <div className="container topic-page">
      <div className="topic-header">
        <h1 className="page-title">{section.topicName}</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/saved" className="btn">Saved</Link>
          <Link to="/" className="btn">All Topics</Link>
        </div>
      </div>

      <ul className="problem-list">
        {section.questions.map((q, idx) => {
          const key = `${section.topicName}::${idx}::${q.Problem}`
          const checked = isDone(key)
          const saved = isSaved(key)
          // Display only the required fields
          const topic = q.Topic
          const name = q.Problem
          const url1 = q.URL
          const url2 = q.URL2
          return (
            <li key={key} className={`problem-item ${checked ? 'done' : ''}`}>
              <label className="problem-check">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDone(key)}
                />
              </label>
              <div className="problem-content">
                <div className="problem-top">
                  <span className="problem-topic">{topic}</span>
                  <span className="problem-name">{name}</span>
                  {saved && <span className="badge badge-saved">Saved</span>}
                </div>
                <div className="problem-links">
                  {url1 ? (
                    <a href={url1} target="_blank" rel="noreferrer" className="link">URL1</a>
                  ) : null}
                  {url2 ? (
                    <a href={url2} target="_blank" rel="noreferrer" className="link">URL2</a>
                  ) : null}
                  <button
                    className="btn btn-small"
                    onClick={() => {
                      const msg = saved ? 'Unsave this question?' : 'Mark this question as important (Save)?'
                      if (window.confirm(msg)) {
                        toggleSaved(key)
                      }
                    }}
                  >
                    {saved ? 'Unsave' : 'Save'}
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
