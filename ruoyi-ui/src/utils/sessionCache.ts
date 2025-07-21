class sessionCache
{
  storageKey: string;
  cache: Record<string, any> = {};

  constructor(storageKey = 'app_cache') {
    this.storageKey = storageKey;
    this.cache = this.loadCache();
  }

  // 加载缓存数据
  loadCache() {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // 保存缓存到sessionStorage
  saveCache() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.cache));
    return this.cache;
  }

  // 添加缓存项
  addItem(key: any, value: any, expiryMinutes = null) {
    this.purgeExpired();

    const existingIndex = this.cache.findIndex((item: any) => item.key === key);
    const expiry = expiryMinutes ? Date.now() + expiryMinutes * 60000 : null;

    const newItem = {
      key,
      value,
      expiry,
      createdAt: Date.now()
    };

    if (existingIndex !== -1) {
      this.cache[existingIndex] = newItem;
    } else {
      this.cache.push(newItem);
    }

    this.saveCache();
    return newItem;
  }

  // 获取缓存项
  getItem(key: any) {
    this.purgeExpired();
    const item = this.cache.find((item: any) => item.key === key);
    return item && (!item.expiry || item.expiry > Date.now()) ? item : null;
  }

  // 获取所有缓存项（包括过期项）
  getAllItems() {
    this.purgeExpired();
    return this.cache;
  }

  // 删除缓存项
  removeItem(key: any) {
    this.cache = this.cache.filter((item: any) => item.key !== key);
    this.saveCache();
    return true;
  }

  // 清除所有缓存
  clearAll() {
    this.cache = [];
    sessionStorage.removeItem(this.storageKey);
    return true;
  }

  // 清理过期项
  purgeExpired() {
    const now = Date.now();
    const originalLength = this.cache.length;

    this.cache = this.cache.filter((item: any) => {
      return !item.expiry || item.expiry > now;
    });

    if (this.cache.length !== originalLength) {
      this.saveCache();
    }

    return originalLength - this.cache.length;
  }

  // 获取缓存统计信息
  getStats() {
    const now = Date.now();
    let activeCount = 0;
    let expiredCount = 0;

    this.cache.forEach((item: any) => {
      if (item.expiry && item.expiry <= now) {
        expiredCount++;
      } else {
        activeCount++;
      }
    });

    return {
      total: this.cache.length,
      active: activeCount,
      expired: expiredCount
    };
  }
}


export default sessionCache;