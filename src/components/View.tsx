import { useRef, useState, useEffect } from 'react';
import ViewBrowser from './ViewBrowser';
import './View.css';
import { useSimulatorStore } from '../stores/useSimulatorStore';

export default function View() {
  const url = useSimulatorStore((state) => state.url);
  const selectedDevice = useSimulatorStore((state) => state.selectedDevice);
  const isLandscape = useSimulatorStore((state) => state.isLandscape);
  const scale = useSimulatorStore((state) => state.scale);
  const showFrame = useSimulatorStore((state) => state.showFrame);
  const canvasTheme = useSimulatorStore((state) => state.canvasTheme);
  const refreshKey = useSimulatorStore((state) => state.refreshKey);
  const simulateBrowser = useSimulatorStore((state) => state.simulateBrowser);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  // Calculate dynamic scale for 'fit' mode
  useEffect(() => {
    const updateScale = () => {
      if (!canvasRef.current) return;
      
      const padX = showFrame ? 64 : 20;
      const padY = showFrame ? 100 : 20;

      const containerW = canvasRef.current.clientWidth - padX;
      const containerH = canvasRef.current.clientHeight - padY;

      if (containerW <= 0 || containerH <= 0) return;

      const devW = isLandscape ? selectedDevice.height : selectedDevice.width;
      const devH = isLandscape ? selectedDevice.width : selectedDevice.height;

      const bezelOffset = showFrame ? 24 : 0;
      const totalDevW = devW + bezelOffset;
      const totalDevH = devH + bezelOffset;

      const scaleX = containerW / totalDevW;
      const scaleY = containerH / totalDevH;

      // Fit inside container but don't upscale past 100%
      const newScale = Math.min(scaleX, scaleY, 1);
      setFitScale(newScale);
    };

    updateScale();

    // Watch for window resizes
    const observer = new ResizeObserver(updateScale);
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [scale, selectedDevice, isLandscape, showFrame]);

  // Determine active scale value
  const activeScale = scale === 'fit' ? fitScale : scale;

  // Determine iframe / screen dimensions
  const screenW = isLandscape ? selectedDevice.height : selectedDevice.width;
  const screenH = isLandscape ? selectedDevice.width : selectedDevice.height;

  // Wrapper dimensions (adds bezel border to wrapper if frame is shown)
  const bezelOffset = showFrame ? 24 : 0;
  const wrapperW = screenW + bezelOffset;
  const wrapperH = screenH + bezelOffset;

  // Format bezel/frame styling classes
  const frameClasses = [
    'phone-mockup-frame',
    showFrame ? 'with-bezel' : 'borderless',
    isLandscape ? 'landscape-mode' : 'portrait-mode',
    `bezel-${selectedDevice.bezel}`,
  ].join(' ');

  return (
    <div className={`viewport-canvas-container canvas-theme-${canvasTheme}`} ref={canvasRef}>
      
      {/* Zoom / Info Overlay Badge */}
      <div className="canvas-zoom-badge">
        <span>{selectedDevice.name}</span>
        <span className="divider">•</span>
        <span>{screenW} × {screenH} pt</span>
        <span className="divider">•</span>
        <span>Zoom: {Math.round(activeScale * 100)}%</span>
      </div>

      {/* Scrollable Container for Device mockup */}
      <div className="viewport-canvas-scrollable">
        <div
          className="device-scroll-outer"
          style={{
            width: `${wrapperW * activeScale}px`,
            height: `${wrapperH * activeScale}px`,
          }}
        >
          {/* Simulator Device Wrapper (applies scaling) */}
          <div
            className="device-scale-wrapper"
            style={{
              transform: `scale(${activeScale})`,
              width: `${wrapperW}px`,
              height: `${wrapperH}px`,
            }}
          >
        <div className={frameClasses}>
          {/* Bezel details (Speaker, Notch, Island, Bezel shine) */}
          {showFrame && (
            <>
              <div className="screen-bezel-ring"></div>
              
              {/* Notch for standard devices */}
              {selectedDevice.bezel === 'notch' && (
                <div className="phone-notch">
                  <div className="camera-lens"></div>
                  <div className="speaker-earpiece"></div>
                </div>
              )}

              {/* Dynamic Island for newer models */}
              {selectedDevice.bezel === 'dynamic-island' && (
                <div className="phone-dynamic-island">
                  <div className="island-lens"></div>
                  <div className="island-sensor"></div>
                </div>
              )}
              
              {/* Simulated iOS Status Bar */}
              <div className="iphone-status-bar">
                <div className="time-indicator">9:41</div>
                <div className="status-icons">
                  <svg className="status-icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.13 19.58 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                  <svg className="status-icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M2 22h20V2z" />
                  </svg>
                  <svg className="status-icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-1 11H4V8h12v8zm5-7v6a1 1 0 0 0 1 1h1V8h-1a1 1 0 0 0-1 1z"/>
                  </svg>
                </div>
              </div>

              {/* Home Swipe Indicator at the bottom */}
              <div className="iphone-home-indicator"></div>
            </>
          )}

          {/* Device Screen Body */}
          <div className="phone-screen-viewport">
            {simulateBrowser ? (
              <ViewBrowser />
            ) : (
              // Standard full-screen viewport (like a native app or direct webapp view)
              <iframe
                key={refreshKey}
                src={url}
                className="simulated-iframe"
                title="Mock iPhone Viewport"
                sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-popups"
              />
            )}
          </div>
        </div>
      </div>
        </div>
      </div>
      
      {/* Alert modal or helper text for custom URLs */}
      <div className="cors-help-overlay">
        <p>
          💡 <strong>Pro-Tip:</strong> Some websites (e.g. google.com, github.com) restrict framing via <code>X-Frame-Options</code> headers. Use local addresses (e.g. <code>localhost:5173</code>) or public mock pages.
        </p>
      </div>
    </div>
  );
}
