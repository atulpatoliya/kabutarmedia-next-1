import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // TODO: Send email using your preferred service (Sendgrid, Mailgun, etc.)
        // For now, just log it
        console.log("Contact form submission:", { name, email, subject, message });

        // You can integrate email sending here
        // await sendEmail({ to: process.env.CONTACT_EMAIL, ...body });

        return NextResponse.json(
            { message: "Thank you for contacting us. We will get back to you soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
