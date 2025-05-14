export class FetchError {
    status: number;

    // eslint-disable-next-line
    response: any = undefined;

    // eslint-disable-next-line
    constructor({ status, response }: { status: number; response: any }) {
        this.status = status;
        this.response = response;
    }
}

export const isFetchError = (error: unknown): error is FetchError =>
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'res' in error;
