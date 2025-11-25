"use client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setMsg(data.message);

        if (res.ok) {
            window.location.href = "/admin/dashboard";
        }
    };

    return (
        <div style={{ padding: 40, maxWidth: 400, margin: "80px auto" }}>
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    className="border p-2 w-full mb-3"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white p-2 w-full">Login</button>

                <p className="mt-3 text-red-500">{msg}</p>
            </form>
        </div>
    );
}
