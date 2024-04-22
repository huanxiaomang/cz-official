// import type {
//   AxiosRequestConfig,
//   AxiosInstance,
//   AxiosResponse,
//   AxiosError,
//   InternalAxiosRequestConfig,
// } from 'axios';
// import type { RequestOptions, Result, UploadFileParams } from '#/axios';
// import type { CreateAxiosOptions } from './axiosTransform';
// import axios from 'axios';
// import qs from 'qs';
// import { AxiosCanceler } from './axiosCancel';
// import { isFunction } from '@/utils/is';
// import { cloneDeep } from 'lodash-es';
// import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';

// export * from './axiosTransform';
// export class CAxios{
//   private axiosInstance: AxiosInstance;
//   private readonly options: CreateAxiosOptions;

//   constructor(options: CreateAxiosOptions) {
//     this.options = options;
//     this.axiosInstance = axios.create(options);
//     this.setupInterceptors();
//   }

//   private createAxios(config: CreateAxiosOptions): void{
//     this.axiosInstance = axios.create(config);
//   }

//   private setupInterceptors() {
//     const {
//       axiosInstance,
//       options: { transform }
//     } = this;
//     if (!transform) return;

//     const {
//       requestInterceptors,
//       requestInterceptorsCatch,
//       responseInterceptors,
//       responseInterceptorsCatch
//     } = transform;

//     const axiosCanceler = new AxiosCanceler();

//     this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//       const requestOptions = config.requestOptions ?? this.options.requestOptions;
//     })
//   }
// }
