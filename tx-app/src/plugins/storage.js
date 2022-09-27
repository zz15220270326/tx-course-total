class StoragePool {
  constructor({
    key,
    type,
    defaultValue,
  }) {
    if (typeof key !== 'string' || !key.length) {
      throw new Error('option "key" is required in storage pool');
    }
    /** @type {string} storageKey */
    this.key = key;
    /** @type {'localStorage'|'sessionStorage'} storageType */
    this.type = type || 'localStorage';
    /** @type {*} defaultValue */
    this.defaultValue = defaultValue || window[this.type].getItem(this.key) || [];
  }

  getItem() {
    const { key, type, defaultValue } = this;
    const jsonStr = window[type].getItem(key) || JSON.stringify(defaultValue);
  
    try {
      return JSON.parse(jsonStr);
    } catch(err) {
      return this.defaultValue;
    }
  }

  setItem(newValue) {
    const { type, key } = this;
    const jsonStr = JSON.stringify(newValue);

    window[type].setItem(key, jsonStr);
  }

  init() {
    const { defaultValue } = this;
    this.setItem(defaultValue);
  }

  clear() {
    const { type, key } = this;
    window[type].setItem(key, '[]');
  }
}

export default StoragePool;