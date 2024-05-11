export class LS{
  constructor() {}

  // 获取本地存储
  get(key: string): string | null {
    const res = localStorage.getItem(key);
    return res && JSON.parse(res);
  }

  // 设置本地存储
  set(key: string, value: string|object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // 删除本地存储
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // 清空本地存储
  clear(): void {
    localStorage.clear();
  }

}

export const ls = new LS();
