

async function createAdmin() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Admin',
                email: 'admin@kabutarmedia.com',
                password: 'admin123'
            })
        });
        const data = await response.json();
        console.log(JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}

createAdmin();
