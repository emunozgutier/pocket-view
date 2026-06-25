import './AddressHistory.css';
import { useSimulatorStore } from '../stores/useSimulatorStore';

interface AddressHistoryProps {
  inputValue: string;
  onSelect: (url: string) => void;
  isVisible: boolean;
}

export default function AddressHistory({
  inputValue,
  onSelect,
  isVisible,
}: AddressHistoryProps) {
  const history = useSimulatorStore((state) => state.history);

  if (!isVisible || !history || history.length === 0) return null;

  // Filter history based on input (matches full URL or hostname)
  const query = inputValue.trim().toLowerCase();
  const filtered = query
    ? history.filter(
        (url) =>
          url.toLowerCase().includes(query) &&
          url.toLowerCase() !== query
      )
    : history; // If empty input, show all recent 5

  if (filtered.length === 0) return null;

  const formatDisplay = (urlStr: string) => {
    try {
      const parsed = new URL(urlStr);
      return {
        host: parsed.hostname,
        path: parsed.pathname === '/' ? '' : parsed.pathname,
        protocol: parsed.protocol,
      };
    } catch (e) {
      return {
        host: urlStr.replace(/^(https?:\/\/)?(www\.)?/, ''),
        path: '',
        protocol: 'https:',
      };
    }
  };

  return (
    <div className="address-history-dropdown">
      <div className="dropdown-header">
        <span>Recent Sites</span>
      </div>
      <ul className="dropdown-list">
        {filtered.map((url, idx) => {
          const { host, path } = formatDisplay(url);
          return (
            <li key={`${url}-${idx}`} className="dropdown-item">
              <button
                className="dropdown-item-btn"
                onClick={() => onSelect(url)}
                type="button"
              >
                <span className="item-icon">🌐</span>
                <div className="item-details">
                  <span className="item-host">{host}</span>
                  {path && <span className="item-path">{path}</span>}
                </div>
                <span className="item-action-hint">Fill ↵</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
