import { z } from "zod";
import type { ContactMessage } from "@prisma/client";

// Database constraints from Prisma schema
const DB_CONSTRAINTS = {
  name: { maxLength: 32 },
  email: { maxLength: 128 },
  message: { maxLength: 300 },
} as const;

type DatabaseType = Pick<
  {
    [K in keyof ContactMessage]: z.ZodType<ContactMessage[K]>;
  },
  "name" | "email" | "message"
>;

// type DatabaseType = {
//   name: z.ZodType<ContactMessage["name"]>;
//   email: z.ZodType<ContactMessage["email"]>;
//   message: z.ZodType<ContactMessage["message"]>;
// };

export const rules = {
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(DB_CONSTRAINTS.name.maxLength, `Name must be less than ${DB_CONSTRAINTS.name.maxLength} characters`)
    .trim(),
  email: z
    .email("Please enter a valid email address")
    .max(DB_CONSTRAINTS.email.maxLength, `Email must be less than ${DB_CONSTRAINTS.email.maxLength} characters`)
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .min(20, "Message must be at least 20 characters long")
    .max(DB_CONSTRAINTS.message.maxLength, `Message must be less than ${DB_CONSTRAINTS.message.maxLength} characters`)
    .trim(),
} satisfies DatabaseType;

export const schema = z.object(rules);

export type ContactFormData = z.infer<typeof schema>;
