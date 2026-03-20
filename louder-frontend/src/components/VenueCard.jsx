function VenueCard({ venue, query }) {
  return (
    <div className="venue-card">
      <div className="venue-header">
        <div className="venue-info">
          <h3 className="venue-name">{venue.name}</h3>
          <p className="venue-location">
            📍 {venue.location}
          </p>
        </div>
        <div className="venue-cost">
          <span className="cost-badge">{venue.cost}</span>
        </div>
      </div>
      <p className="venue-why">{venue.why}</p>
      {query && (
        <div className="search-query">
          <span className="query-label">Search:</span> "{query}"
        </div>
      )}
    </div>
  )
}
export default VenueCard;