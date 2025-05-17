const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const searchCity = async (city, limit = 5) => {

     try {
          const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`);
          if (!response.ok) {
               throw new Error(`Api request failed ${response.status}`);
          }
          const data = await response.json();
          return data;
     } catch (e) {
          console.log("Error fetching city", e);
          return {};
     }

};

export const weatherByCity = async (selectedCity) => {

     try {

          const response = await fetch(`${BASE_URL}/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${API_KEY}`);
          if (!response.ok) {
               throw new Error(`Api request failed ${response.status}`);
          }
          const data = await response.json();
          return data;

     } catch (error) {
          console.log("Faild to load data by lat and lon" + error);
          return {};
     }
};