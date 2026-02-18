import React from 'react'
import './CurrentWeather.css'

const CurrentWeather = ({ data }) => {
  if (!data || !data.current) {
    return (
      <div className="weather-card glass">
        <p>No weather data available</p>
      </div>
    )
  }

  const { current, location } = data

  return (
    <div className="current-weather">
      <div className="weather-card glass">
        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.region}, {location.country}</p>
          <p className="local-time">Local Time: {location.localtime}</p>
        </div>

        <div className="main-weather">
          <div className="temperature-section">
            <div className="temperature">
              <span className="temp-value">{current.temperature}</span>
              <span className="temp-unit">°C</span>
            </div>
            <div className="weather-icon">
              <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} />
            </div>
          </div>
          
          <div className="weather-description">
            <h3>{current.weather_descriptions[0]}</h3>
            <p>Feels like {current.feelslike}°C</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{current.wind_speed} km/h</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind Direction</span>
              <span className="detail-value">{current.wind_dir}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{current.pressure} mb</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{current.visibility} km</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">UV Index</span>
              <span className="detail-value">{current.uv_index}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather