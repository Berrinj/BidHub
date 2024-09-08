/**
 * save the key and value pair to local storage
 * @param {string} key save key to local storage
 * @param {object} value save value data of the key to local storage
 */

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * load the value of the key from local storage
 * @param {string} key
 * @returns {object} value of the key from local storage
 */

export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

/**
 * removes the key from local storage
 * @param {string} key
 */

export function remove(key) {
  localStorage.removeItem(key);
}
