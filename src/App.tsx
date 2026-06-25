import './App.css';
import Address from './components/Address';
import SettingsSideBar from './components/SettingsSideBar';
import View from './components/View';
import { useSimulatorStore } from './stores/useSimulatorStore';

function App() {
  const triggerRefresh = useSimulatorStore(state => state.triggerRefresh);

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
      <div className="app-main-layout">
        <SettingsSideBar />
        <View />
      </div>
    </div>
  );
}

export default App;
