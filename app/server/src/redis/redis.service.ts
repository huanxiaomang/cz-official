import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private client;
  private isConnected = false;
  private memoryStore = new Map<string, { value: string; expiry: number }>();

  constructor() {
    this.initRedis();
  }

  private async initRedis() {
    try {
      this.client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
      await this.client.connect();
      this.isConnected = true;
      this.logger.log('Redis连接成功');
    } catch (error) {
      this.logger.warn(`Redis连接失败，使用内存存储: ${error.message}`);
      this.isConnected = false;
    }
  }

  async set(key: string, value: string, ttl: number) {
    if (this.isConnected) {
      try {
        await this.client.set(key, value, { EX: ttl });
        return;
      } catch (error) {
        this.logger.warn(`Redis set失败，使用内存存储: ${error.message}`);
        this.isConnected = false;
      }
    }

    // 备用方案：使用内存存储
    const expiry = Date.now() + ttl * 1000;
    this.memoryStore.set(key, { value, expiry });
  }

  async get(key: string) {
    if (this.isConnected) {
      try {
        return await this.client.get(key);
      } catch (error) {
        this.logger.warn(`Redis get失败，使用内存存储: ${error.message}`);
        this.isConnected = false;
      }
    }

    // 备用方案：从内存存储获取
    const item = this.memoryStore.get(key);
    if (item) {
      if (Date.now() > item.expiry) {
        this.memoryStore.delete(key);
        return null;
      }
      return item.value;
    }
    return null;
  }

  async del(key: string) {
    if (this.isConnected) {
      try {
        await this.client.del(key);
        return;
      } catch (error) {
        this.logger.warn(`Redis del失败，使用内存存储: ${error.message}`);
        this.isConnected = false;
      }
    }

    // 备用方案：从内存存储删除
    this.memoryStore.delete(key);
  }
}
