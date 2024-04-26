import { AxiosError, AxiosInstance } from "axios";


export class AxiosRetry {

  retry(axiosInstance: AxiosInstance, error: AxiosError) {
    const { config } = error.response as any;
    const { waitTime, count } = config?.requestOptions?.retryRequest ?? {};
    config.__retryCount ??= 0;
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    delete config.headers;
    return this.delay(waitTime).then(() => axiosInstance(config));
  }

  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
