import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import EventEmitter from 'events'
// import jwt_decode from 'jwt-decode'

class AxiosServices {
  instance: AxiosInstance
  static isFetchingToken = false
  static eventController = new EventEmitter()
  constructor() {
    const instance = axios.create({
      baseURL: 'https://node.edupath.ftisu.vn/'
    })

    instance.interceptors.response.use(this.handleSuccess, this.handleError)
    instance.interceptors.request.use(async (config) => {
      // config.headers!.Authorization = 'Bearer ' + process.env.CRE_TOKEN;
      // config.headers!['Content-Type'] = 'application/json';
      // return config as any;
      return config
    }, this.handleError)
    axios.defaults.withCredentials = true
    this.instance = instance
    // this.instance.defaults.timeout = 20000
  }

  handleSuccess(response: any) {
    return response
  }
  handleError(error: any) {
    return Promise.reject(error)
  }
  get<T>(url: string, config?: AxiosRequestConfig<any> | undefined) {
    return this.instance.get<T>(url, config)
  }
  getImage(url: string) {
    return this.instance.get(url, { responseType: 'blob' })
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) {
    return this.instance.post<T>(url, data, config)
  }
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) {
    return this.instance.put<T>(url, data, config)
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig<any> | undefined) {
    return this.instance.delete<T>(url, config)
  }
}
export default AxiosServices
