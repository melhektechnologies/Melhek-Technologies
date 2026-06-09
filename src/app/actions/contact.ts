"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  division: z.string().min(1, "Select a division"),
  message: z.string().min(10, "Please share a bit more detail (10+ characters)"),
});

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    division: formData.get("division"),
    message: formData.get("message"),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  try {
    // 1. Save to a local flat-file JSON database (submissions.json)
    const filePath = path.join(process.cwd(), "submissions.json");
    let currentSubmissions = [];
    
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      currentSubmissions = JSON.parse(fileContent);
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    const newSubmission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: parsed.data.name,
      email: parsed.data.email,
      division: parsed.data.division,
      message: parsed.data.message,
    };

    currentSubmissions.push(newSubmission);
    await fs.writeFile(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");

    // 2. Optional: Forward to a webhook (Discord, Slack, Zapier, etc.) if configured in .env
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Melhek Contact Notifier",
            embeds: [
              {
                title: "📬 New Contact Inquiry",
                color: 8366591, // #7FA9FF (Melhek Blue)
                fields: [
                  { name: "Name", value: parsed.data.name, inline: true },
                  { name: "Email", value: parsed.data.email, inline: true },
                  { name: "Division / Subject", value: parsed.data.division, inline: true },
                  { name: "Message", value: parsed.data.message },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook forwarding failed:", webhookErr);
      }
    }
  } catch (err) {
    console.error("Submission processing failed:", err);
    return { error: "Transmission failed. Please try again or email us directly." };
  }

  return { success: true };
}
