export class HttpError extends Error {
    constructor(
        message: string,
        public status: number,
        public body?: unknown
    ) {
        super(message);
        this.name = "HttpError";
    }
}

export async function httpJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        credentials: "include",
        ...init,
        headers: {
            "Accept": "application/json",
            ...(init?.headers ?? {})
        }
    });

    let body: unknown = undefined;
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        body = await res.json();
    } else {
        body = await res.text();
    }

    if (!res.ok) {
        throw new HttpError(`HTTP ${res.status}`, res.status, body);
    }

    return body as T;
}
