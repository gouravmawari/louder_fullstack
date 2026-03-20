function SearchBar({ query, setQuery, onSearch, isDisabled }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isDisabled) {
      onSearch()
    }
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Describe your event..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
        disabled={isDisabled}
      />
      <button 
        onClick={onSearch} 
        className={`search-button ${isDisabled ? 'disabled' : ''}`}
        disabled={isDisabled}
      >
        {isDisabled ? (
          <span className="button-content">
            <span className="loading-spinner"></span>
            Searching...
          </span>
        ) : (
          'Search'
        )}
      </button>
    </div>
  )
}

export default SearchBar