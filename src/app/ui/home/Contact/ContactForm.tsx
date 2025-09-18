"use client";

// * https://ui.shadcn.com/docs/components/form
// * https://ui.shadcn.com/examples/forms
// * https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/forms/profile-form.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputFormField from "@/components/InputFormField";
import TextareaFormField from "@/components/TextareaFormField";
import { createContactRequest } from "./server-action";
import { type ContactFormData, schema } from "./rules-schema";
import { toast } from "sonner";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    // mode: "onTouched",
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    // formState: { errors },
  } = form;

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitting(true);
      const res = await createContactRequest(data);

      if (res.status === "success") {
        reset();
        toast.success(res.message || "Message sent successfully.");
        return;
      }
      toast.error(res.message || "Error submitting contact form. Please try again.");
    } catch (error) {
      console.error("Error submitting contact form.", error);
      if (error instanceof Error) {
        toast.error(error.message || "Error submitting contact form. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-12 w-full max-w-2xl space-y-6 rounded p-6">
        <section role="table" className="grid w-full grid-cols-12 gap-4 rounded-md">
          <div className="col-span-6">
            <InputFormField<ContactFormData>
              required
              aria-required
              disabled={submitting}
              name="name"
              label="Full Name"
              autoComplete="name"
              placeholder="Your full name..."
              control={control}
            />
          </div>
          <div className="col-span-6">
            <InputFormField<ContactFormData>
              name="email"
              label="Email"
              autoComplete="email"
              control={control}
              placeholder="Your email address..."
              type="email"
              required
              aria-required
              disabled={submitting}
            />
          </div>

          <div className="col-span-12">
            <TextareaFormField<ContactFormData>
              label="Message"
              autoComplete="off"
              control={control}
              name="message"
              className="resize-none"
              placeholder="Please leave your message here..."
              required
              aria-required
              disabled={submitting}
              formDescription="Please leave your message here. The message must be less than 300 characters."
            />
          </div>
        </section>

        <div className="flex items-center justify-center gap-x-4">
          <Button disabled={submitting} loading={submitting} type="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
          <Button disabled={submitting} type="reset" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
