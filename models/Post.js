import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            trim: true,
            index: true,
        },
        short_description: {
            type: String,
            maxlength: [250, "Short description cannot be more than 250 characters"],
        },
        content: {
            type: String, // HTML or JSON from rich text editor
            required: [true, "Content is required"],
        },
        banner: {
            type: String, // Image URL
        },
        gallery: [String], // Array of image URLs
        category: {
            type: String,
            required: [true, "Category is required"],
            index: true,
        },
        tags: [String],
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            name: String,
            avatar: String,
        },
        status: {
            type: String,
            enum: ["draft", "scheduled", "published"],
            default: "draft",
            index: true,
        },
        published_at: {
            type: Date,
            index: true,
        },
        scheduled_at: {
            type: Date,
        },
        views: {
            type: Number,
            default: 0,
        },
        is_featured: {
            type: Boolean,
            default: false,
        },
        is_breaking: {
            type: Boolean,
            default: false,
        },
        breaking_priority: {
            type: Number,
            default: 5, // 1-high..5-low
        },
        breaking_start: Date,
        breaking_end: Date,
        read_time: {
            type: Number,
            default: 0,
        },
        seo: {
            meta_title: String,
            meta_description: String,
            og_image: String,
            canonical: String,
        },
        video_embed: {
            type: {
                type: String,
                enum: ["youtube", "vimeo"],
            },
            url: String,
            duration: String,
        },
    },
    {
        timestamps: true, // created_at, updated_at
    }
);

// Add text index for search
PostSchema.index({ title: "text", short_description: "text", content: "text" });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
