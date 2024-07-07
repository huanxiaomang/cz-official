// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV:string;//定义提示信息 数据是只读的无法被修改
  readonly VITE_PUBLIC_PATH:string;
  readonly VITE_GLOB_API_URL: string;
  readonly VITE_GLOB_UPLOAD_URL: string;
  readonly VITE_GLOB_API_URL_PREFIX: string;
  readonly VITE_GLOB_APP_TITLE: string;

}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
