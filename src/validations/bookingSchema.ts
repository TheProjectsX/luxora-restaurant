import { z } from "zod";

export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),

    email: z.string().email("Invalid email"),

    phone: z.string().min(10, "Phone is required"),

    guests: z.number().min(1, "At least 1 guest").max(6, "Max 6 guests"),

    date: z.date(),

    time: z.string().min(1, "Time is required"),
});
