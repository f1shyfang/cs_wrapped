import { WrappedData, CustomStats, defaultCustomStats } from "@/types/stats";

const STORAGE_KEY = "cs_wrapped_data";

export function saveWrappedData(data: WrappedData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadWrappedData(): WrappedData | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearWrappedData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function saveCustomStats(stats: CustomStats): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("cs_wrapped_custom", JSON.stringify(stats));
  }
}

export function loadCustomStats(): CustomStats {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cs_wrapped_custom");
    if (stored) {
      try {
        return { ...defaultCustomStats, ...JSON.parse(stored) };
      } catch {
        return defaultCustomStats;
      }
    }
  }
  return defaultCustomStats;
}
