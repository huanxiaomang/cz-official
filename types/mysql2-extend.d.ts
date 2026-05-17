import { Pool as OriginalPool } from 'mysql2/promise';

declare module 'mysql2/promise' {
  interface Pool {
    query<T>(sql: string, values?: any[]): Promise<[T, FieldPacket[]]>;
    execute<T>(sql: string, values?: any[]): Promise<[T, any]>;
  }
}