import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const q = searchParams.get("q");
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;

        if (!q || q.trim().length === 0) {
            return NextResponse.json(
                { error: "Search query required" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * limit;

        const query = {
            status: "published",
            $text: { $search: q }
        };

        const results = await Post.find(query, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .skip(skip)
            .limit(limit)
            .select("title slug banner short_description category published_at views");

        const total = await Post.countDocuments(query);

        return NextResponse.json({
            results,
            query: q,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Search failed" },
            { status: 500 }
        );
    }
}
