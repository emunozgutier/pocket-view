import { create } from 'zustand';

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
  triggerRefresh: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  url: 'https://en.m.wikipedia.org/',
  selectedDevice: DEVICES[0],
  isLandscape: false,
  scale: 'fit',
  showFrame: true,
  canvasTheme: 'blueprint',
  refreshKey: 0,
  simulateBrowser: true,
  browserType: 'safari',

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
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));

