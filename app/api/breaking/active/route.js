import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
    try {
        await connectDB();

        const now = new Date();

        const query = {
            status: "published",
            is_breaking: true,
            breaking_start: { $lte: now },
            $or: [
                { breaking_end: { $gte: now } },
                { breaking_end: null }
            ]
        };

        const breaking = await Post.find(query)
            .sort({ breaking_priority: 1, published_at: -1 })
            .select("title slug breaking_priority published_at");

        return NextResponse.json(breaking);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch breaking news" },
            { status: 500 }
        );
    }
}
