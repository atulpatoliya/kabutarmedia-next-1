import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default function ProtectedLayout({ children }) {
    let token = null;

    try {
        token = cookies().get("token")?.value || null;
    } catch (e) {
        token = null;
    }

    if (!token) {
        redirect("/admin/login");
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        redirect("/admin/login");
    }

    return <>{children}</>;
}
