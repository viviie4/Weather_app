import React from 'react'
import './TabNavigation.css'

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'current', label: 'Current Weather', icon: '☀️' },
    { id: 'historical', label: 'Historical', icon: '📊' },
    { id: 'marine', label: 'Marine Weather', icon: '🌊' }
  ]

  return (
    <nav className="tab-navigation glass">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default TabNavigation