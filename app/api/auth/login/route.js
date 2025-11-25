import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({ message: "Login success" });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
