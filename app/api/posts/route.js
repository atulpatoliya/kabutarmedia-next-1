import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const category = searchParams.get("category");
        const status = searchParams.get("status");
        const tag = searchParams.get("tag");
        const search = searchParams.get("q");

        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (tag) query.tags = tag;
        if (search) {
            query.$text = { $search: search };
        }

        const skip = (page - 1) * limit;

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("author.id", "name avatar");

        const total = await Post.countDocuments(query);

        return NextResponse.json({
            posts,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        // Basic validation could go here, but Mongoose schema handles most

        const post = await Post.create(body);

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Create Post Error:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
