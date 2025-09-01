/**
 * ================================================================
 * API SERVICES
 * ================================================================
 * Handles all calls to OpenWeather API.
 * 
 * searchCity(city, limit) -> returns city candidates
 * weatherByCity(cityObj) -> returns detailed weather
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetch city search results
 */
export const searchCity = async (city, limit = 5) => {
  try {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API request failed ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.log("Error fetching city", e);
    return [];
  }
};

/**
 * Fetch weather by latitude & longitude
 */
export const weatherByCity = async (selectedCity) => {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API request failed ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Failed to load data by lat and lon", error);
    return {};
  }
};
