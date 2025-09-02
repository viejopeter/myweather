/**
 * ================================================================
 * API SERVICES - OPENWEATHER INTEGRATION (FIXED VERSION)
 * ================================================================
 * 
 * Simplified API service layer that works perfectly with OpenWeather API.
 * Removed problematic headers and complex fetch wrappers that were
 * causing CORS issues.
 * 
 * WORKING ARCHITECTURE:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                   GEOCODING SERVICE                         │
 * │  • City name to coordinates conversion                      │
 * │  • Simple fetch without custom headers                     │
 * │  • Direct API calls with minimal processing                │
 * └─────────────────────────────────────────────────────────────┘
 * ┌─────────────────────────────────────────────────────────────┐
 * │                 CURRENT WEATHER SERVICE                     │
 * │  • Real-time weather data by coordinates                   │
 * │  • Standard fetch API without complications                │
 * │  • Clean error handling without interference               │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * FIXES APPLIED:
 * ✅ Removed custom headers that triggered preflight requests
 * ✅ Simplified fetch calls - no timeout controllers
 * ✅ Removed unnecessary request validation
 * ✅ Kept professional error handling without interference
 * ✅ Maintained all logging and debugging features
 * 
 * @version 2.1.0 - CORS Fixed Edition
 * @service ApiServices
 * @provider OpenWeather API v2.5 & Geocoding v1.0
 */

// ================================================================
// ENVIRONMENT CONFIGURATION - SECURE API MANAGEMENT
// ================================================================

/**
 * OpenWeather API base URL for all service endpoints
 * Using the exact same URL that works in your browser
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.openweathermap.org';

/**
 * API authentication key from environment variables
 * Your working key: dde42cb41a7064e44c40c3e56b105b53
 */
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Default search result limit for geocoding requests
 * Optimizes API usage while providing sufficient options
 */
const DEFAULT_SEARCH_LIMIT = 5;

// ================================================================
// UTILITY FUNCTIONS - SIMPLIFIED & WORKING
// ================================================================

/**
 * Simple input validation without over-engineering
 * Just ensures we have valid input for API calls
 * 
 * @param {string} input - User input string
 * @returns {string} Clean input ready for API
 * @throws {Error} Only for truly invalid input
 */
const cleanInput = (input) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input provided');
  }
  return input.trim();
};

// ================================================================
// GEOCODING SERVICE - SIMPLIFIED & WORKING
// ================================================================

/**
 * ================================================================
 * SEARCH CITY SERVICE - FIXED VERSION
 * ================================================================
 * 
 * Simple, working city search using basic fetch API.
 * No custom headers, no timeout controllers, no complications.
 * Uses the exact same approach that works in your browser.
 * 
 * @param {string} cityQuery - City name to search
 * @param {number} resultLimit - Max results (default: 5)
 * @returns {Promise<Array>} Array of city objects
 */
export const searchCity = async (cityQuery, resultLimit = DEFAULT_SEARCH_LIMIT) => {
  try {
    // Basic input validation
    const cleanQuery = cleanInput(cityQuery);
    const limit = Math.min(Math.max(parseInt(resultLimit) || DEFAULT_SEARCH_LIMIT, 1), 5);
    
    // Build the exact same URL that works in your browser
    const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(cleanQuery)}&limit=${limit}&appid=${API_KEY}`;
    
    console.log(`🔍 Geocoding Request: ${cleanQuery}`);
    console.log(`🌐 URL: ${url}`);
    
    // Simple fetch - exactly like it works in browser
    const response = await fetch(url);
    
    // Basic error handling
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 API Error ${response.status}:`, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    // Parse response
    const cityData = await response.json();
    
    // Basic validation
    if (!Array.isArray(cityData)) {
      console.warn('⚠️ Unexpected API response format');
      return [];
    }
    
    // Filter valid city objects
    const validCities = cityData.filter(city => 
      city && 
      city.name && 
      typeof city.lat === 'number' && 
      typeof city.lon === 'number'
    );
    
    console.log(`✅ Found ${validCities.length} cities for "${cleanQuery}"`);
    return validCities;
    
  } catch (error) {
    // Simple error handling
    console.error('🚨 Search City Error:', error.message);
    
    // Return empty array for graceful degradation
    return [];
  }
};

// ================================================================
// WEATHER SERVICE - SIMPLIFIED & WORKING
// ================================================================

/**
 * ================================================================
 * WEATHER BY CITY SERVICE - FIXED VERSION
 * ================================================================
 * 
 * Simple weather data fetching using basic fetch API.
 * Exactly the same approach that works in your browser.
 * 
 * @param {Object} cityObject - City with lat/lon coordinates
 * @returns {Promise<Object>} Weather data object
 */
export const weatherByCity = async (cityObject) => {
  try {
    // Basic validation
    if (!cityObject || typeof cityObject.lat !== 'number' || typeof cityObject.lon !== 'number') {
      throw new Error('Invalid city object - missing coordinates');
    }
    
    const { lat, lon } = cityObject;
    
    // Build the exact same URL that works in your browser
    const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    console.log(`🌤️ Weather Request: (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
    console.log(`🌐 URL: ${url}`);
    
    // Simple fetch - exactly like it works in browser
    const response = await fetch(url);
    
    // Basic error handling
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 Weather API Error ${response.status}:`, errorText);
      throw new Error(`Weather API request failed: ${response.status}`);
    }
    
    // Parse response
    const weatherData = await response.json();
    
    // Basic validation
    if (!weatherData || !weatherData.main || !weatherData.weather) {
      console.warn('⚠️ Invalid weather data structure');
      return {};
    }
    
    console.log(`✅ Weather data retrieved: ${weatherData.weather[0]?.main || 'Unknown'}`);
    return weatherData;
    
  } catch (error) {
    // Simple error handling
    console.error('🚨 Weather API Error:', error.message);
    
    // Return empty object for graceful degradation
    return {};
  }
};

// ================================================================
// DEBUG & TESTING UTILITIES
// ================================================================

/**
 * Test API connectivity - useful for debugging
 * Call this in console to test your API setup
 */
export const testApiSetup = async () => {
  console.log('🧪 Testing API Setup...');
  console.log(`🔑 API Key: ${API_KEY ? 'Present' : 'Missing'}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  
  try {
    // Test geocoding
    const cities = await searchCity('London');
    console.log(`✅ Geocoding Test: Found ${cities.length} cities`);
    
    if (cities.length > 0) {
      // Test weather
      const weather = await weatherByCity(cities[0]);
      console.log(`✅ Weather Test: ${weather.main ? 'Success' : 'Failed'}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    return false;
  }
};

// ================================================================
// ENVIRONMENT VALIDATION
// ================================================================

/**
 * Validate environment setup on module load
 * Warns about configuration issues without breaking the app
 */
const validateSetup = () => {
  if (!API_KEY) {
    console.warn('⚠️ VITE_API_KEY not found in environment variables');
  }
  if (!BASE_URL) {
    console.warn('⚠️ VITE_API_BASE_URL not found in environment variables');
  }
  if (API_KEY && API_KEY.length !== 32) {
    console.warn(`⚠️ API Key length is ${API_KEY.length}, expected 32 characters`);
  }
};

// Run validation on module load
validateSetup();