"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// 1. Schema for Partner Applications
const PartnerApplicationSchema = z.object({
  agencyName: z.string().min(1, "Agency Name is required"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  website: z.string().optional(),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Valid email required"),
  services: z.string().min(1, "Core services description is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  currentClients: z.string().min(1, "Client volume/details is required"),
  industries: z.string().min(1, "Key target industries is required"),
  partnershipInterest: z.string().min(1, "Select partnership interest model"),
});

// 2. Schema for Client Opportunity Submissions
const PartnerOpportunitySchema = z.object({
  agencyName: z.string().min(1, "Agency Name is required"),
  clientName: z.string().min(1, "Client Name/Alias is required"),
  industry: z.string().min(1, "Target Industry is required"),
  budget: z.string().min(1, "Budget Range is required"),
  timeline: z.string().min(1, "Timeline Expectation is required"),
  description: z.string().min(5, "Project Scope Details are too short"),
});

export type PartnerActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

// Write submission data to local file and dispatch hook
async function saveSubmission(newSubmission: any) {
  const filePath = path.join(process.cwd(), "submissions.json");
  let currentSubmissions = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    currentSubmissions = JSON.parse(fileContent);
  } catch (err) {
    // Ignore and start fresh
  }

  currentSubmissions.push(newSubmission);
  await fs.writeFile(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");

  // Webhook dispatch
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const fields = Object.entries(newSubmission)
        .filter(([key]) => !["id", "timestamp", "type"].includes(key))
        .map(([key, val]) => ({
          name: key.replace(/([A-Z])/g, " $1").trim().toUpperCase(),
          value: typeof val === "string" ? val : JSON.stringify(val),
          inline: true,
        }));

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Melhek Partner Notifier",
          embeds: [
            {
              title: newSubmission.type === "partner_application" ? "🤝 New B2B Partnership Application" : "💼 New Client Opportunity Submission",
              color: 8366591, // #7FA9FF (Melhek Blue)
              fields: fields,
              timestamp: newSubmission.timestamp,
            },
          ],
        }),
      });
    } catch (webhookErr) {
      console.error("Webhook forwarding failed:", webhookErr);
    }
  }
}

// Action for submitting partnership applications
export async function submitPartnerApplication(
  _prev: PartnerActionState,
  formData: FormData
): Promise<PartnerActionState> {
  const raw = {
    agencyName: formData.get("agencyName"),
    contactPerson: formData.get("contactPerson"),
    website: formData.get("website"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    services: formData.get("services"),
    yearsInBusiness: formData.get("yearsInBusiness"),
    currentClients: formData.get("currentClients"),
    industries: formData.get("industries"),
    partnershipInterest: formData.get("partnershipInterest"),
  };

  const parsed = PartnerApplicationSchema.safeParse(raw);
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
    const newSubmission = {
      id: Date.now().toString(),
      type: "partner_application",
      timestamp: new Date().toISOString(),
      ...parsed.data,
    };
    await saveSubmission(newSubmission);
  } catch (err) {
    console.error("Partnership application save error:", err);
    return { error: "Transmission error. Please try again or email us directly." };
  }

  return { success: true };
}

// Action for submitting client opportunities
export async function submitPartnerOpportunity(
  _prev: PartnerActionState,
  formData: FormData
): Promise<PartnerActionState> {
  const raw = {
    agencyName: formData.get("agencyName"),
    clientName: formData.get("clientName"),
    industry: formData.get("industry"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    description: formData.get("description"),
  };

  const parsed = PartnerOpportunitySchema.safeParse(raw);
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
    const newSubmission = {
      id: Date.now().toString(),
      type: "partner_opportunity",
      timestamp: new Date().toISOString(),
      ...parsed.data,
    };
    await saveSubmission(newSubmission);
  } catch (err) {
    console.error("Client opportunity save error:", err);
    return { error: "Transmission error. Please try again or email us directly." };
  }

  return { success: true };
}
