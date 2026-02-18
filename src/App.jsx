import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import TabNavigation from './components/TabNavigation'
import CurrentWeather from './components/CurrentWeather'
import HistoricalWeather from './components/HistoricalWeather'
import MarineWeather from './components/MarineWeather'
import './App.css'

const API_KEY = '8739ea5047bccff7e65185624f890b91'
const BASE_URL = 'http://api.weatherstack.com'

function App() {
  const [activeTab, setActiveTab] = useState('current')
  const [location, setLocation] = useState('Bengaluru')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeatherData = async (query, endpoint = 'current') => {
    setLoading(true)
    setError(null)
    
    try {
      let url = `${BASE_URL}/${endpoint}?access_key=${API_KEY}&query=${encodeURIComponent(query)}`
      
      if (endpoint === 'historical') {
        const date = new Date()
        date.setDate(date.getDate() - 7) // 7 days ago
        const historicalDate = date.toISOString().split('T')[0]
        url += `&historical_date=${historicalDate}`
      }

      const response = await fetch(url)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.info || 'Failed to fetch weather data')
      }
      
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData(location, activeTab === 'historical' ? 'historical' : 'current')
  }, [location])

  const handleSearch = (newLocation) => {
    setLocation(newLocation)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'historical') {
      fetchWeatherData(location, 'historical')
    } else {
      fetchWeatherData(location, 'current')
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="error-container glass">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => fetchWeatherData(location, activeTab === 'historical' ? 'historical' : 'current')}>
            Try Again
          </button>
        </div>
      )
    }

    switch (activeTab) {
      case 'current':
        return <CurrentWeather data={weatherData} />
      case 'historical':
        return <HistoricalWeather data={weatherData} />
      case 'marine':
        return <MarineWeather location={location} />
      default:
        return <CurrentWeather data={weatherData} />
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header glass">
          <h1>Weather App</h1>
          <SearchBar onSearch={handleSearch} defaultValue={location} />
        </header>
        
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App