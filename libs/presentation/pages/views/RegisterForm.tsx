"use client";

import {useRouter} from "next/navigation";
import {FormEvent, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";

export default function RegisterForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await httpJson<{ success: boolean }>("/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });

            // login immediately after register (optional) - for demo we redirect to login
            if (!res.success) {
                setError("Registration failed");
                return;
            }
            router.push("/login");
        } catch (err: unknown) {
            console.error(err);
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    required
                />
                <p className="mt-1 text-xs text-slate-600">Minimum 8 characters.</p>
            </div>
            {error &&
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <button
                disabled={loading}
                className="w-full rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create account"}
            </button>
        </form>
    );
}
