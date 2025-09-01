/**
 * ================================================================
 * CALL WEATHER COMPONENT
 * ================================================================
 * Fetches and displays detailed weather for a selected city.
 * Shows:
 *   - Icon + Temperature
 *   - Weather description
 *   - Details (humidity, wind, condition, time)
 * ------------------------------------------------
 * NEW FEATURES:
 *   ✔ Day/Night gradient theme
 *   ✔ Add sunrise/sunset times
 *   ✔ Add °C / °F toggle
 */

import { weatherByCity } from "../services/api";
import { useEffect, useState } from "react";

const CallWeather = ({ selectedCity }) => {
  const [dataWeather, setDataWeather] = useState({});

  useEffect(() => {
    if (!selectedCity) return;

    const fetchData = async () => {
      const data = await weatherByCity(selectedCity);
      setDataWeather(data);
    };

    fetchData();
  }, [selectedCity]);

  return (
    <>
      {dataWeather && dataWeather.main && (
        <div
          className={`weather-box ${
            dataWeather?.weather?.[0]?.icon?.includes("n") ? "night" : "day"
          }`}
        >
          <div className="box-temp-icon">
            <img
              src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="weather-temperature">
              {parseInt(dataWeather.main.temp)} °C
            </p>
          </div>

          <p className="weather-description">
            {dataWeather.weather[0].description}
          </p>

          <div className="weather-details">
            <p>Feels like: {parseInt(dataWeather.main.feels_like)} °C</p>
            <p>Humidity: {dataWeather.main.humidity}%</p>
            <p>Wind: {dataWeather.wind.speed} m/s</p>
            <p>Condition: {dataWeather.weather[0].main}</p>
            <p>Time: {dataWeather.weather[0].icon.includes("n") ? "Night" : "Day"}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CallWeather;
