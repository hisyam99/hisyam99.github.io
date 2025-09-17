export type TimeFormat = "12" | "24";

export interface AppSettings {
  timeFormat: TimeFormat;
}

const SETTINGS_KEY = "hisyam99-portfolio-settings";

const defaultSettings: AppSettings = {
  timeFormat: "24",
};

/**
 * Get settings from localStorage with fallback to defaults
 */
export function getSettings(): AppSettings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSettings, ...parsed };
    }
  } catch (error) {
    console.warn("Failed to parse settings from localStorage:", error);
  }

  return defaultSettings;
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn("Failed to save settings to localStorage:", error);
    return getSettings();
  }
}

/**
 * Get time format setting
 */
export function getTimeFormat(): TimeFormat {
  return getSettings().timeFormat;
}

/**
 * Set time format setting
 */
export function setTimeFormat(format: TimeFormat): void {
  saveSettings({ timeFormat: format });
}

/**
 * Toggle time format between 12 and 24 hour
 */
export function toggleTimeFormat(): TimeFormat {
  const current = getTimeFormat();
  const newFormat: TimeFormat = current === "12" ? "24" : "12";
  setTimeFormat(newFormat);
  return newFormat;
}
