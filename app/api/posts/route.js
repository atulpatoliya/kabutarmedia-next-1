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
        const status = searchParams.get("status") || "published";
        const tag = searchParams.get("tag");
        const search = searchParams.get("q");
        const sort = searchParams.get("sort") || "recent"; // recent, views, featured
        const featured = searchParams.get("featured") === "true";

        const query = { status };

        if (category) query.category = category;
        if (tag) query.tags = tag;
        if (featured) query.is_featured = true;
        if (search) {
            query.$text = { $search: search };
        }

        const skip = (page - 1) * limit;

        let sortObj = { published_at: -1 };
        if (sort === "views") sortObj = { views: -1 };
        if (sort === "featured") sortObj = { is_featured: -1, published_at: -1 };
        if (search) sortObj = { score: { $meta: "textScore" } };

        const posts = await Post.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .select("title slug banner short_description category published_at views author.name read_time is_featured is_breaking");

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
        console.error(error);
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
