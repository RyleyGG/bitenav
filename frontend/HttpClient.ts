import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '@env';

import { SuccessfulUserAuth } from './models/Auth'


class HttpClient {
    protected readonly instance: AxiosInstance;
    private authErrorCallback?: () => void;
    private getTokensCallback?: (token_name: string) => Promise<string>;
    private setTokensCallback?: (access_token: string, refresh_token: string) => Promise<boolean>;
    private isRefreshing: boolean = false;
    private failedQueue: {
        resolve: (value: any) => void;
        reject: (value: any) => void;
        config: AxiosRequestConfig;
        queueId: number;
    }[] = [];

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
        this._initializeRequestInterceptor();
        this._handleError = this._handleError.bind(this);
        this.refreshTokenAndRetryRequest = this.refreshTokenAndRetryRequest.bind(this);
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            async (config) => {
                let token = null;
                if (this.getTokensCallback) {
                    token = await this.getTokensCallback('access_token');
                }
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    };

    public setAuthErrorCallback(callback: () => void) {
        this.authErrorCallback = callback;
    }

    public setGetTokensCallback(callback: (token_name: string) => Promise<string>) {
        this.getTokensCallback = callback;
    }

    public setSetTokenCallback(callback: (access_token: string, refresh_token: string) => Promise<boolean>) {
        this.setTokensCallback = callback;
    }
    
    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected refreshTokenAndRetryRequest = async (): Promise<void> => {
        try {
            this.isRefreshing = true;
            if (!this.getTokensCallback || !this.setTokensCallback) {
                throw Error;
            }
            const refreshToken = await this.getTokensCallback('refresh_token');
            const requestOptions = {
                headers: { 'Content-Type': 'application/json' },
            };
            const refreshTokenResponse: SuccessfulUserAuth = await this.instance.post(
                `${API_URL}/auth/refresh`,
                {refresh_token: refreshToken},
                requestOptions);

            const tokensSet = await this.setTokensCallback(refreshTokenResponse.access_token, refreshTokenResponse.refresh_token);
    
            if (tokensSet) {
                for (const queueItem of this.failedQueue) {
                    try {
                        const newRequestConfig = {
                            ...queueItem.config,
                            headers: {
                                ...queueItem.config.headers,
                                'Authorization': `Bearer ${refreshTokenResponse.access_token}`,
                            },
                        };
        
                        const response = await axios.request(newRequestConfig);
                        queueItem.resolve(response);
                    } catch (error) {
                        console.error('Request failed:', error);
                        queueItem.reject(error);
                    }
                }
            }
        } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            this.failedQueue.forEach(queueItem => queueItem.reject('Refresh failed: ' + refreshError));
        }
        finally {
            this.isRefreshing = false;
            this.failedQueue = [];
        }
    }
    
    protected _handleError = async (error: AxiosError): Promise<any> => {
        if (error.response?.status === 401) {
            const retryOriginalRequest = new Promise((resolve, reject) => {
                this.failedQueue.push({ resolve, reject, config: error.config!, queueId: this.failedQueue.length });
            });
            if (!this.isRefreshing) {
                this.refreshTokenAndRetryRequest();
            }
            retryOriginalRequest.then((res) => {
            })
            .catch((err) => {
                this.authErrorCallback!();
            });

            
            return retryOriginalRequest;
        }
        return Promise.reject(error);
    };

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.get<T, R>(url, config);
    }

    public post<T, R = AxiosResponse<T>>(url: string, data?: object, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.post<T, R>(url, data, config);
    }

    public put<T, R = AxiosResponse<T>>(url: string, data?: object, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.put<T, R>(url, data, config);
    }

    public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.delete<T, R>(url, config);
    }
}
const httpClient = new HttpClient(API_URL);

export default httpClient;
