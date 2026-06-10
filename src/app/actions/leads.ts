"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Schema for project estimator submissions
const EstimateLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  complexity: z.string().min(1, "Complexity is required"),
  features: z.string().transform(val => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }),
  budgetRange: z.string().min(1, "Budget range is required"),
  timelineRange: z.string().min(1, "Timeline range is required"),
  message: z.string().optional(),
});

// Schema for chatbot qualified leads
const AssistantLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  projectDescription: z.string().min(5, "Project description is too short"),
});

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

// Submits estimate calculation details + customer contact info
export async function submitEstimateLead(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    projectType: formData.get("projectType"),
    complexity: formData.get("complexity"),
    features: formData.get("features") || "[]",
    budgetRange: formData.get("budgetRange"),
    timelineRange: formData.get("timelineRange"),
    message: formData.get("message"),
  };

  const parsed = EstimateLeadSchema.safeParse(raw);
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
    const filePath = path.join(process.cwd(), "submissions.json");
    let currentSubmissions = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      currentSubmissions = JSON.parse(fileContent);
    } catch (err) {
      // Ignore if file doesn't exist
    }

    const newSubmission = {
      id: Date.now().toString(),
      type: "estimator_lead",
      timestamp: new Date().toISOString(),
      ...parsed.data,
    };

    currentSubmissions.push(newSubmission);
    await fs.writeFile(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");

    // Forward to Webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const featuresList = (parsed.data.features as string[]).join(", ") || "None";
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Melhek Estimator Notifier",
            embeds: [
              {
                title: "📋 New Project Estimate Lead",
                color: 8366591, // #7FA9FF (Melhek Blue)
                fields: [
                  { name: "Client Name", value: parsed.data.name, inline: true },
                  { name: "Email", value: parsed.data.email, inline: true },
                  { name: "Company", value: parsed.data.company || "N/A", inline: true },
                  { name: "Phone", value: parsed.data.phone || "N/A", inline: true },
                  { name: "Project Type", value: parsed.data.projectType, inline: true },
                  { name: "Complexity", value: parsed.data.complexity, inline: true },
                  { name: "Selected Features", value: featuresList },
                  { name: "Calculated Budget", value: parsed.data.budgetRange, inline: true },
                  { name: "Calculated Timeline", value: parsed.data.timelineRange, inline: true },
                  { name: "Message / Specifications", value: parsed.data.message || "None specified" },
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
    console.error("Lead submission processing failed:", err);
    return { error: "Failed to record estimate. Please try again." };
  }

  return { success: true };
}

// Submits a qualified lead captured by the chatbot conversation
export async function submitAssistantLead(data: {
  name: string;
  email: string;
  projectDescription: string;
}): Promise<ActionState> {
  const parsed = AssistantLeadSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid intake details provided." };
  }

  try {
    const filePath = path.join(process.cwd(), "submissions.json");
    let currentSubmissions = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      currentSubmissions = JSON.parse(fileContent);
    } catch (err) {
      // Ignore if file doesn't exist
    }

    const newSubmission = {
      id: Date.now().toString(),
      type: "chatbot_lead",
      timestamp: new Date().toISOString(),
      ...parsed.data,
    };

    currentSubmissions.push(newSubmission);
    await fs.writeFile(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");

    // Forward to Webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Melhek Chatbot Notifier",
            embeds: [
              {
                title: "🤖 New Chatbot Qualified Lead",
                color: 16755200, // Orange-ish gold glow
                fields: [
                  { name: "Prospect Name", value: parsed.data.name, inline: true },
                  { name: "Email", value: parsed.data.email, inline: true },
                  { name: "System Requirements / Goals", value: parsed.data.projectDescription },
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
    console.error("Chatbot lead processing failed:", err);
    return { error: "Connection error. Lead not recorded." };
  }

  return { success: true };
}
