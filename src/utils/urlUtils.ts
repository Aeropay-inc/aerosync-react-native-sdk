

export const constructUrl = (baseUrl: string, params: Record<string, string | number | boolean | undefined | null>): string => {
    let url = baseUrl;

    const queryParams = Object.keys(params)
        .filter((key) => params[key] !== undefined && params[key] !== null)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
        .join('&');

    if (queryParams) {
        url += (url.includes('?') ? '&' : '?') + queryParams;
    }

    return url;
};
