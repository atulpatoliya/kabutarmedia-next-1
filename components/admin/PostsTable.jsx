"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PostsTable({ posts, pagination }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting post");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1"); // Reset to page 1
        router.push(`?${params.toString()}`);
    };

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded"
                    defaultValue={searchParams.get("q") || ""}
                    onChange={(e) => handleFilterChange("q", e.target.value)}
                />
                <select
                    className="border p-2 rounded"
                    value={searchParams.get("status") || ""}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                </select>
                <select
                    className="border p-2 rounded"
                    value={searchParams.get("category") || ""}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="india">India</option>
                    <option value="world">World</option>
                    <option value="politics">Politics</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="technology">Technology</option>
                    {/* Add more categories as needed */}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    No posts found.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{post.title}</td>
                                    <td className="p-3 capitalize">{post.category}</td>
                                    <td className="p-3">{post.author?.name || "Unknown"}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${post.status === "published"
                                                    ? "bg-green-100 text-green-800"
                                                    : post.status === "draft"
                                                        ? "bg-gray-100 text-gray-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={`/admin/posts/edit/${post._id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            disabled={loading}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={pagination.page <= 1}
                    onClick={() => handleFilterChange("page", pagination.page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.pages}
                </span>
                <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => handleFilterChange("page", pagination.page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
