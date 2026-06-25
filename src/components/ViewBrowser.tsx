import './ViewBrowser.css';

const formatDisplayUrl = (urlStr: string) => {
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname;
  } catch (e) {
    return urlStr.replace(/^(https?:\/\/)?(www\.)?/, '');
  }
};

interface ViewBrowserProps {
  url: string;
  refreshKey: number;
  onRefresh: () => void;
}

export default function ViewBrowser({
  url,
  refreshKey,
  onRefresh,
}: ViewBrowserProps) {
  return (
    <div className="simulated-mobile-browser">
      {/* Simulated Top Address Bar */}
      <div className="browser-mobile-top-bar">
        <div className="browser-mobile-url-box">
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
        <button className="browser-mobile-nav-btn" disabled type="button">◀</button>
        <button className="browser-mobile-nav-btn" disabled type="button">▶</button>
        <button className="browser-mobile-nav-btn" type="button">+</button>
        <button className="browser-mobile-tabs-btn" type="button">
          <div className="tabs-count-box">1</div>
        </button>
        <button className="browser-mobile-nav-btn" type="button">•••</button>
      </div>
    </div>
  );
}
