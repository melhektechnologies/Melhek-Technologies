export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface TestimonialResponse {
  data: Testimonial[] | null;
  error: string | null;
}
