import { Link } from 'react-router-dom'
import questionsData from '../questions.js'
import useLocalProgress from '../state/useLocalProgress.js'
import { useMemo } from 'react'
import './Saved.css'

export default function Saved() {
  const { isSaved, toggleSaved, isDone, toggleDone } = useLocalProgress()

  const items = useMemo(() => {
    const list = []
    questionsData.forEach(section => {
      section.questions.forEach((q, idx) => {
        const key = `${section.topicName}::${idx}::${q.Problem}`
        const saved = isSaved(key)
        if (saved) {
          list.push({ key, topic: q.Topic, name: q.Problem, url1: q.URL, url2: q.URL2 })
        }
      })
    })
    return list
  }, [isSaved])

  return (
    <div className="container saved-page">
      <div className="topic-header">
        <h1 className="page-title">Saved Questions</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/" className="btn">All Topics</Link>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="muted">No saved questions yet.</p>
      ) : (
        <ul className="problem-list">
          {items.map(({ key, topic, name, url1, url2 }) => {
            const checked = isDone(key)
            return (
              <li key={key} className={`problem-item ${checked ? 'done' : ''}`}>
                <label className="problem-check">
                  <input type="checkbox" checked={checked} onChange={() => toggleDone(key)} />
                </label>
                <div className="problem-content">
                  <div className="problem-top">
                    <span className="problem-topic">{topic}</span>
                    <span className="problem-name">{name}</span>
                    {isSaved(key) && <span className="badge badge-saved">Saved</span>}
                  </div>
                  <div className="problem-links">
                    {url1 ? <a href={url1} target="_blank" rel="noreferrer" className="link">URL1</a> : null}
                    {url2 ? <a href={url2} target="_blank" rel="noreferrer" className="link">URL2</a> : null}
                    <button
                      className="btn btn-small"
                      onClick={() => {
                        if (window.confirm('Unsave this important question?')) {
                          toggleSaved(key)
                        }
                      }}
                    >
                      Unsave
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
