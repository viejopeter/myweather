/**
 * ================================================================
 * SEARCH CITY COMPONENT
 * ================================================================
 * Fetches list of possible cities from OpenWeather API.
 * Displays results as clickable items.
 * ------------------------------------------------
 * FUTURE ENHANCEMENTS:
 *   ✔ Add flag icons per country
 *   ✔ Highlight best match
 *   ✔ Show "no results" if empty
 */

import { searchCity } from "../services/api";
import { useState, useEffect } from "react";

const SearchCity = ({ cityName, setSelectedCity, setSearchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!cityName.trim()) return;

    const fetchData = async () => {
      const loadData = await searchCity(cityName);
      setData(loadData);
    };

    fetchData();
  }, [cityName]);

  const handleOnClick = (city) => {
    setSelectedCity(city);
    setSearchQuery("");
  };

  return (
    <ul className="result-search">
      {data.map((city, index) => (
        <li key={index}>
          <a onClick={() => handleOnClick(city)}>
            {city.name}, {city.country} {city.state} (Lat {city.lat.toFixed(2)}, Lon {city.lon.toFixed(2)})
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SearchCity;
