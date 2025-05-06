"use server";
import "server-only";

import { schema, type ContactFormData } from "./rules-schema";
import prismaClient from "@/lib/prismaClient";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string;
};

export async function createContactRequest(formData: ContactFormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (Math.random() < 0) {
    throw new Error("Intentional fake unexpected error."); // Will be caught by error.ts
  }

  try {
    const { name, email, message } = await schema.parseAsync(formData);
    await prismaClient.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });
    return "success";
  } catch (error) {
    console.error("\nError submitting contact form:", error, "\n");
    return "error";
  }
}
