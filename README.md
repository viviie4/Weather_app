# Weather App

A modern React weather application with that fetches weather data from the Weatherstack API.

## Features

- **Current Weather**: Real-time weather data with detailed information
- **Historical Weather**: Weather data from 7 days ago with hourly breakdown
- **Marine Weather**: Simulated marine conditions for coastal locations
- **Location Search**: Search by city name or coordinates
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Pastel Theme**: Soft lavender and light blue color palette for a dreamy aesthetic

## Setup Instructions

1. **Create the project** (if starting from scratch):
   ```bash
   npm create vite@latest weather-app --template react
   cd weather-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   npm install axios
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## API Configuration

The app uses the Weatherstack API with the following configuration:
- **API Key**: `8739ea5047bccff7e65185624f890b91`
- **Base URL**: `http://api.weatherstack.com`
- **Documentation**: https://docs.apilayer.com/weatherstack/docs/api-documentation

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx          # Location search component
│   ├── SearchBar.css
│   ├── TabNavigation.jsx      # Tab switching component
│   ├── TabNavigation.css
│   ├── CurrentWeather.jsx     # Current weather display
│   ├── CurrentWeather.css
│   ├── HistoricalWeather.jsx  # Historical weather display
│   ├── HistoricalWeather.css
│   ├── MarineWeather.jsx      # Marine weather display
│   └── MarineWeather.css
├── App.jsx                    # Main application component
├── App.css
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
```

## Usage

1. **Search for a location**: Use the search bar to enter a city name or coordinates
2. **Switch between tabs**: 
   - Current Weather: Shows real-time weather data
   - Historical: Shows weather from 7 days ago
   - Marine Weather: Shows marine conditions (simulated for demo)

## Features Details

### Current Weather
- Temperature with "feels like" value
- Weather description and icon
- Wind speed and direction
- Humidity, pressure, visibility
- UV index

### Historical Weather
- Average, maximum, and minimum temperatures
- Daily sunshine hours
- Hourly data breakdown (sample of 6 hours)

### Marine Weather
- Wave height and direction
- Wave period and swell height
- Sea temperature
- Tide levels
- Water visibility
- Coastal location detection

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Marine weather data is simulated for demonstration purposes
- The app includes error handling for API failures
- Loading states are implemented for better user experience