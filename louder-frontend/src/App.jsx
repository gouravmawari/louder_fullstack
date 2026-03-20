import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ResultList from './components/ResultList'
import './App.css'

function getUserId() {
  let userId = localStorage.getItem('userId')
  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem('userId', userId)
  }
  return userId
}

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userId = getUserId()
    fetch('http://localhost:3000/event/history', {
      headers: { 'x-user-id': userId }
    })
      .then(res => res.json())
      .then(data => {
        const formattedHistory = data.map(item => ({
          ...item,
          query: item.query || 'Previous search',
          timestamp: item.timestamp || Date.now()
        }))
        setResults(formattedHistory)
      })
  }, [])

  async function handleSearch() {
    if (loading) return 
    setLoading(true)
    const userId = getUserId()

    try {
      const res = await fetch('http://localhost:3000/event/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify({ query })
      })

      const data = await res.json()
      const newResult = {
        ...data,
        query: query,
        timestamp: Date.now()
      }
      setResults(prev => [newResult, ...prev])  
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>AI Event Concierge</h1>
      </div>
      <div className="search-container">
        <SearchBar 
          query={query} 
          setQuery={setQuery} 
          onSearch={handleSearch} 
          isDisabled={loading}
        />
      </div>
      {loading && (
        <div className="loading-message">
          <span className="loading-spinner"></span>
          AI is planning...
        </div>
      )}
      <ResultList results={results} />
    </div>
  )
}

export default App