import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import type { RequestOptions, Result, UploadFileParams } from '#/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { cloneDeep, isFunction } from 'lodash-es';
import { ContentTypeEnum, RequestEnum } from './httpEnum';

export * from './axiosTransform';
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    return this.options.transform;
  }

  public getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  public configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) return;
    this.createAxios(config);
  }

  public setHeader(headers: any): void {
    if (!this.axiosInstance) return;

    const { headers: oldHeaders } = this.axiosInstance.defaults;
    this.axiosInstance.defaults.headers = {
      ...oldHeaders,
      ...headers
    }
  }

  private setupInterceptors() {
    const {
      axiosInstance,
      options: { transform }
    } = this;
    if (!transform) return;

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const requestOptions = (config as any).requestOptions ?? this.options.requestOptions;
      const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true;

      !ignoreCancelToken && axiosCanceler.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch,
      );

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(axiosInstance, error);
      });
  }

  public uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    // TODO: uploadFile
  }

  public supportFormData(config: AxiosRequestConfig) {
    // TODO: supportFormData
    const headers = config.headers || this.options.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, "data") ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" }),
    };
  }

  public get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  public post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }

  public put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "PUT" }, options);
  }

  public delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "DELETE" }, options);
  }


  public request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {

    let conf: CreateAxiosOptions = cloneDeep(config);

    if (config.cancelToken) conf.cancelToken = config.cancelToken;
    if (config.signal) conf.signal = config.signal;

    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = {
      ...requestOptions,
      ...options
    }

    const { beforeRequestHook, requestCatchHook, transformResponseHook } =  transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf.requestOptions = opt;
    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }

          if (axios.isAxiosError(e)) {

          }

          reject(e);
        })
    })

  }

}
