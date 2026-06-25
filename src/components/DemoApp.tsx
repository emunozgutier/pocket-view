import React, { useState } from 'react';

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
}

const INITIAL_ACTIVITIES: Activity[] = [
  { id: 1, user: 'Sarah Connor', action: 'Subscription renewal', time: '2 mins ago', amount: '+$29.00', status: 'completed' },
  { id: 2, user: 'John Doe', action: 'In-app purchase', time: '12 mins ago', amount: '+$4.99', status: 'completed' },
  { id: 3, user: 'Marcus Wright', action: 'Account upgrade', time: '1 hour ago', amount: '+$99.00', status: 'completed' },
  { id: 4, user: 'Kyle Reese', action: 'Failed checkout', time: '2 hours ago', amount: '$0.00', status: 'failed' },
  { id: 5, user: 'Ellen Ripley', action: 'Refund request', time: '5 hours ago', amount: '-$59.00', status: 'pending' },
];

export default function DemoApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'analytics' | 'settings'>('home');
  const [appDarkMode, setAppDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedCount, setLikedCount] = useState(142);
  const [isLiked, setIsLiked] = useState(false);
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  const toggleLike = () => {
    if (isLiked) {
      setLikedCount(prev => prev - 1);
    } else {
      setLikedCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredActivities = activities.filter(act =>
    act.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`demo-app-root ${appDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* iOS App Header */}
      <header className="app-header">
        <div className="header-top">
          <div className="app-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Pulse</span>
          </div>
          <button className="theme-toggle" onClick={() => setAppDarkMode(!appDarkMode)} type="button">
            {appDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-content">
        {activeTab === 'home' && (
          <div className="tab-pane home-pane">
            <div className="welcome-banner">
              <h2>Welcome back, Edu!</h2>
              <p>Your workspace is running smoothly.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card revenue">
                <span className="stat-label">Revenue</span>
                <span className="stat-value">$14,248</span>
                <span className="stat-trend positive">↑ 12.4%</span>
              </div>
              <div className="stat-card users">
                <span className="stat-label">Active Users</span>
                <span className="stat-value">1,894</span>
                <span className="stat-trend positive">↑ 8.2%</span>
              </div>
            </div>

            {/* Interactive Section */}
            <div className="interactive-card">
              <h3>Community Growth</h3>
              <p>Show your support to boost our search index rating!</p>
              <div className="like-action-bar">
                <button className={`like-btn ${isLiked ? 'active' : ''}`} onClick={toggleLike} type="button">
                  {isLiked ? '❤️' : '🤍'} Like Pulse
                </button>
                <span className="like-counter">{likedCount} Supporters</span>
              </div>
            </div>

            {/* Search and Recent Activity */}
            <div className="activity-section">
              <div className="section-header">
                <h3>Recent Transactions</h3>
              </div>
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="app-search-input"
                />
              </div>
              <div className="activity-list">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map(act => (
                    <div key={act.id} className="activity-item">
                      <div className="act-info">
                        <span className="act-user">{act.user}</span>
                        <span className="act-action">{act.action} • {act.time}</span>
                      </div>
                      <div className="act-amount-status">
                        <span className="act-amount">{act.amount}</span>
                        <span className={`status-badge ${act.status}`}>{act.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-state">No transactions found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-pane analytics-pane">
            <h2>Analytics Overview</h2>
            <p className="subtitle">Real-time engagement trends</p>

            {/* Custom SVG Line Chart */}
            <div className="chart-container">
              <div className="chart-header">
                <div>
                  <span className="chart-legend-label">Weekly Operations</span>
                  <span className="chart-legend-value">4.8k ops/sec</span>
                </div>
                <span className="chart-legend-trend positive">+24%</span>
              </div>
              <div className="svg-chart-wrapper">
                <svg viewBox="0 0 300 120" className="analytics-chart">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--app-accent)" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="var(--app-accent)" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="300" y2="30" stroke="var(--app-chart-grid)" strokeDasharray="3,3" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="var(--app-chart-grid)" strokeDasharray="3,3" />
                  <line x1="0" y1="90" x2="300" y2="90" stroke="var(--app-chart-grid)" strokeDasharray="3,3" />
                  
                  {/* Area fill */}
                  <path
                    d="M 0 100 Q 40 80 80 50 T 160 30 T 240 70 T 300 20 L 300 120 L 0 120 Z"
                    fill="url(#chartGrad)"
                  />
                  {/* Curvy Line */}
                  <path
                    d="M 0 100 Q 40 80 80 50 T 160 30 T 240 70 T 300 20"
                    fill="none"
                    stroke="var(--app-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Dot pointers */}
                  <circle cx="160" cy="30" r="5" fill="var(--app-accent)" stroke="var(--app-bg)" strokeWidth="2" />
                  <circle cx="300" cy="20" r="5" fill="var(--app-accent)" stroke="var(--app-bg)" strokeWidth="2" />
                </svg>
              </div>
              <div className="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="metrics-list">
              <div className="metric-row">
                <span className="metric-name">Load Time</span>
                <span className="metric-val">1.2s <span className="m-good">Fast</span></span>
              </div>
              <div className="metric-row">
                <span className="metric-name">Server Ping</span>
                <span className="metric-val">24ms <span className="m-good">Excellent</span></span>
              </div>
              <div className="metric-row">
                <span className="metric-name">Error Rate</span>
                <span className="metric-val">0.02% <span className="m-good">Healthy</span></span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-pane settings-pane">
            <h2>Preferences</h2>
            <p className="subtitle">Customize your simulator dashboard</p>

            <div className="settings-group">
              <div className="settings-item">
                <div className="item-label">
                  <h4>Developer Mode</h4>
                  <p>Enable inspecting element models</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="settings-item">
                <div className="item-label">
                  <h4>Push Notifications</h4>
                  <p>Receive live metrics updates</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="settings-item">
                <div className="item-label">
                  <h4>Mock Cellular Latency</h4>
                  <p>Simulate 3G/4G bandwidth constraints</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="app-author-card">
              <div className="author-avatar">🧑‍💻</div>
              <div className="author-info">
                <h4>Antigravity Studio</h4>
                <p>Designed for web developers.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* iOS App Navigation TabBar */}
      <nav className="app-tabbar">
        <button
          className={`tabbar-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
          type="button"
        >
          <span className="tab-icon">🏠</span>
          <span className="tab-text">Home</span>
        </button>
        <button
          className={`tabbar-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
          type="button"
        >
          <span className="tab-icon">📈</span>
          <span className="tab-text">Metrics</span>
        </button>
        <button
          className={`tabbar-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
          type="button"
        >
          <span className="tab-icon">⚙️</span>
          <span className="tab-text">Settings</span>
        </button>
      </nav>
    </div>
  );
}
