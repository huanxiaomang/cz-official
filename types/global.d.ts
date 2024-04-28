
declare global{



}
declare type Writable<T> = {
  -readonly [K in keyof T]: T[K];
}

// keyof any == string | number | symbol
declare type Recordable<T = any> = Record<keyof any, T>;
declare type Nullable<T> = T | null;
