import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      companyDomain,
      service,
      description,
    } = body;

    if (!name || !email || !company || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      subject: `New Lead — ${name}`,
      html: `
        <h2>New Get Started Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Company Domain:</strong> ${companyDomain || "—"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Description:</strong></p>
        <p>${description || "—"}</p>
      `,
    });

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "We received your message — Decacorn Labs",
      html: `
        <p>Hi ${name},</p>

        <p>
          Thanks for reaching out to <strong>Decacorn Labs</strong>.
          We've received your message and someone from our team
          will review it shortly.
        </p>

        <p>
          You can expect a response within <strong>24 hours</strong>.
          If your request is urgent, feel free to reply directly
          to this email.
        </p>

        <p>
          — Decacorn Labs<br />
          <em>Building AI systems that think, guide, and execute</em>
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Get Started API error:", error);

    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}