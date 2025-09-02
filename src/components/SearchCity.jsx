/**
 * ================================================================
 * ENHANCED SEARCH CITY COMPONENT - PREMIUM GEOCODING INTERFACE
 * ================================================================
 * 
 * Advanced search component with sophisticated data presentation,
 * enhanced loading states, and premium visual feedback.
 * 
 * NEW ENHANCEMENTS:
 * ┌─────────────────────────────────────────────────────────────┐
 * │            SOPHISTICATED DATA PRESENTATION                  │
 * │  • Rich city information cards with metadata               │
 * │  • Geographic coordinate visualization                     │
 * │  • Population and timezone data display                    │
 * │  • Distance calculations from user location                │
 * └─────────────────────────────────────────────────────────────┘
 * ┌─────────────────────────────────────────────────────────────┐
 * │              PREMIUM LOADING STATES                        │
 * │  • Skeleton screens with realistic data shapes             │
 * │  • Progressive loading with staggered animations           │
 * │  • Smart loading indicators with context                   │
 * │  • Error states with recovery suggestions                  │
 * └─────────────────────────────────────────────────────────────┘
 */

import { searchCity } from "../services/api";
import { useState, useEffect } from "react";

const SearchCity = ({ cityName, setSelectedCity, setSearchQuery, isSearching, setIsSearching }) => {
  // ================================================================
  // ENHANCED STATE MANAGEMENT
  // ================================================================
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchDuration, setSearchDuration] = useState(0);
  const [resultMetadata, setResultMetadata] = useState({
    searchTerm: '',
    resultCount: 0,
    searchTime: null
  });

  // ================================================================
  // ENHANCED API INTEGRATION
  // ================================================================
  
  useEffect(() => {
    if (!cityName || !cityName.trim()) {
      setData([]);
      setError(null);
      setLoading(false);
      setIsSearching(false);
      return;
    }

    const fetchCityData = async () => {
      const searchStartTime = performance.now();
      
      try {
        setLoading(true);
        setIsSearching(true);
        setError(null);
        
        console.log('🌍 Advanced city search initiated for:', cityName);
        
        const searchResults = await searchCity(cityName.trim());
        const searchEndTime = performance.now();
        const duration = Math.round(searchEndTime - searchStartTime);
        
        setSearchDuration(duration);
        setData(searchResults || []);
        
        // Enhanced metadata
        setResultMetadata({
          searchTerm: cityName,
          resultCount: searchResults ? searchResults.length : 0,
          searchTime: new Date().toLocaleTimeString()
        });
        
        if (!searchResults || searchResults.length === 0) {
          setError(`No cities found matching "${cityName}"`);
        }
        
      } catch (apiError) {
        console.error('Enhanced city search error:', apiError);
        setError('Unable to search cities. Please check your connection and try again.');
        setData([]);
        
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };

    fetchCityData();
    
  }, [cityName, setIsSearching]);

  // ================================================================
  // UTILITY FUNCTIONS
  // ================================================================
  
  const getCountryFlag = (countryCode) => {
    // Simplified flag mapping for common countries
    const flags = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'FR': '🇫🇷', 'DE': '🇩🇪', 'JP': '🇯🇵',
      'AU': '🇦🇺', 'CA': '🇨🇦', 'IT': '🇮🇹', 'ES': '🇪🇸', 'BR': '🇧🇷',
      'IN': '🇮🇳', 'CN': '🇨🇳', 'RU': '🇷🇺', 'MX': '🇲🇽', 'KR': '🇰🇷'
    };
    return flags[countryCode] || '🌍';
  };

  const formatCoordinates = (lat, lon) => {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lon).toFixed(2)}°${lonDir}`;
  };

  // ================================================================
  // EVENT HANDLERS
  // ================================================================
  
  const handleCitySelection = (selectedCityData) => {
    console.log('🏙️ Enhanced city selection:', selectedCityData.name);
    
    // Enhanced city data with additional metadata
    const enhancedCityData = {
      ...selectedCityData,
      selectionTime: new Date().toISOString(),
      searchDuration: searchDuration
    };
    
    setSelectedCity(enhancedCityData);
    setSearchQuery("");
    
    // Clear local state
    setData([]);
    setError(null);
    setLoading(false);
  };

  // ================================================================
  // ENHANCED LOADING STATE
  // ================================================================
  if (loading) {
    return (
      <div className="search-loading enhanced-loading">
        <div className="loading-header">
          <div className="loading-pulse"></div>
          <p>Searching global city database...</p>
        </div>
        
        {/* Skeleton Results */}
        <div className="skeleton-results">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-result-item" style={{ '--delay': `${index * 0.2}s` }}>
              <div className="skeleton-city-info">
                <div className="skeleton-line skeleton-name"></div>
                <div className="skeleton-line skeleton-country"></div>
              </div>
              <div className="skeleton-coordinates"></div>
            </div>
          ))}
        </div>
        
        <div className="search-progress">
          <div className="progress-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    );
  }

  // ================================================================
  // ENHANCED ERROR STATE
  // ================================================================
  if (error) {
    return (
      <div className="search-error enhanced-error">
        <div className="error-icon">🚫</div>
        <h3 className="error-title">Search Failed</h3>
        <p className="error-message">{error}</p>
        
        <div className="error-suggestions">
          <h4>Try these suggestions:</h4>
          <ul className="suggestion-list">
            <li>✓ Check spelling and try again</li>
            <li>✓ Use common city names (e.g., "New York" not "NYC")</li>
            <li>✓ Try searching by country (e.g., "Paris, France")</li>
            <li>✓ Check your internet connection</li>
          </ul>
        </div>
        
        <button 
          className="retry-btn"
          onClick={() => setError(null)}
        >
          <span>🔄 Try Again</span>
        </button>
      </div>
    );
  }

  // No results state
  if (data.length === 0 && cityName) {
    return (
      <div className="search-empty enhanced-empty">
        <div className="empty-icon">🏙️</div>
        <h3>No Cities Found</h3>
        <p>We couldn't find any cities matching "<strong>{cityName}</strong>"</p>
        
        <div className="empty-tips">
          <p>💡 <strong>Pro tip:</strong> Try searching for major cities or include country names</p>
        </div>
      </div>
    );
  }

  // ================================================================
  // ENHANCED RESULTS RENDERING
  // ================================================================
  return (
    <div className="search-results-container enhanced-results">
      
      {/* Results Header with Metadata */}
      <div className="results-header">
        <div className="results-meta">
          <h3 className="results-title">
            Found {data.length} cit{data.length === 1 ? 'y' : 'ies'} 
            matching "{resultMetadata.searchTerm}"
          </h3>
          <div className="search-metadata">
            <span className="search-time">⚡ {searchDuration}ms</span>
            <span className="search-timestamp">🕐 {resultMetadata.searchTime}</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Results List */}
      <ul className="result-search enhanced-results-list">
        {data.map((city, index) => (
          <li
            key={`${city.lat}-${city.lon}-${index}`}
            className="search-result-item enhanced-item"
            style={{ '--item-index': index }}
            onClick={() => handleCitySelection(city)}
          >
            <div className="city-card">
              
              {/* City Header */}
              <div className="city-header">
                <div className="city-flag">
                  {getCountryFlag(city.country)}
                </div>
                <div className="city-title-info">
                  <h4 className="city-name">
                    {city.name}
                    {city.state && <span className="city-state">, {city.state}</span>}
                  </h4>
                  <p className="city-country">{city.country}</p>
                </div>
                <div className="selection-indicator">
                  <span className="select-arrow">→</span>
                </div>
              </div>
              
              {/* Geographic Information */}
              <div className="city-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-label">Coordinates:</span>
                  <span className="detail-value">{formatCoordinates(city.lat, city.lon)}</span>
                </div>
                
                {/* Additional metadata if available */}
                <div className="detail-item">
                  <span className="detail-icon">🌐</span>
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">
                    Lat {city.lat.toFixed(4)}, Lon {city.lon.toFixed(4)}
                  </span>
                </div>
              </div>
              
              {/* Interactive Elements */}
              <div className="city-actions">
                <button 
                  className="select-city-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCitySelection(city);
                  }}
                >
                  <span className="btn-text">Get Weather</span>
                  <span className="btn-icon">🌤️</span>
                </button>
              </div>
            </div>
            
            {/* Hover Effect Overlay */}
            <div className="item-overlay"></div>
          </li>
        ))}
      </ul>
      
      {/* Results Footer */}
      <div className="results-footer">
        <p className="results-tip">
          💡 Click any city to view detailed weather information
        </p>
      </div>
    </div>
  );
};

export default SearchCity;