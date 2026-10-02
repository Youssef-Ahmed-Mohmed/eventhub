import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72),
});

export const eventSchema = z.object({
  title: z.string().trim().min(3).max(120),
  event_date: z
    .string()
    .refine(
      (value) => Number.isFinite(Date.parse(value)),
      "Enter a valid event date.",
    )
    .transform((value) => new Date(value).toISOString()),
  location: z.string().trim().min(2).max(200),
  description: z.string().trim().min(10).max(5000),
  category: z.string().trim().min(2).max(60),
  ticket_price: z.coerce.number().min(0).max(1000000),
  capacity: z.coerce.number().int().min(1).max(10000),
});

export const eventReviewSchema = z.object({
  id: z.uuid(),
  decision: z.enum(["approve", "reject"]),
});

export const eventDeleteSchema = z.object({ id: z.uuid() });
export const reservationSchema = z.object({
  eventId: z.uuid(),
  seatId: z.uuid(),
});
export const accountDeleteSchema = z.object({
  confirmation: z.literal("DELETE"),
});
