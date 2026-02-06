export const safeJSONParse = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return fallback;
  }
};

export const safeJSONStringify = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const getRecentlyViewed = (): number[] => {
  return safeJSONParse<number[]>("recently_viewed", []);
};

export const addToRecentlyViewed = (id: number): void => {
  const viewed = getRecentlyViewed();

  const newViewed = [id, ...viewed.filter((vid) => vid !== id)].slice(0, 4);
  safeJSONStringify("recently_viewed", newViewed);
};
