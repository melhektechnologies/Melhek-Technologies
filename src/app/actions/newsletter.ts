'use server'

import { z } from 'zod'

const NewsletterSchema = z.object({
  email: z.string().email("Invalid engineering email address"),
})

export type NewsletterState = {
  success?: boolean
  error?: string
}

/**
 * Production-ready server action for newsletter subscriptions.
 * In a real-world scenario, this would integrate with Resend, Mailchimp, or a database.
 */
export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // Simulate network latency for UX feedback
  await new Promise(resolve => setTimeout(resolve, 1500))

  const email = formData.get('email')

  try {
    const validatedFields = NewsletterSchema.parse({ email })
    
    // TODO: Integrate with real CRM/DB here
    console.log(`Subscribing ${validatedFields.email} to Melhek Infrastructure Insights.`)

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message ?? "Invalid input." }
    }
    return { error: "Transmission failed. Please try again." }
  }
}
