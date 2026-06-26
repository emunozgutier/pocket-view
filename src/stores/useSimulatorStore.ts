import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  bezel: 'notch' | 'dynamic-island';
  diagonal: string;
  series: 'iPhone 14' | 'iPhone 15' | 'iPhone 16';
}

export const DEVICES: DeviceConfig[] = [
  // iPhone 16 Series
  { name: 'iPhone 16 Pro Max', width: 440, height: 956, bezel: 'dynamic-island', diagonal: '6.9"', series: 'iPhone 16' },
  { name: 'iPhone 16 Pro', width: 402, height: 874, bezel: 'dynamic-island', diagonal: '6.3"', series: 'iPhone 16' },
  { name: 'iPhone 16 Plus', width: 430, height: 932, bezel: 'dynamic-island', diagonal: '6.7"', series: 'iPhone 16' },
  { name: 'iPhone 16', width: 393, height: 852, bezel: 'dynamic-island', diagonal: '6.1"', series: 'iPhone 16' },
  
  // iPhone 15 Series
  { name: 'iPhone 15 Pro Max', width: 430, height: 932, bezel: 'dynamic-island', diagonal: '6.7"', series: 'iPhone 15' },
  { name: 'iPhone 15 Pro', width: 393, height: 852, bezel: 'dynamic-island', diagonal: '6.1"', series: 'iPhone 15' },
  { name: 'iPhone 15 Plus', width: 430, height: 932, bezel: 'dynamic-island', diagonal: '6.7"', series: 'iPhone 15' },
  { name: 'iPhone 15', width: 393, height: 852, bezel: 'dynamic-island', diagonal: '6.1"', series: 'iPhone 15' },
  
  // iPhone 14 Series
  { name: 'iPhone 14 Pro Max', width: 430, height: 932, bezel: 'dynamic-island', diagonal: '6.7"', series: 'iPhone 14' },
  { name: 'iPhone 14 Pro', width: 393, height: 852, bezel: 'dynamic-island', diagonal: '6.1"', series: 'iPhone 14' },
  { name: 'iPhone 14 Plus', width: 428, height: 926, bezel: 'notch', diagonal: '6.7"', series: 'iPhone 14' },
  { name: 'iPhone 14', width: 390, height: 844, bezel: 'notch', diagonal: '6.1"', series: 'iPhone 14' },
];

interface SimulatorState {
  url: string;
  selectedDevice: DeviceConfig;
  isLandscape: boolean;
  scale: number | 'fit';
  showFrame: boolean;
  canvasTheme: 'dark' | 'light' | 'blueprint';
  refreshKey: number;
  simulateBrowser: boolean;
  browserType: 'safari' | 'chrome' | 'firefox';
  history: string[];
  showSidebar: boolean;

  setUrl: (url: string) => void;
  setSelectedDevice: (device: DeviceConfig) => void;
  setIsLandscape: (isLandscape: boolean) => void;
  toggleOrientation: () => void;
  setScale: (scale: number | 'fit') => void;
  setShowFrame: (showFrame: boolean) => void;
  toggleFrame: () => void;
  setCanvasTheme: (theme: 'dark' | 'light' | 'blueprint') => void;
  setSimulateBrowser: (simulateBrowser: boolean) => void;
  toggleSimulateBrowser: () => void;
  setBrowserType: (browserType: 'safari' | 'chrome' | 'firefox') => void;
  addToHistory: (url: string) => void;
  triggerRefresh: () => void;
  setShowSidebar: (show: boolean) => void;
  toggleSidebar: () => void;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      url: 'https://en.m.wikipedia.org/',
      selectedDevice: DEVICES[0],
      isLandscape: false,
      scale: 'fit',
      showFrame: true,
      canvasTheme: 'blueprint',
      refreshKey: 0,
      simulateBrowser: true,
      browserType: 'safari',
      history: ['https://en.m.wikipedia.org/'],
      showSidebar: true,

      setUrl: (url) => set({ url }),
      setSelectedDevice: (selectedDevice) => set({ selectedDevice }),
      setIsLandscape: (isLandscape) => set({ isLandscape }),
      toggleOrientation: () => set((state) => ({ isLandscape: !state.isLandscape })),
      setScale: (scale) => set({ scale }),
      setShowFrame: (showFrame) => set({ showFrame }),
      toggleFrame: () => set((state) => ({ showFrame: !state.showFrame })),
      setCanvasTheme: (canvasTheme) => set({ canvasTheme }),
      setSimulateBrowser: (simulateBrowser) => set({ simulateBrowser }),
      toggleSimulateBrowser: () => set((state) => ({ simulateBrowser: !state.simulateBrowser })),
      setBrowserType: (browserType) => set({ browserType }),
      addToHistory: (url) => set((state) => {
        const trimmed = url.trim();
        if (!trimmed) return {};
        const filtered = state.history.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
        return { history: [trimmed, ...filtered].slice(0, 5) };
      }),
      triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
      setShowSidebar: (showSidebar) => set({ showSidebar }),
      toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
    }),
    {
      name: 'pocket-view-simulator-settings',
      partialize: (state) => ({
        url: state.url,
        selectedDevice: state.selectedDevice,
        isLandscape: state.isLandscape,
        scale: state.scale,
        showFrame: state.showFrame,
        canvasTheme: state.canvasTheme,
        simulateBrowser: state.simulateBrowser,
        browserType: state.browserType,
        history: state.history,
        showSidebar: state.showSidebar,
      }),
    }
  )
);



