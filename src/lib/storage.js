// Safe localStorage wrapper. Returns fallbacks instead of throwing
// (private browsing, quota exceeded, or malformed JSON).

export const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore — storage is best-effort.
  }
};
