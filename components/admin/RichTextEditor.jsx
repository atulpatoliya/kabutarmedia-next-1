"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b p-2 flex gap-2 flex-wrap bg-gray-50">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded ${editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 2 })
                        ? "bg-gray-300"
                        : "hover:bg-gray-200"
                    }`}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 3 })
                        ? "bg-gray-300"
                        : "hover:bg-gray-200"
                    }`}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded ${editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}
            >
                Bullet List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded ${editor.isActive("orderedList") ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}
            >
                Ordered List
            </button>
        </div>
    );
};

export default function RichTextEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose max-w-none focus:outline-none min-h-[200px] p-4",
            },
        },
    });

    return (
        <div className="border rounded overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
