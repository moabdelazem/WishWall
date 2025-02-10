import { z } from "zod";

const countWords = (str) => str.trim().split(/\s+/).length;

export const createWishSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title cannot be empty")
      .refine((title) => countWords(title) <= 10, {
        message: "Title cannot exceed 10 words",
      }),
  }),
});
