export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">Total Posts: 0</div>
                <div className="p-4 border rounded">Published: 0</div>
                <div className="p-4 border rounded">Drafts: 0</div>
            </div>
        </div>
    );
}
