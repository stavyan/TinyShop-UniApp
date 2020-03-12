import ls from "./ls";
const ss = window.sessionStorage;
export default {
  getItem(key) {
    try {
      return JSON.parse(ss.getItem(key));
    } catch (err) {
      return null;
    }
  },
  setItem(key, val) {
    ss.setItem(key, JSON.stringify(val));
  },
  clear() {
    ss.clear();
  },
  keys() {
    return ls.keys();
  },
  removeItem(key) {
    ss.removeItem(key);
  }
};
