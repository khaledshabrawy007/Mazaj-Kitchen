/**
 * storageService — Dependency Inversion (SOLID-D)
 * Abstracts localStorage so components & hooks depend on this
 * interface, not on the Web Storage API directly.
 * Swap this implementation (e.g., for IndexedDB or a real API)
 * without touching any other file.
 */
const storageService = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[storageService] Failed to persist:', key, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch { /* silent */ }
  },
};

export default storageService;
