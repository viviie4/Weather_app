import React from 'react'
import './HistoricalWeather.css'

const HistoricalWeather = ({ data }) => {
  if (!data || !data.historical) {
    return (
      <div className="weather-card glass">
        <p>No historical weather data available</p>
      </div>
    )
  }

  const { historical, location } = data
  const historicalDate = Object.keys(historical)[0]
  const dayData = historical[historicalDate]

  return (
    <div className="historical-weather">
      <div className="weather-card glass">
        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.region}, {location.country}</p>
          <p className="historical-date">Historical Data for: {historicalDate}</p>
        </div>

        <div className="historical-summary">
          <div className="summary-item">
            <h3>Average Temperature</h3>
            <span className="temp-large">{dayData.avgtemp}°C</span>
          </div>
          <div className="summary-item">
            <h3>Max Temperature</h3>
            <span className="temp-large">{dayData.maxtemp}°C</span>
          </div>
          <div className="summary-item">
            <h3>Min Temperature</h3>
            <span className="temp-large">{dayData.mintemp}°C</span>
          </div>
        </div>

        <div className="historical-details">
          <h3>Daily Summary</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Total Sunshine</span>
              <span className="detail-value">{dayData.sunhour} hours</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">UV Index</span>
              <span className="detail-value">{dayData.uv_index}</span>
            </div>
          </div>
        </div>

        {dayData.hourly && dayData.hourly.length > 0 && (
          <div className="hourly-data">
            <h3>Hourly Data (Sample)</h3>
            <div className="hourly-grid">
              {dayData.hourly.slice(0, 6).map((hour, index) => (
                <div key={index} className="hourly-item glass-dark">
                  <div className="hour-time">{hour.time}</div>
                  <div className="hour-temp">{hour.temperature}°C</div>
                  <div className="hour-desc">{hour.weather_descriptions[0]}</div>
                  <div className="hour-details">
                    <small>Wind: {hour.wind_speed} km/h</small>
                    <small>Humidity: {hour.humidity}%</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoricalWeather