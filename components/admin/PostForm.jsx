"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";

export default function PostForm({ initialData = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        short_description: "",
        content: "",
        category: "",
        tags: "",
        status: "draft",
        banner: "",
        is_breaking: false,
        breaking_priority: 5,
        seo: {
            meta_title: "",
            meta_description: "",
        },
        ...initialData,
    });

    // If initialData has tags array, join it for input
    useEffect(() => {
        if (initialData?.tags && Array.isArray(initialData.tags)) {
            setFormData((prev) => ({ ...prev, tags: initialData.tags.join(", ") }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("seo.")) {
            const seoField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                seo: { ...prev.seo, [seoField]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSlugGenerate = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        setFormData((prev) => ({ ...prev, slug }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
            };

            const url = initialData
                ? `/api/posts/${initialData._id}`
                : "/api/posts";
            const method = initialData ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save post");

            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error saving post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                onBlur={handleSlugGenerate}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full border p-2 rounded bg-gray-50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Short Description
                            </label>
                            <textarea
                                name="short_description"
                                value={formData.short_description}
                                onChange={handleChange}
                                className="w-full border p-2 rounded h-24"
                                maxLength={250}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">Content</h2>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(html) =>
                                setFormData((prev) => ({ ...prev, content: html }))
                            }
                        />
                    </div>

                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold mb-4">SEO</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="seo.meta_title"
                                value={formData.seo.meta_title}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Meta Description
                            </label>
                            <textarea
                                name="seo.meta_description"
                                value={formData.seo.meta_description}
                                onChange={handleChange}
                                className="w-full border p-2 rounded h-20"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Publish</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="scheduled">Scheduled</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Post"}
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Organization</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="india">India</option>
                                <option value="world">World</option>
                                <option value="politics">Politics</option>
                                <option value="business">Business</option>
                                <option value="sports">Sports</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                placeholder="news, breaking, update"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Media</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Banner Image URL
                            </label>
                            <input
                                type="text"
                                name="banner"
                                value={formData.banner}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Breaking News</h2>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_breaking"
                                checked={formData.is_breaking}
                                onChange={handleChange}
                                id="is_breaking"
                            />
                            <label htmlFor="is_breaking">Mark as Breaking</label>
                        </div>
                        {formData.is_breaking && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Priority (1-High, 5-Low)
                                </label>
                                <input
                                    type="number"
                                    name="breaking_priority"
                                    value={formData.breaking_priority}
                                    onChange={handleChange}
                                    min="1"
                                    max="5"
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
