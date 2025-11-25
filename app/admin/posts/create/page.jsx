import PostForm from "@/components/admin/PostForm";

export default function CreatePostPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <PostForm />
        </div>
    );
}
