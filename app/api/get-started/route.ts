import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔐 Simple in-memory rate limiter
const rateLimitMap = new Map<
  string,
  { count: number; timestamp: number }
>();

export async function POST(req: Request) {
  try {
    /* ──────────────────────────────────────────────
       🔹 RATE LIMITING (5 req per minute per IP)
    ────────────────────────────────────────────── */
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const windowSize = 60 * 1000; // 1 minute
    const maxRequests = 5;

    const record = rateLimitMap.get(ip);

    if (record) {
      if (now - record.timestamp < windowSize) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            { error: "Too many requests. Try again later." },
            { status: 429 }
          );
        }
        record.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    /* ──────────────────────────────────────────────
       🔹 PARSE BODY
    ────────────────────────────────────────────── */
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

    /* ──────────────────────────────────────────────
       🔹 BASIC VALIDATION
    ────────────────────────────────────────────── */
    if (!name || !email || !company || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ──────────────────────────────────────────────
       🔹 DUPLICATE PROTECTION (24 HOURS)
    ────────────────────────────────────────────── */
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: existingLead, error: fetchError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .gte("created_at", twentyFourHoursAgo)
      .limit(1);

    if (fetchError) {
      console.error("Duplicate check error:", fetchError);
    }

    if (existingLead && existingLead.length > 0) {
      return NextResponse.json(
        { error: "You have already submitted a request recently." },
        { status: 429 }
      );
    }

    /* ──────────────────────────────────────────────
       🔹 STORE IN SUPABASE
    ────────────────────────────────────────────── */
    const { error: insertError } = await supabase.from("leads").insert([
      {
        name,
        email,
        phone,
        company,
        company_domain: companyDomain,
        service,
        description,
      },
    ]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to store lead" },
        { status: 500 }
      );
    }

    /* ──────────────────────────────────────────────
       🔹 SEND CONFIRMATION EMAIL
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
            We’ve received your request and our team is reviewing
            the details you shared.
          </p>

          <p>
            You can expect a response within <strong>24 hours</strong>.
          </p>

          <br />

          <p>
            Best regards,<br />
            <strong>Decacorn Labs</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
