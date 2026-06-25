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
  // Group devices by series
  const seriesGroups = {
    'iPhone 16': DEVICES.filter(d => d.series === 'iPhone 16'),
    'iPhone 15': DEVICES.filter(d => d.series === 'iPhone 15'),
    'iPhone 14': DEVICES.filter(d => d.series === 'iPhone 14'),
  };

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
        {Object.entries(seriesGroups).map(([series, list]) => (
          <div key={series} className="device-group-wrapper">
            <div className="device-group-header">{series} Series</div>
            <div className="device-list">
              {list.map(dev => {
                const isActive = selectedDevice.name === dev.name;
                const widthLabel = isLandscape ? dev.height : dev.width;
                const heightLabel = isLandscape ? dev.width : dev.height;

                return (
                  <button
                    key={dev.name}
                    className={`device-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectDevice(dev)}
                    type="button"
                  >
                    <div className="dev-meta">
                      <span className="dev-name">{dev.name}</span>
                      <span className="dev-diagonal">{dev.diagonal} • {dev.bezel === 'notch' ? 'Notch' : 'Island'}</span>
                    </div>
                    <span className="dev-resolution">
                      {widthLabel} × {heightLabel} pt
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
