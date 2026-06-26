import './SettingsSideBar.css';
import { useSimulatorStore, DEVICES } from '../stores/useSimulatorStore';

export default function SettingsSideBar() {
  const selectedDevice = useSimulatorStore((state) => state.selectedDevice);
  const onSelectDevice = useSimulatorStore((state) => state.setSelectedDevice);
  const isLandscape = useSimulatorStore((state) => state.isLandscape);
  const onToggleOrientation = useSimulatorStore((state) => state.toggleOrientation);
  const scale = useSimulatorStore((state) => state.scale);
  const onChangeScale = useSimulatorStore((state) => state.setScale);
  const showFrame = useSimulatorStore((state) => state.showFrame);
  const onToggleFrame = useSimulatorStore((state) => state.toggleFrame);
  const canvasTheme = useSimulatorStore((state) => state.canvasTheme);
  const onChangeCanvasTheme = useSimulatorStore((state) => state.setCanvasTheme);
  const simulateBrowser = useSimulatorStore((state) => state.simulateBrowser);
  const onToggleSimulateBrowser = useSimulatorStore((state) => state.toggleSimulateBrowser);
  const browserType = useSimulatorStore((state) => state.browserType);
  const onChangeBrowserType = useSimulatorStore((state) => state.setBrowserType);
  // Helper to extract device model version (e.g. Pro Max, Pro, Plus, Standard)
  const getVersionLabel = (name: string, series: string): string => {
    if (name === series) return 'Standard';
    return name.replace(series + ' ', '');
  };

  const seriesList = Array.from(new Set(DEVICES.map(d => d.series)));

  return (
    <aside className="settings-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Simulator Control</span>
        <span className="sidebar-subtitle">Configure Viewport Settings</span>
      </div>

      <div className="sidebar-section">
        <h3>Orientation</h3>
        <div className="orientation-toggle-group">
          <button
            className={`orientation-btn ${!isLandscape ? 'active' : ''}`}
            onClick={() => isLandscape && onToggleOrientation()}
            title="Portrait mode"
            type="button"
          >
            <span className="btn-icon">📱</span>
            Portrait
          </button>
          <button
            className={`orientation-btn ${isLandscape ? 'active' : ''}`}
            onClick={() => !isLandscape && onToggleOrientation()}
            title="Landscape mode"
            type="button"
          >
            <span className="btn-icon rotated">📱</span>
            Landscape
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Zoom / Scaling</h3>
        <div className="scale-button-grid">
          {(['fit', 0.5, 0.75, 1.0] as const).map((sc) => (
            <button
              key={sc}
              className={`scale-btn ${scale === sc ? 'active' : ''}`}
              onClick={() => onChangeScale(sc)}
              type="button"
            >
              {sc === 'fit' ? 'Auto Fit' : `${Math.round(sc * 100)}%`}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Display Skins</h3>
        <div className="toggle-setting-row">
          <div className="setting-label">
            <h4>Device Frame</h4>
            <p>Bezels, notches, Dynamic Island</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={showFrame} onChange={onToggleFrame} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div className="setting-label">
            <h4>Simulate Browser</h4>
            <p>Mock address bar & bottom tabs</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={simulateBrowser} onChange={onToggleSimulateBrowser} />
            <span className="slider"></span>
          </label>
        </div>

        {simulateBrowser && (
          <div className="browser-select-row animate-fade-in">
            <div className="setting-label">
              <h4>Browser Style</h4>
              <p>Simulate viewport dimensions</p>
            </div>
            <div className="browser-btn-group">
              {(['safari', 'chrome', 'firefox'] as const).map((b) => (
                <button
                  key={b}
                  className={`browser-btn ${browserType === b ? 'active' : ''}`}
                  onClick={() => onChangeBrowserType(b)}
                  type="button"
                >
                  {b === 'safari' ? 'Safari' : b === 'chrome' ? 'Chrome' : 'Firefox'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="theme-select-container">
          <h4>Canvas Environment</h4>
          <div className="theme-grid">
            {(['dark', 'light', 'blueprint'] as const).map((theme) => (
              <button
                key={theme}
                className={`theme-chip ${canvasTheme === theme ? 'active' : ''}`}
                onClick={() => onChangeCanvasTheme(theme)}
                type="button"
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-section devices-section">
        <h3>iPhone Viewports</h3>
        
        <div className="device-selectors">
          <div className="select-wrapper">
            <label htmlFor="device-gen-select">Generation</label>
            <select
              id="device-gen-select"
              value={selectedDevice.series}
              onChange={(e) => {
                const newSeries = e.target.value as typeof selectedDevice.series;
                const currentVersion = getVersionLabel(selectedDevice.name, selectedDevice.series);
                
                // Find matching version in the new series
                const match = DEVICES.find(
                  d => d.series === newSeries && getVersionLabel(d.name, d.series) === currentVersion
                );
                
                if (match) {
                  onSelectDevice(match);
                } else {
                  const fallback = DEVICES.find(d => d.series === newSeries);
                  if (fallback) onSelectDevice(fallback);
                }
              }}
              className="device-select"
            >
              {seriesList.map((series) => (
                <option key={series} value={series}>
                  {series} Series
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <label htmlFor="device-version-select">Model Version</label>
            <select
              id="device-version-select"
              value={getVersionLabel(selectedDevice.name, selectedDevice.series)}
              onChange={(e) => {
                const newVersion = e.target.value;
                const match = DEVICES.find(
                  d => d.series === selectedDevice.series && getVersionLabel(d.name, d.series) === newVersion
                );
                if (match) {
                  onSelectDevice(match);
                }
              }}
              className="device-select"
            >
              {DEVICES.filter(d => d.series === selectedDevice.series).map((d) => {
                const version = getVersionLabel(d.name, d.series);
                return (
                  <option key={d.name} value={version}>
                    {version}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="selected-device-details animate-fade-in" key={selectedDevice.name}>
          <div className="details-header">
            <span className="details-title">{selectedDevice.name}</span>
            <span className="details-badge">
              {selectedDevice.bezel === 'notch' ? 'Notch' : 'Dynamic Island'}
            </span>
          </div>
          <div className="details-body">
            <div className="detail-item">
              <span className="detail-label">Diagonal</span>
              <span className="detail-value">{selectedDevice.diagonal}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Resolution</span>
              <span className="detail-value">
                {isLandscape ? selectedDevice.height : selectedDevice.width} × {isLandscape ? selectedDevice.width : selectedDevice.height} pt
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
