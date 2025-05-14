import { FetchError } from './FetchError';

export interface CustomParams {
    [key: string]: number | string | boolean | undefined;
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
    params?: URLSearchParams | CustomParams;
    contentType?: string;
    body?: BodyInit;
    customUrl?: boolean;
}

/**
 * @about Utility to use fetch API more easily like Axios
 * @componentType utility
 */
export class FetchExtended {
    private base = '';
    private defaultOptions: FetchOptions | undefined;

    constructor(baseUrl?: string, options?: FetchOptions) {
        this.base = baseUrl ?? '';
        this.defaultOptions = options ?? undefined;
    }

    private fetchWork = async <T>(
        url: string,
        option: FetchOptions,
    ) => {
        const options: FetchOptions = {
            ...this.defaultOptions,
            ...option,
        };

        const {
            params,
            body,
            contentType,
            customUrl,
        } = options;

        let query = '';
        if (params) {
            if (params instanceof URLSearchParams) {
                query = `?${params.toString()}`;
            } else if (typeof params === 'object') {
                const map = new Map(Object.entries(params));
                const searchParams = new URLSearchParams();
                const keyArray = Array.from(map.keys());
                keyArray.forEach((k) => {
                    const value = params[k];
                    if (value !== null && value !== undefined) {
                        searchParams.set(k, String(params[k]));
                    }
                });
                query = `?${searchParams.toString()}`;
            }
        }

        let data = body;
        if (
            data &&
            !(data instanceof Blob) &&
            !(data instanceof FormData) &&
            !(data instanceof URLSearchParams) &&
            typeof data === 'object'
        ) {
            data = JSON.stringify(data);
        }

        let headers: HeadersInit = { ...options.headers };
        if (headers) {
            headers = {
                ...headers,
                'Content-Type': contentType || 'application/json',
            };
        }

        const res = await fetch(
            customUrl ? `${customUrl}${query}` : `${this.base}${url}${query}`,
            {
                ...options,
                body: data,
                headers: {
                    ...headers,
                },
            },
        );

        if (!res.ok) {
            throw new FetchError({ status: res.status, response: res });
        }

        return (await res.json()) as T;
    };

    public get = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'GET', ...options });

    public post = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'POST', ...options });

    public put = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'PUT', ...options });

    public delete = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'DELETE', ...options });

    public patch = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'PATCH', ...options });

    public options = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'OPTIONS', ...options });

    public head = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'HEAD', ...options });

    public trace = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'TRACE', ...options });

    public connect = async <T>(url: string, options?: FetchOptions) =>
        this.fetchWork<T>(url, { method: 'CONNECT', ...options });
}

export const fetchExtended = new FetchExtended();