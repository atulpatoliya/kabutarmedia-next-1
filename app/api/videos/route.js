import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 12;
        const category = searchParams.get("category");
        const sort = searchParams.get("sort") || "recent"; // recent or views

        const skip = (page - 1) * limit;

        const query = {
            status: "published",
            "video_embed.url": { $exists: true, $ne: null }
        };

        if (category) query.category = category;

        const sortObj = sort === "views" ? { views: -1 } : { published_at: -1 };

        const videos = await Post.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .select("title slug banner video_embed category published_at views");

        const total = await Post.countDocuments(query);

        return NextResponse.json({
            videos,
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
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}
