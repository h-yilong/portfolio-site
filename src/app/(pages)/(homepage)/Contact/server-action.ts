"use server";
import "server-only";

import { schema, type ContactFormData } from "./rules-schema";
import prismaClient from "@/lib/prismaClient";
import { ZodError } from "zod";

export type Response = {
  status: "success" | "error";
  message: string;
};

export async function createContactRequest(formData: ContactFormData): Promise<Response> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3_000));
    // if (Math.random() < 1) {
    //   throw new Error("Intentional fake unexpected error."); // Will be caught by error.ts
    // }
    const { name, email, message } = await schema.parseAsync(formData);
    const res = await prismaClient.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });
    if (res.id) {
      return {
        status: "success",
        message: "Message sent successfully.",
      };
    }
    return {
      status: "error",
      message: "Error submitting contact form. Please try again.",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data. Please check your inputs and try again.",
      };
    }
    console.error("\nError submitting contact form:", error, "\n");
    return {
      status: "error",
      message: "Error submitting contact form. Please try again.",
    };
  }
}
