"use client";

import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            window.location.href = "/admin/dashboard";
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "80px auto" }}>
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white p-2 w-full">Login</button>

                <p className="text-red-500 mt-3">{message}</p>
            </form>
        </div>
    );
}
