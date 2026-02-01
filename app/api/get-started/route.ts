import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      service,
      description,
    } = body;

    if (!name || !email || !company || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "Decacorn Labs <no-reply@send.decacornlabs.com>",
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      replyTo: email,
      subject: "🚀 New Get Started Lead — Decacorn Labs",
      html: `
        <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6;">
          <h2>New Lead Submission</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Service:</strong> ${service}</p>

          <p><strong>Description:</strong></p>
          <p>${description || "N/A"}</p>

          <hr />
          <p style="font-size: 12px; color: #666;">
            Submitted via Decacorn Labs website
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: result.data?.id, // ✅ SAFE ACCESS
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
