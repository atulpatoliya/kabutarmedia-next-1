import Link from "next/link";
import PostsTable from "@/components/admin/PostsTable";

async function getPosts(searchParams) {
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?${params.toString()}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    return res.json();
}

export default async function PostsPage({ searchParams }) {
    const sp = await searchParams;
    const { posts, pagination } = await getPosts(sp);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Posts Manager</h1>
                <Link
                    href="/admin/posts/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create New Post
                </Link>
            </div>

            <div className="bg-white rounded shadow p-4">
                <PostsTable posts={posts} pagination={pagination} />
            </div>
        </div>
    );
}
