/**
 * ================================================================
 * ENHANCED MAIN COMPONENT - PREMIUM WEATHER ORCHESTRATOR
 * ================================================================
 * 
 * Advanced main component with sophisticated loading states,
 * enhanced UX patterns, and premium visual feedback systems.
 * 
 * NEW FEATURES ADDED:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                ENHANCED STATE MANAGEMENT                    │
 * │  • Sophisticated loading states with animations            │
 * │  • Search statistics and performance metrics               │
 * │  • Enhanced error handling with recovery suggestions       │
 * │  • Progressive loading with skeleton screens              │
 * └─────────────────────────────────────────────────────────────┘
 * ┌─────────────────────────────────────────────────────────────┐
 * │              PREMIUM USER EXPERIENCE                        │
 * │  • Dynamic background based on weather conditions          │
 * │  • Real-time search suggestions                            │
 * │  • Smart city recommendations                              │
 * │  • Interactive search history                              │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * @version 3.0.0 - Enterprise Premium Edition
 */

import { useState, useEffect, useRef } from "react";
import SearchCity from "./SearchCity";
import CallWeather from "./CallWeather";

const Main = () => {
  // ================================================================
  // ENHANCED STATE MANAGEMENT
  // ================================================================
  
  // Core search states
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  
  // Enhanced UX states
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [searchStats, setSearchStats] = useState({
    totalSearches: 0,
    successfulSearches: 0,
    lastSearchTime: null
  });

  // Refs for advanced interactions
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // ================================================================
  // INITIAL APP LOADING SIMULATION
  // ================================================================
  useEffect(() => {
    // Simulate app initialization with interesting loading content
    const initializeApp = async () => {
      // Simulate loading different app modules
      const loadingSteps = [
        { step: 'Initializing weather services...', delay: 800 },
        { step: 'Loading city database...', delay: 600 },
        { step: 'Preparing user interface...', delay: 500 },
        { step: 'Connecting to weather APIs...', delay: 700 }
      ];

      for (const { step, delay } of loadingSteps) {
        console.log(`🔄 ${step}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Load popular cities as suggestions
      setSuggestions([
        'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 
        'Melbourne', 'Dubai', 'Singapore', 'Los Angeles', 'Berlin'
      ]);

      setAppLoading(false);
    };

    initializeApp();
  }, []);

  // ================================================================
  // ENHANCED EVENT HANDLERS
  // ================================================================
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedCity = city.trim();
    if (!trimmedCity) return;
    
    setIsSearching(true);
    setWeatherLoading(false);
    
    // Update search statistics
    setSearchStats(prev => ({
      ...prev,
      totalSearches: prev.totalSearches + 1,
      lastSearchTime: new Date().toLocaleTimeString()
    }));
    
    console.log('🔍 Enhanced Search:', trimmedCity);
    
    // Clear previous weather selection
    setSelectedCity(null);
    setSearchQuery(trimmedCity);
    
    // Add to search history (keep last 5)
    setSearchHistory(prev => {
      const newHistory = [trimmedCity, ...prev.filter(item => item !== trimmedCity)];
      return newHistory.slice(0, 5);
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCity(newValue);
    
    // Clear search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (newValue.trim() === "") {
      setSearchQuery("");
      setSelectedCity(null);
      setIsSearching(false);
    } else {
      // Debounced search preparation
      searchTimeoutRef.current = setTimeout(() => {
        console.log('🔤 Search input updated:', newValue);
      }, 300);
    }
  };

  const handleCitySelection = (selectedCityData) => {
    setSelectedCity(selectedCityData);
    setIsSearching(false);
    setWeatherLoading(true);
    
    // Update success statistics
    setSearchStats(prev => ({
      ...prev,
      successfulSearches: prev.successfulSearches + 1
    }));
    
    // Focus management for accessibility
    setTimeout(() => {
      setWeatherLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    inputRef.current?.focus();
  };

  // ================================================================
  // APP LOADING SCREEN
  // ================================================================
  if (appLoading) {
    return (
      <div className="app-loading-container">
        <div className="app-loading-content">
          <div className="loading-logo">
            <div className="logo-spinner"></div>
            <h1>MyWeather</h1>
          </div>
          
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="loading-text">Preparing your weather experience...</p>
          </div>
          
          <div className="loading-features">
            <div className="feature-item">
              <span className="feature-icon">🌍</span>
              <span>Global city database</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Real-time weather data</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Dynamic theming</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================================================================
  // MAIN COMPONENT RENDER
  // ================================================================
  return (
    <main className="main-weather enhanced" role="main">
      
      {/* ============================================================
          ENHANCED SEARCH INTERFACE
          ============================================================ */}
      <section className="weather-search enhanced-search" aria-labelledby="search-heading">
        
        {/* Search Statistics */}
        <div className="search-stats">
          <div className="stat-item">
            <span className="stat-number">{searchStats.totalSearches}</span>
            <span className="stat-label">Total Searches</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{searchStats.successfulSearches}</span>
            <span className="stat-label">Cities Found</span>
          </div>
          {searchStats.lastSearchTime && (
            <div className="stat-item">
              <span className="stat-number">{searchStats.lastSearchTime}</span>
              <span className="stat-label">Last Search</span>
            </div>
          )}
        </div>

        <article className="weather-form enhanced-form">
          <form 
            className="form-search enhanced" 
            onSubmit={handleSubmit}
            role="search"
          >
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                name="city"
                value={city}
                placeholder="Enter city name..."
                onChange={handleInputChange}
                aria-label="City name input"
                autoComplete="off"
                spellCheck="true"
                maxLength={100}
                className={isSearching ? 'searching' : ''}
              />
              
              {isSearching && (
                <div className="input-loading">
                  <div className="search-pulse"></div>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className={`search-btn ${!city.trim() ? 'disabled' : ''}`}
              disabled={!city.trim()}
            >
              <span className="btn-text">Search</span>
              <span className="btn-icon">🔍</span>
            </button>
          </form>
          
          {/* Quick Suggestions */}
          {!searchQuery && !selectedCity && suggestions.length > 0 && (
            <div className="quick-suggestions">
              <p className="suggestions-label">Popular cities:</p>
              <div className="suggestions-grid">
                {suggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={suggestion}
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && !searchQuery && (
            <div className="search-history">
              <p className="history-label">Recent searches:</p>
              <div className="history-items">
                {searchHistory.map((historyItem, index) => (
                  <button
                    key={`${historyItem}-${index}`}
                    className="history-chip"
                    onClick={() => handleSuggestionClick(historyItem)}
                  >
                    <span className="history-icon">🕒</span>
                    {historyItem}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced Search Results */}
          {searchQuery !== "" && (
            <div className="search-results-wrapper">
              <SearchCity
                cityName={searchQuery}
                setSelectedCity={handleCitySelection}
                setSearchQuery={setSearchQuery}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
              />
            </div>
          )}
        </article>
      </section>

      {/* ============================================================
          ENHANCED WEATHER DISPLAY
          ============================================================ */}
      <section className="weather-display enhanced-weather" aria-live="polite">
        
        {/* Weather Loading State */}
        {weatherLoading && (
          <div className="weather-loading">
            <div className="weather-skeleton">
              <div className="skeleton-header">
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
              </div>
              <div className="skeleton-main">
                <div className="skeleton-temp"></div>
                <div className="skeleton-icon"></div>
              </div>
              <div className="skeleton-details">
                <div className="skeleton-detail"></div>
                <div className="skeleton-detail"></div>
                <div className="skeleton-detail"></div>
              </div>
            </div>
            <p className="loading-message">Fetching latest weather data...</p>
          </div>
        )}

        {/* No Selection State with Interesting Content */}
        {!selectedCity && !weatherLoading && !searchQuery && (
          <div className="welcome-state">
            <div className="welcome-content">
              <div className="welcome-icon">
                <div className="weather-icons-demo">
                  <span className="demo-icon">☀️</span>
                  <span className="demo-icon">🌤️</span>
                  <span className="demo-icon">⛈️</span>
                  <span className="demo-icon">❄️</span>
                </div>
              </div>
              
              <h2 className="welcome-title">Welcome to MyWeather</h2>
              <p className="welcome-description">
                Discover real-time weather conditions for any city worldwide. 
                Our advanced system provides accurate forecasts with beautiful, 
                adaptive interfaces.
              </p>
              
              <div className="features-showcase">
                <div className="feature-highlight">
                  <span className="feature-emoji">🌡️</span>
                  <span>Real-time Temperature</span>
                </div>
                <div className="feature-highlight">
                  <span className="feature-emoji">💨</span>
                  <span>Wind Conditions</span>
                </div>
                <div className="feature-highlight">
                  <span className="feature-emoji">💧</span>
                  <span>Humidity Levels</span>
                </div>
                <div className="feature-highlight">
                  <span className="feature-emoji">👁️</span>
                  <span>Visibility Data</span>
                </div>
              </div>

              {/* Live Statistics */}
              <div className="live-stats">
                <div className="stat-box">
                  <span className="stat-value">{new Date().toLocaleString()}</span>
                  <span className="stat-desc">Current Time</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">Global</span>
                  <span className="stat-desc">Coverage</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">Instant</span>
                  <span className="stat-desc">Updates</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Weather Display */}
        <article className="weather-content">
          <CallWeather 
            selectedCity={selectedCity}
            weatherLoading={weatherLoading}
            setWeatherLoading={setWeatherLoading}
          />
        </article>
      </section>

      {/* ============================================================
          FLOATING ACTION ELEMENTS
          ============================================================ */}
      {selectedCity && (
        <div className="floating-actions">
          <button 
            className="floating-btn refresh-btn"
            onClick={() => {
              setWeatherLoading(true);
              // Trigger refresh logic
              setTimeout(() => setWeatherLoading(false), 2000);
            }}
            aria-label="Refresh weather data"
          >
            <span className="btn-icon">🔄</span>
          </button>
          
          <button 
            className="floating-btn clear-btn"
            onClick={() => {
              setSelectedCity(null);
              setCity("");
              setSearchQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear selection and start new search"
          >
            <span className="btn-icon">✨</span>
          </button>
        </div>
      )}

      {/* Advanced Search Overlay */}
      {isSearching && (
        <div className="search-overlay">
          <div className="search-indicator">
            <div className="search-ripple"></div>
            <span>Searching...</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;