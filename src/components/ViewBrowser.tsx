import './ViewBrowser.css';
import { useSimulatorStore } from '../stores/useSimulatorStore';

const formatDisplayUrl = (urlStr: string) => {
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname;
  } catch (e) {
    return urlStr.replace(/^(https?:\/\/)?(www\.)?/, '');
  }
};

export default function ViewBrowser() {
  const url = useSimulatorStore((state) => state.url);
  const refreshKey = useSimulatorStore((state) => state.refreshKey);
  const onRefresh = useSimulatorStore((state) => state.triggerRefresh);
  const browserType = useSimulatorStore((state) => state.browserType);

  return (
    <div className={`simulated-mobile-browser browser-type-${browserType}`}>
      {/* Simulated Top Address Bar */}
      <div className="browser-mobile-top-bar">
        <div className="browser-mobile-url-box">
          {browserType === 'firefox' && <span className="browser-mobile-shield-icon">🛡️</span>}
          <span className="browser-mobile-lock-icon">🔒</span>
          <span className="browser-mobile-url-text">
            {formatDisplayUrl(url)}
          </span>
          <button 
            className="browser-mobile-reload-btn" 
            onClick={onRefresh}
            title="Reload"
            type="button"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Browser Viewport Area (the website frame) */}
      <div className="browser-mobile-content">
        <iframe
          key={refreshKey}
          src={url}
          className="simulated-iframe"
          title="Mock iPhone Viewport"
          sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-popups"
        />
      </div>

      {/* Simulated Bottom Navigation/Tabs Bar */}
      <div className="browser-mobile-bottom-bar">
        {browserType === 'safari' && (
          <>
            <button className="browser-mobile-nav-btn" disabled title="Back" type="button">◀</button>
            <button className="browser-mobile-nav-btn" disabled title="Forward" type="button">▶</button>
            <button className="browser-mobile-nav-btn" title="Share" type="button">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
            <button className="browser-mobile-nav-btn" title="Bookmarks" type="button">📖</button>
            <button className="browser-mobile-tabs-btn" title="Tabs" type="button">
              <div className="tabs-count-box">1</div>
            </button>
          </>
        )}

        {browserType === 'chrome' && (
          <>
            <button className="browser-mobile-nav-btn" disabled title="Back" type="button">←</button>
            <button className="browser-mobile-nav-btn" disabled title="Forward" type="button">→</button>
            <button className="browser-mobile-nav-btn" title="Home" type="button">🏠</button>
            <button className="browser-mobile-tabs-btn" title="Tabs" type="button">
              <div className="tabs-count-box">1</div>
            </button>
            <button className="browser-mobile-nav-btn" title="Menu" type="button">•••</button>
          </>
        )}

        {browserType === 'firefox' && (
          <>
            <button className="browser-mobile-nav-btn" disabled title="Back" type="button">←</button>
            <button className="browser-mobile-nav-btn" disabled title="Forward" type="button">→</button>
            <button className="browser-mobile-tabs-btn" title="Tabs" type="button">
              <div className="tabs-count-box">1</div>
            </button>
            <button className="browser-mobile-nav-btn" title="Search" type="button">🔍</button>
            <button className="browser-mobile-nav-btn" title="Menu" type="button">☰</button>
          </>
        )}
      </div>
    </div>
  );
}


