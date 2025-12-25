export async function httpJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<{
    res: T;
    status: number;
    ok: boolean;
}> {
    const res = await fetch(input, {
        ...init,
        headers: {
            "Accept": "application/json",
            ...(init?.headers ?? {})
        }
    });

    let body: unknown;
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        body = await res.json();
    } else {
        body = await res.text();
    }

    return {
        res: body as T,
        status: res.status,
        ok: res.ok
    };
}
