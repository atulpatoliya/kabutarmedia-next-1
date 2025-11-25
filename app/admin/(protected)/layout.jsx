// app/admin/(protected)/layout.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default function ProtectedLayout({ children }) {
    // Defensive: get token safely
    let token = null;
    try {
        const cookieObj = cookies().get("token");
        token = cookieObj ? cookieObj.value : null;
    } catch (e) {
        // If cookies() throws for some reason, treat as no-token
        token = null;
    }

    // redirect if no token
    if (!token) {
        redirect("/admin/login");
    }

    // verify token safely
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        // token invalid or verification failed -> redirect to login
        redirect("/admin/login");
    }

    // If we reached here, token exists and is valid
    return <div>{children}</div>;
}
