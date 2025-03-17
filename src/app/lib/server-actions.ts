"use server";

// Server Actions are asynchronous functions that are executed on the server. They can be used
// in Server and Client Components to handle form submissions and data mutations in Next.js applications.
// A Server Action can be defined with the React "use server" directive.
// You can place the directive at the top of an async function to mark the function as a Server Action,
// or at the top of a separate file to mark all exports of that file as Server Actions.

import { redirect } from "next/navigation";
import { z } from "zod";

const CreateContactRequest = z.object({
  name: z.string(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(20, { message: "The message must be 20 or more characters long" }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string;
};

export async function createContactRequest(_prevState: State, formData: FormData): Promise<State> {
  if (Math.random() < 0) {
    throw new Error("Fake unexpected error."); // Will be caught by error.ts
  }

  // tips: formData will include additional "$ACTION_" properties.
  const { name, email, message } = Object.fromEntries(formData);
  // Validate form using Zod
  const validatedFields = CreateContactRequest.safeParse({
    // name: formData.get("name"),
    // email: formData.get("email"),
    // message: formData.get("message"),
    name,
    email,
    message,
  });

  console.log("validatedFields:", validatedFields);
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to send contact request.",
    };
  }

  // Prepare data for insertion into the database
  const date = new Date().toISOString().split("T")[0];

  console.log("form validation success:", { ...validatedFields.data, date });

  // Insert data into the database
  try {
    // todo: logic of sending email here
    return {
      errors: {},
      message: "implement email sending logic here",
    };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log("db insertion error:", error);
    return {
      message: "Database Error: Failed to send contact request.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath("/#contact");
  redirect("/#contact");
}
