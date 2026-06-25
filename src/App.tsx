import { useState, useCallback } from 'react';
import Address from './components/Address';
import SettingsSideBar, { DEVICES } from './components/SettingsSideBar';
import type { DeviceConfig } from './components/SettingsSideBar';
import View from './components/View';

function App() {
  const [url, setUrl] = useState<string>('https://en.m.wikipedia.org/');
  const [selectedDevice, setSelectedDevice] = useState<DeviceConfig>(DEVICES[0]);
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [scale, setScale] = useState<number | 'fit'>('fit');
  const [showFrame, setShowFrame] = useState<boolean>(true);
  const [canvasTheme, setCanvasTheme] = useState<'dark' | 'light' | 'blueprint'>('blueprint');
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [simulateBrowser, setSimulateBrowser] = useState<boolean>(true);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleToggleOrientation = useCallback(() => {
    setIsLandscape(prev => !prev);
  }, []);

  const handleToggleFrame = useCallback(() => {
    setShowFrame(prev => !prev);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Top Navigation / Address Bar */}
      <header className="app-top-header">
        <div className="brand-section">
          <span className="brand-icon">📱</span>
          <span className="brand-name">Pocket View</span>
        </div>
        
        <Address 
          url={url} 
          onChangeUrl={setUrl} 
          onRefresh={handleRefresh} 
        />

        <div className="header-right">
          <button 
            className="icon-action-btn"
            onClick={handleRefresh}
            title="Reload viewport frame"
            type="button"
          >
            🔄 Hard Reload
          </button>
        </div>
      </header>

      {/* Main Panel Split */}
      <div className="app-main-layout">
        <SettingsSideBar
          selectedDevice={selectedDevice}
          onSelectDevice={setSelectedDevice}
          isLandscape={isLandscape}
          onToggleOrientation={handleToggleOrientation}
          scale={scale}
          onChangeScale={setScale}
          showFrame={showFrame}
          onToggleFrame={handleToggleFrame}
          canvasTheme={canvasTheme}
          onChangeCanvasTheme={setCanvasTheme}
          simulateBrowser={simulateBrowser}
          onToggleSimulateBrowser={() => setSimulateBrowser(prev => !prev)}
        />

        <View
          url={url}
          selectedDevice={selectedDevice}
          isLandscape={isLandscape}
          scale={scale}
          showFrame={showFrame}
          canvasTheme={canvasTheme}
          refreshKey={refreshKey}
          simulateBrowser={simulateBrowser}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}

export default App;
