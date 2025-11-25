import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const category = searchParams.get("category");
        const exclude = searchParams.get("exclude");
        const limit = parseInt(searchParams.get("limit")) || 4;

        const query = {
            status: "published",
            category: category
        };

        if (exclude) {
            query._id = { $ne: exclude };
        }

        const related = await Post.find(query)
            .sort({ published_at: -1 })
            .limit(limit)
            .select("title slug banner short_description category published_at views");

        return NextResponse.json(related);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch related posts" },
            { status: 500 }
        );
    }
}
