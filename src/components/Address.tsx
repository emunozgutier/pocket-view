import React, { useState, useEffect } from 'react';
import './Address.css';
import { useSimulatorStore } from '../stores/useSimulatorStore';

export default function Address() {
  const url = useSimulatorStore((state) => state.url);
  const onChangeUrl = useSimulatorStore((state) => state.setUrl);
  const onRefresh = useSimulatorStore((state) => state.triggerRefresh);

  const [inputValue, setInputValue] = useState(url);

  // Sync state if url is modified from parent (e.g. settings or device switch)
  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedUrl = inputValue.trim();
    if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }
    onChangeUrl(formattedUrl);
  };

  return (
    <div className="address-bar-container">
      <div className="browser-navigation">
        <button 
          className="nav-btn" 
          title="Back" 
          disabled
          type="button"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>
        <button 
          className="nav-btn" 
          title="Forward" 
          disabled
          type="button"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
        <button 
          className="nav-btn" 
          onClick={onRefresh} 
          title="Reload Page"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </button>
      </div>

      <form className="url-form" onSubmit={handleSubmit}>
        <div className="url-input-wrapper">
          <span className="security-icon">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </span>
          <input
            type="text"
            className="url-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter website URL (e.g. wikipedia.org)"
          />
          {inputValue !== url && (
            <button className="go-btn" type="submit">
              Go
            </button>
          )}
        </div>
      </form>

      <div className="quick-actions">
        <button 
          className="demo-toggle-btn active"
          onClick={() => onChangeUrl('https://en.m.wikipedia.org/')}
          title="Point simulator to Wikipedia"
          type="button"
        >
          📖 Wikipedia
        </button>
      </div>
    </div>
  );
}
