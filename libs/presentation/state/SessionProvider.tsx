"use client";

import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";

export type SessionUser = {
    id: string;
    email: string;
    createdAt: string;
};

type SessionState =
    | { status: "loading"; isLoggedIn: false; user: null }
    | { status: "authenticated"; isLoggedIn: true; user: SessionUser }
    | { status: "unauthenticated"; isLoggedIn: false; user: null };

type SessionContextValue = SessionState & {
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
    syncAfterLogin: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

async function fetchSession(): Promise<{ isLoggedIn: boolean; user: SessionUser | null }> {
    const res = await httpJson<{ isLoggedIn: boolean, user: SessionUser }>(`/api/auth/session`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    });

    if (!res) return {isLoggedIn: false, user: null};
    return res;
}

export function SessionProvider({children}: { children: React.ReactNode }) {
    const [state, setState] = useState<SessionState>({
        status: "loading",
        isLoggedIn: false,
        user: null,
    });

    const refresh = useCallback(async (opts?: { silent?: boolean }) => {
        if (!opts?.silent) {
            setState({status: "loading", isLoggedIn: false, user: null});
        }

        const session = await fetchSession();
        if (session.isLoggedIn && session.user) {
            setState({status: "authenticated", isLoggedIn: true, user: session.user});
        } else {
            setState({status: "unauthenticated", isLoggedIn: false, user: null});
        }
    }, []);

    const logout = useCallback(async () => {
        await httpJson<{ ok: boolean }>("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setState({status: "unauthenticated", isLoggedIn: false, user: null});
    }, []);

    // Call this after successful login/register
    const syncAfterLogin = useCallback(async () => {
        // Ensure we re-check cookies on server after the mutation
        await refresh({silent: true});
    }, [refresh]);

    useEffect(() => {
        // On first mount, just fetch once; initial state already "loading"
        async function refreshTrigger() {
            await refresh({silent: true});
        }

        refreshTrigger();
    }, [refresh]);

    const value = useMemo<SessionContextValue>(
        () => ({...state, refresh, logout, syncAfterLogin}),
        [state, refresh, logout, syncAfterLogin]
    );

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
    const ctx = useContext(SessionContext);
    if (!ctx) throw new Error("useSession must be used within SessionProvider");
    return ctx;
}
