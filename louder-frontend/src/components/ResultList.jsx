import VenueCard from "./VenueCard";

function ResultList({ results }) {
  if (!results || results.length === 0) {
    return <div className="no-results">No venues found. Start searching for your perfect event venue!</div>;
  }

  return (
    <div className="results-container">
      {results.map((result, index) => (
        <div key={index} className="search-group">
          <div className="search-divider">
            <span className="search-timestamp">
              {new Date(result.timestamp || Date.now()).toLocaleString()}
            </span>
          </div>
          <VenueCard 
            venue={result} 
            query={result.query} 
          />
        </div>
      ))}
    </div>
  )
}

export default ResultList;