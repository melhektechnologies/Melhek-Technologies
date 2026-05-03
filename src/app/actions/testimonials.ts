"use server"

import { Testimonial } from "@/types/testimonial";

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    quote: "Melhek Technologies didn't just build us a website; they built us a digital command center. Their precision is unmatched.",
    author: "Samuel K.",
    role: "CEO, Luxury Hospitality Group"
  },
  {
    id: "t2",
    quote: "The stability and security of our new infrastructure have given us the confidence to scale globally. A true digital anchor.",
    author: "Elena R.",
    role: "Director of Ops, SecureNet"
  },
  {
    id: "t3",
    quote: "Working with Melhek feels like looking into the future of engineering. They are elite in every sense of the word.",
    author: "David O.",
    role: "Founder, AI Ventures"
  }
];

export async function getTestimonials(): Promise<{ data: Testimonial[] | null, error: string | null }> {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { data: TESTIMONIALS_DATA, error: null };
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return { data: null, error: "Unable to retrieve endorsements. Network synchronization error." };
  }
}
