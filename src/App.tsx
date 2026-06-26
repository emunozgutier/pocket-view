import './App.css';
import Address from './components/Address';
import SettingsSideBar from './components/SettingsSideBar';
import View from './components/View';
import { useSimulatorStore } from './stores/useSimulatorStore';

function App() {
  const triggerRefresh = useSimulatorStore(state => state.triggerRefresh);
  const showSidebar = useSimulatorStore(state => state.showSidebar);
  const toggleSidebar = useSimulatorStore(state => state.toggleSidebar);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Top Navigation / Address Bar */}
      <header className="app-top-header">
        <div className="brand-section">
          <span className="brand-icon">📱</span>
          <span className="brand-name">Pocket View</span>
        </div>
        
        <Address />

        <div className="header-right">
          <button 
            className={`icon-action-btn toggle-controls-btn ${showSidebar ? 'active' : ''}`}
            onClick={toggleSidebar}
            title={showSidebar ? "Hide settings sidebar" : "Show settings sidebar"}
            type="button"
          >
            ⚙️ {showSidebar ? 'Hide Controls' : 'Show Controls'}
          </button>
          
          <button 
            className="icon-action-btn"
            onClick={triggerRefresh}
            title="Reload viewport frame"
            type="button"
          >
            🔄 Hard Reload
          </button>
        </div>
      </header>

      {/* Main Panel Split */}
      <div className={`app-main-layout ${showSidebar ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <SettingsSideBar />
        <View />
      </div>
    </div>
  );
}

export default App;
