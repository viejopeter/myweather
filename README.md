# 🌤️ MyWeather

**MyWeather** is a simple weather application built with **React** and **Vite**. It allows users to search for a city and get real-time weather data using the **OpenWeatherMap API**.  
The project demonstrates how to integrate a third-party weather API, manage environment variables securely, and build a responsive front-end experience.

---

## 🚀 Features

- 🌍 **Search weather by city name**
- 🌡️ **Displays temperature, weather condition, humidity, and wind speed**
- 📱 **Responsive and user-friendly interface**
- ⚡ Built with **React + Vite** for fast development
- 🔑 Uses environment variables for secure API key management

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Styling:** CSS
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)

---

## ⚙️ Environment Variables

This project uses a `.env` file to store environment variables.  
Create a `.env` file in the root directory and add the following values:

```env
VITE_API_BASE_URL=https://api.openweathermap.org
VITE_API_KEY=your_openweathermap_api_key
```

Make sure to replace your_openweathermap_api_key with your actual API key from OpenWeatherMap

## 🚀 Usage

Once the application is running in the browser:

Enter the name of a city (e.g., Sydney, New York, Tokyo) in the search bar.

Click the Search button or press Enter.

The app will display:

Current temperature in °C

Weather condition (e.g., Clear, Rainy, Cloudy)

Humidity percentage

Wind speed

If the city is not found or the input is invalid, a friendly error message will be shown.

The app adapts to desktop and mobile devices, providing a clean and responsive experience.

## 🛠️ Installation & Setup (for developers)

Clone the repository and install dependencies:

```
git clone https://github.com/viejopeter/myweather.git
cd myweather
npm install
```

Run the development server:

```
npm run dev
```

Build for production:
```
npm run build
```
Preview the production build:
```
npm run preview
```

## 📂 Project Structure
```

myweather/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── App.jsx          # Main application file
│   ├── main.jsx         # Entry point
│   └── styles.css       # Global styles
├── .env                 # Environment variables (not committed)
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies
└── README.md            # Project documentation

```

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author & Contact
- Pedro Quinchanegua
- [GitHub: viejopeter](https://github.com/viejopeter)
  ![Litenotes Logo](public/assets/qp-sb.png)
---