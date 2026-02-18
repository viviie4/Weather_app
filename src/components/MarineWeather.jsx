import React, { useState, useEffect } from 'react'
import './MarineWeather.css'

const API_KEY = '8739ea5047bccff7e65185624f890b91'

const MarineWeather = ({ location }) => {
  const [marineData, setMarineData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Coastal cities for marine weather
  const coastalLocations = [
    'Mumbai', 'Chennai', 'Kochi', 'Goa', 'Visakhapatnam',
    'Miami', 'San Francisco', 'Sydney', 'Barcelona', 'Nice'
  ]

  const isCoastalLocation = (loc) => {
    return coastalLocations.some(coastal => 
      loc.toLowerCase().includes(coastal.toLowerCase()) ||
      coastal.toLowerCase().includes(loc.toLowerCase())
    )
  }

  useEffect(() => {
    fetchMarineData()
  }, [location])

  const fetchMarineData = async () => {
    setLoading(true)
    setError(null)

    try {
      // For demo purposes, we'll use current weather data and simulate marine conditions
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(location)}`
      )
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.info || 'Failed to fetch marine weather data')
      }

      // Simulate marine-specific data based on current weather
      const simulatedMarineData = {
        ...data,
        marine: {
          waveHeight: Math.random() * 3 + 0.5, // 0.5-3.5m
          waveDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
          wavePeriod: Math.random() * 8 + 4, // 4-12 seconds
          seaTemperature: data.current.temperature + Math.random() * 4 - 2, // ±2°C from air temp
          tideLevel: ['High', 'Low', 'Rising', 'Falling'][Math.floor(Math.random() * 4)],
          swellHeight: Math.random() * 2 + 0.3, // 0.3-2.3m
          waterVisibility: Math.random() * 20 + 5, // 5-25m
          isCoastal: isCoastalLocation(location)
        }
      }

      setMarineData(simulatedMarineData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading marine weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container glass">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={fetchMarineData}>Try Again</button>
      </div>
    )
  }

  if (!marineData) {
    return (
      <div className="weather-card glass">
        <p>No marine weather data available</p>
      </div>
    )
  }

  const { current, location: loc, marine } = marineData

  return (
    <div className="marine-weather">
      <div className="weather-card glass">
        <div className="location-info">
          <h2>{loc.name}</h2>
          <p>{loc.region}, {loc.country}</p>
          {!marine.isCoastal && (
            <div className="warning-message">
              <p>⚠️ This location may not be coastal. Marine data is simulated for demonstration.</p>
            </div>
          )}
        </div>

        <div className="marine-conditions">
          <h3>🌊 Marine Conditions</h3>
          
          <div className="marine-grid">
            <div className="marine-item glass-dark">
              <div className="marine-icon">🌊</div>
              <div className="marine-info">
                <h4>Wave Height</h4>
                <span className="marine-value">{marine.waveHeight.toFixed(1)}m</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">🧭</div>
              <div className="marine-info">
                <h4>Wave Direction</h4>
                <span className="marine-value">{marine.waveDirection}</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">⏱️</div>
              <div className="marine-info">
                <h4>Wave Period</h4>
                <span className="marine-value">{marine.wavePeriod.toFixed(1)}s</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">🌡️</div>
              <div className="marine-info">
                <h4>Sea Temperature</h4>
                <span className="marine-value">{marine.seaTemperature.toFixed(1)}°C</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">🌊</div>
              <div className="marine-info">
                <h4>Tide Level</h4>
                <span className="marine-value">{marine.tideLevel}</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">〰️</div>
              <div className="marine-info">
                <h4>Swell Height</h4>
                <span className="marine-value">{marine.swellHeight.toFixed(1)}m</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">👁️</div>
              <div className="marine-info">
                <h4>Water Visibility</h4>
                <span className="marine-value">{marine.waterVisibility.toFixed(0)}m</span>
              </div>
            </div>

            <div className="marine-item glass-dark">
              <div className="marine-icon">💨</div>
              <div className="marine-info">
                <h4>Wind Speed</h4>
                <span className="marine-value">{current.wind_speed} km/h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="weather-summary">
          <h3>Current Weather</h3>
          <div className="summary-content">
            <div className="weather-main">
              <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} />
              <div>
                <h4>{current.weather_descriptions[0]}</h4>
                <p>{current.temperature}°C (feels like {current.feelslike}°C)</p>
              </div>
            </div>
            <div className="weather-details-marine">
              <p>Humidity: {current.humidity}%</p>
              <p>Pressure: {current.pressure} mb</p>
              <p>Visibility: {current.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarineWeather