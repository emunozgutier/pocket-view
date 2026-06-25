import React, { useState, useEffect } from 'react';
import './Address.css';
import { useSimulatorStore } from '../stores/useSimulatorStore';
import AddressHistory from './AddressHistory';

export default function Address() {
  const url = useSimulatorStore((state) => state.url);
  const onChangeUrl = useSimulatorStore((state) => state.setUrl);
  const onRefresh = useSimulatorStore((state) => state.triggerRefresh);
  const history = useSimulatorStore((state) => state.history);
  const addToHistory = useSimulatorStore((state) => state.addToHistory);

  const [inputValue, setInputValue] = useState(url);
  const [isFocused, setIsFocused] = useState(false);

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
    if (formattedUrl) {
      onChangeUrl(formattedUrl);
      addToHistory(formattedUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prevValue = inputValue;
    setInputValue(value);

    // Auto-complete / inline guessing if typing forward
    if (value.length > prevValue.length && history && history.length > 0) {
      const cleanVal = value.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
      if (cleanVal.length > 1) {
        const match = history.find((item) => {
          const cleanItem = item.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
          return cleanItem.startsWith(cleanVal) && cleanItem !== cleanVal;
        });

        if (match) {
          const cleanMatch = match.replace(/^(https?:\/\/)?(www\.)?/, '');
          const suffix = cleanMatch.slice(cleanVal.length);
          const completedText = value + suffix;

          setInputValue(completedText);

          // Select the guessed suffix
          setTimeout(() => {
            const inputEl = document.querySelector('.url-input') as HTMLInputElement;
            if (inputEl) {
              inputEl.setSelectionRange(value.length, completedText.length);
            }
          }, 0);
        }
      }
    }
  };

  const handleSelectSuggestion = (suggestedUrl: string) => {
    setInputValue(suggestedUrl);
    onChangeUrl(suggestedUrl);
    addToHistory(suggestedUrl);
    setIsFocused(false);
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
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Enter website URL (e.g. wikipedia.org)"
          />
          {inputValue !== url && (
            <button className="go-btn" type="submit">
              Go
            </button>
          )}
          
          <AddressHistory
            inputValue={inputValue}
            onSelect={handleSelectSuggestion}
            isVisible={isFocused}
          />
        </div>
      </form>

      <div className="quick-actions">
        <button 
          className="demo-toggle-btn active"
          onClick={() => {
            onChangeUrl('https://en.m.wikipedia.org/');
            addToHistory('https://en.m.wikipedia.org/');
          }}
          title="Point simulator to Wikipedia"
          type="button"
        >
          📖 Wikipedia
        </button>
      </div>
    </div>
  );
}
