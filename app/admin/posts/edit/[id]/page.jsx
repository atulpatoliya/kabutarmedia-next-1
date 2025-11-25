import PostForm from "@/components/admin/PostForm";

async function getPost(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function EditPostPage({ params }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return <div className="p-6">Post not found</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
            <PostForm initialData={post} />
        </div>
    );
}
