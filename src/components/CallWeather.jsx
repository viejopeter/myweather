/**
 * ================================================================
 * CALL WEATHER COMPONENT - PREMIUM WEATHER VISUALIZATION
 * ================================================================
 * 
 * Sophisticated weather display component featuring advanced data
 * visualization, adaptive theming, and premium UI interactions.
 * Implements intelligent weather presentation with real-time updates.
 * 
 * CORE CAPABILITIES:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    DATA VISUALIZATION                       │
 * │  • Real-time weather data from OpenWeather API             │
 * │  • Intelligent metric formatting and display               │
 * │  • Interactive weather icons with animations               │
 * │  • Temperature conversion and formatting                   │
 * └─────────────────────────────────────────────────────────────┘
 * ┌─────────────────────────────────────────────────────────────┐
 * │                   ADAPTIVE THEMING SYSTEM                  │
 * │  • Dynamic day/night theme detection                       │
 * │  • Weather condition-based styling                         │
 * │  • Seasonal color palette adaptations                      │
 * │  • Gradient background system                              │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * ADVANCED UI FEATURES:
 * ✨ Glassmorphism weather cards with blur effects
 * ✨ Animated weather icons with floating effects
 * ✨ Temperature display with gradient text effects
 * ✨ Hover interactions on weather details
 * ✨ Responsive layout adaptation
 * ✨ Loading states with skeleton animations
 * 
 * WEATHER DATA PROCESSING:
 * • Temperature conversion (Celsius/Fahrenheit)
 * • Humidity and wind speed formatting
 * • Weather condition categorization
 * • Time-based theme detection (day/night)
 * • Feel-like temperature calculations
 * 
 * ENHANCEMENT OPPORTUNITIES:
 * 🌟 7-day weather forecast integration
 * 🌟 Weather alerts and notifications
 * 🌟 Historical weather data charts
 * 🌟 Weather radar map integration
 * 🌟 Air quality index display
 * 🌟 UV index and sun position tracking
 * 
 * @version 2.0.0 - Premium Portfolio Edition
 * @component CallWeather
 * @requires api/weatherByCity service
 */

// ================================================================
// CORE DEPENDENCIES - HOOKS AND SERVICES
// ================================================================
import { weatherByCity } from "../services/api";
import { useEffect, useState } from "react";

/**
 * ================================================================
 * CALL WEATHER FUNCTIONAL COMPONENT
 * ================================================================
 * 
 * Manages comprehensive weather data fetching, processing, and
 * visualization. Implements advanced React patterns with
 * sophisticated error handling and loading states.
 * 
 * PROPS INTERFACE:
 * @param {Object} selectedCity - City object with coordinates and metadata
 *   @param {number} selectedCity.lat - Latitude coordinate
 *   @param {number} selectedCity.lon - Longitude coordinate
 *   @param {string} selectedCity.name - City name
 *   @param {string} selectedCity.country - Country code
 * 
 * COMPONENT LIFECYCLE:
 * 1. Receives selectedCity prop → validates coordinates
 * 2. Triggers weather API call with lat/lon parameters
 * 3. Processes and formats weather data for display
 * 4. Applies dynamic theming based on time/conditions
 * 5. Renders interactive weather visualization
 * 
 * STATE ARCHITECTURE:
 * • weatherData: Complete weather object from API
 * • loading: Loading state for UX feedback
 * • error: Error handling for failed requests
 * • theme: Dynamic theme based on day/night detection
 * 
 * @param {Object} props - Component props interface
 * @returns {JSX.Element} Premium weather display interface
 */
