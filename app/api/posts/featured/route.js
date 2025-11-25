import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const limit = parseInt(searchParams.get("limit")) || 4;

        const featured = await Post.find({
            status: "published",
            is_featured: true
        })
            .sort({ published_at: -1 })
            .limit(limit)
            .select("title slug banner short_description category published_at views author.name");

        return NextResponse.json(featured);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch featured posts" },
            { status: 500 }
        );
    }
}
