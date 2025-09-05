"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            /*const res =
                await fetch("http://localhost:9090/login",
                    {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });*/

            const res = await fetch(
                "https://backend-checklist-system-manufactur.vercel.app/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!res.ok) {
                setError("❌ Login gagal. Periksa username/password.");

                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);

            router.push("/checklist"); // redirect ke halaman checklist
        } catch (err) {
            console.error(err);
            console.log("error : " + err);
            setError("⚠️ Server error, coba lagi.");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto"
            >
                <h1 className="text-xl font-bold mb-4 text-center text-blue-600">
                    Login
                </h1>
                <h6 className="mb-4 text-center text-gray-500">
                    mohon login terlebih dahulu
                </h6>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </main>
    );
}
