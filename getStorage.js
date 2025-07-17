export default async function getStorage() {
  if (typeof localStorage !== 'undefined') {
    return {
      getItem: (key) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key, val) => localStorage.setItem(key, val),
      removeItem: (key) => localStorage.removeItem(key),
    };
  } else {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    return AsyncStorage;
  }
}
