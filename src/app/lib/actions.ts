"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const delay = (ms: number) => new Promise<never>((resolve) => setTimeout(resolve, ms));

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
  // Validate form using Zod
  const validatedFields = CreateContactRequest.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  console.log("validatedFields:", validatedFields);
  await delay(3000);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to send contact request.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, message } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  console.log("form validation success:", { name, email, message, date });

  // Insert data into the database
  try {
    // todo: logic of sending email here
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log("db insertion error:", error);
    return {
      message: "Database Error: Failed to send contact request.",
    };
  }

  return {
    errors: {},
    message: "Message sent successfully",
  };

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath("/#contact");
  redirect("/#contact");
}