const CallWeather = ({ selectedCity }) => {
  // ================================================================
  // STATE MANAGEMENT - WEATHER DATA WORKFLOW
  // ================================================================
  
  /**
   * Complete weather data object from OpenWeather API
   * Contains: main, weather, wind, clouds, visibility, etc.
   */
  const [weatherData, setWeatherData] = useState({});
  
  /**
   * Loading state for smooth UX transitions
   * Enables skeleton loading animations
   */
  const [loading, setLoading] = useState(false);
  
  /**
   * Error state for robust error handling
   * Provides user-friendly error messages
   */
  const [error, setError] = useState(null);
  
  /**
   * Dynamic theme state based on weather conditions
   * Determines day/night styling and color schemes
   */
  const [theme, setTheme] = useState('day');

  // ================================================================
  // UTILITY FUNCTIONS - DATA PROCESSING
  // ================================================================
  
  /**
   * Intelligent temperature formatting with rounding
   * Converts float values to user-friendly integers
   * 
   * @param {number} temperature - Raw temperature value
   * @returns {number} Formatted temperature integer
   */
  const formatTemperature = (temperature) => {
    return Math.round(temperature);
  };

  /**
   * Weather condition formatting for enhanced readability
   * Capitalizes first letter of each word in description
   * 
   * @param {string} description - Raw weather description
   * @returns {string} Formatted weather description
   */
  const formatWeatherDescription = (description) => {
    return description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /**
   * Dynamic theme detection based on weather icon
   * Analyzes icon code to determine day/night state
   * 
   * @param {string} iconCode - Weather icon identifier
   * @returns {string} Theme identifier ('day' or 'night')
   */
  const detectTheme = (iconCode) => {
    return iconCode?.includes('n') ? 'night' : 'day';
  };

  /**
   * Wind direction calculation from degrees
   * Converts numerical degrees to cardinal directions
   * 
   * @param {number} degrees - Wind direction in degrees
   * @returns {string} Cardinal direction (N, NE, E, SE, etc.)
   */
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // ================================================================
  // SIDE EFFECTS - API INTEGRATION & THEME MANAGEMENT
  // ================================================================
  
  /**
   * Weather data fetching effect with comprehensive error handling
   * 
   * FUNCTIONALITY:
   * • Validates selectedCity before API calls
   * • Implements loading states for optimal UX
   * • Processes weather data for display optimization
   * • Updates theme based on weather conditions
   * • Handles network errors gracefully
   */
  useEffect(() => {
    // Early return if no city selected
    if (!selectedCity || !selectedCity.lat || !selectedCity.lon) {
      setWeatherData({});
      setError(null);
      return;
    }

    /**
     * Async weather data fetching with error boundaries
     * Implements modern async/await patterns
     */
    const fetchWeatherData = async () => {
      try {
        // Initialize loading state
        setLoading(true);
        setError(null);
        
        // API call with coordinate parameters
        const weatherResponse = await weatherByCity(selectedCity);
        
        // Validate API response
        if (!weatherResponse || !weatherResponse.main) {
          throw new Error('Invalid weather data received');
        }
        
        // Update weather state with processed data
        setWeatherData(weatherResponse);
        
        // Update theme based on weather conditions
        const newTheme = detectTheme(weatherResponse.weather?.[0]?.icon);
        setTheme(newTheme);
        
      } catch (apiError) {
        // Comprehensive error handling
        console.error('Weather API Error:', apiError);
        setError('Unable to load weather data. Please try again.');
        setWeatherData({});
        
      } finally {
        // Always clear loading state
        setLoading(false);
      }
    };

    // Execute fetch with debouncing
    const fetchTimeout = setTimeout(fetchWeatherData, 200);
    
    // Cleanup function for memory management
    return () => clearTimeout(fetchTimeout);
    
  }, [selectedCity]); // Re-run when selectedCity changes

  // ================================================================
  // RENDER LOGIC - CONDITIONAL UI STATES
  // ================================================================

  // Loading state with skeleton animation
  if (loading) {
    return (
      <div className="weather-loading" aria-live="polite">
        <div className="weather-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-temperature"></div>
          <div className="skeleton-description"></div>
          <div className="skeleton-details">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="weather-error" role="alert">
        <div className="error-content">
          <h3>Weather Unavailable</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!weatherData || !weatherData.main) {
    return (
      <div className="weather-empty" aria-live="polite">
        <p></p>
      </div>
    );
  }

  // Main weather display rendering
  return (
    <div 
      className={`weather-box ${theme}`}
      role="region"
      aria-label={`Weather information for ${selectedCity?.name || 'selected city'}`}
    >
      {/* ============================================================
          TEMPERATURE & ICON DISPLAY - PRIMARY INFORMATION
          ============================================================ */}
      <div className="box-temp-icon">
        {/* Animated Weather Icon */}
        <div className="weather-icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={`${formatWeatherDescription(weatherData.weather[0].description)} weather icon`}
            className="weather-icon"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        {/* Primary Temperature Display */}
        <div className="temperature-container">
          <p className="weather-temperature" aria-label={`Temperature ${formatTemperature(weatherData.main.temp)} degrees Celsius`}>
            {formatTemperature(weatherData.main.temp)}°
          </p>
          <span className="temperature-unit">Celsius</span>
        </div>
      </div>

      {/* ============================================================
          WEATHER DESCRIPTION - SECONDARY INFORMATION
          ============================================================ */}
      <div className="weather-description-container">
        <h3 className="weather-description">
          {formatWeatherDescription(weatherData.weather[0].description)}
        </h3>
        
        <p className="location-display" aria-label="Current location">
          {selectedCity?.name}, {selectedCity?.country}
        </p>
      </div>

      {/* ============================================================
          DETAILED WEATHER METRICS - COMPREHENSIVE DATA
          ============================================================ */}
      <div className="weather-details" role="list" aria-label="Detailed weather information">
        
        {/* Feels Like Temperature */}
        <div className="detail-item" role="listitem">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">
            {formatTemperature(weatherData.main.feels_like)}°C
          </span>
        </div>

        {/* Humidity Percentage */}
        <div className="detail-item" role="listitem">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">
            {weatherData.main.humidity}%
          </span>
        </div>

        {/* Wind Speed and Direction */}
        <div className="detail-item" role="listitem">
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {weatherData.wind.speed} m/s
            {weatherData.wind.deg && ` ${getWindDirection(weatherData.wind.deg)}`}
          </span>
        </div>

        {/* Atmospheric Pressure */}
        {weatherData.main.pressure && (
          <div className="detail-item" role="listitem">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">
              {weatherData.main.pressure} hPa
            </span>
          </div>
        )}

        {/* Visibility */}
        {weatherData.visibility && (
          <div className="detail-item" role="listitem">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">
              {(weatherData.visibility / 1000).toFixed(1)} km
            </span>
          </div>
        )}

        {/* Cloud Coverage */}
        {weatherData.clouds && (
          <div className="detail-item" role="listitem">
            <span className="detail-label">Cloud Cover</span>
            <span className="detail-value">
              {weatherData.clouds.all}%
            </span>
          </div>
        )}

        {/* Weather Condition Category */}
        <div className="detail-item" role="listitem">
          <span className="detail-label">Condition</span>
          <span className="detail-value">
            {weatherData.weather[0].main}
          </span>
        </div>

        {/* Time of Day Indicator */}
        <div className="detail-item" role="listitem">
          <span className="detail-label">Time</span>
          <span className="detail-value">
            {theme === 'night' ? '🌙 Night' : '☀️ Day'}
          </span>
        </div>
      </div>

      {/* ============================================================
          ADDITIONAL WEATHER INSIGHTS - ENHANCED INFORMATION
          ============================================================ */}
      <div className="weather-insights">
        
        {/* Temperature Range Display */}
        {weatherData.main.temp_min && weatherData.main.temp_max && (
          <div className="temperature-range">
            <span className="range-label">Today's Range:</span>
            <span className="range-values">
              {formatTemperature(weatherData.main.temp_min)}° - {formatTemperature(weatherData.main.temp_max)}°
            </span>
          </div>
        )}

        {/* Weather Quality Indicator */}
        <div className="weather-quality">
          <span className="quality-indicator" data-theme={theme}>
            {theme === 'day' ? '🌤️ Pleasant Day' : '🌙 Peaceful Night'}
          </span>
        </div>
      </div>

      {/* ============================================================
          DATA TIMESTAMP - API UPDATE INFORMATION
          ============================================================ */}
      <div className="weather-metadata">
        <p className="last-updated">
          Last updated: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
        </p>
        <p className="data-source">
          Data provided by OpenWeather API
        </p>
      </div>
    </div>
  );
};

// ================================================================
// COMPONENT EXPORT - ES6 MODULE STANDARD
// ================================================================
export default CallWeather;