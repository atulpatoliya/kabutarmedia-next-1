"use client";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="border p-4 rounded bg-white shadow">
                    <h2 className="text-xl font-semibold">Total Posts</h2>
                    <p className="text-3xl mt-2">0</p>
                </div>

                <div className="border p-4 rounded bg-white shadow">
                    <h2 className="text-xl font-semibold">Published Posts</h2>
                    <p className="text-3xl mt-2">0</p>
                </div>

                <div className="border p-4 rounded bg-white shadow">
                    <h2 className="text-xl font-semibold">Drafts</h2>
                    <p className="text-3xl mt-2">0</p>
                </div>

            </div>

            <p className="mt-6 text-gray-500">
                👋 Welcome, Atul! Your admin dashboard is successfully loaded.
            </p>
        </div>
    );
}
