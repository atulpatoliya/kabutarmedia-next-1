import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        // check if admin already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const password_hash = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password_hash,
            role: "admin",
        });

        return NextResponse.json({ message: "Admin user created!" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
