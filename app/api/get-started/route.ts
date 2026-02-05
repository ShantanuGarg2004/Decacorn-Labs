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

    // Basic validation (keep backend strict, UI minimal)
    if (!name || !email || !company || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ──────────────────────────────────────────────
       INTERNAL EMAIL (ADMIN / TEAM)
    ────────────────────────────────────────────── */
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      subject: `New Get Started Request — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h2 style="margin-bottom: 6px;">New Get Started Submission</h2>
          <p style="margin-top: 0; color: #555;">
            A new request has been submitted via the website.
          </p>

          <hr style="margin: 24px 0;" />

          <h3 style="margin-bottom: 8px;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "—"}</p>

          <hr style="margin: 24px 0;" />

          <h3 style="margin-bottom: 8px;">Company & Project</h3>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Industry:</strong> ${companyDomain || "—"}</p>
          <p><strong>Project Type:</strong> ${service}</p>

          <hr style="margin: 24px 0;" />

          <h3 style="margin-bottom: 8px;">Project Description</h3>
          <p style="white-space: pre-line; color: #333;">
            ${description || "—"}
          </p>
        </div>
      `,
    });

    /* ──────────────────────────────────────────────
       USER CONFIRMATION EMAIL
    ────────────────────────────────────────────── */
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "We received your request — Decacorn Labs",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <p>Hi ${name},</p>

          <p>
            Thank you for reaching out to <strong>Decacorn Labs</strong>.
            We’ve received your request and our team is currently reviewing
            the details you shared.
          </p>

          <p>
            You can expect a response from us within
            <strong>24 hours</strong>.
          </p>

          <p>
            If your request is time-sensitive, feel free to reply directly
            to this email and we’ll prioritize accordingly.
          </p>

          <br />

          <p>
            Best regards,<br />
            <strong>Decacorn Labs</strong><br />
            <span style="color: #555;">
              Building AI systems that think, guide, and execute
            </span>
          </p>
        </div>
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
