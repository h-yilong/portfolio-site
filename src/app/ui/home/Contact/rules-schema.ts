import { z } from "zod";
import { ContactMessage } from "@prisma/client";

export const rules: Omit<
  {
    [K in keyof ContactMessage]: z.ZodType<ContactMessage[K]>;
  },
  "id" | "createdAt" | "updatedAt" | "status"
> = {
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().nonempty("Message must not be empty"),
};

export const schema = z.object(rules);

export type ContactFormData = z.infer<typeof schema>;
