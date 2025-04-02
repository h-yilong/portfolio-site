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
import { ContactMessage } from "@prisma/client";
import { createContactRequest } from "./server-action";
import { ContactFormData, schema } from "./rules-schema";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    // mode: "onChange",
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
    formState: { errors },
  } = form;

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitting(true);
      const res = await createContactRequest(data);

      // todo: handle server form validation errors
      if (res.status === "success") {
        reset();
        // toast("Form submitted successfully.", {
        //   classNames: { title: "text-green-600 font-semibold" },
        //   description: "We will process your request as soon as possible.",
        //   position: "bottom-center",
        //   duration: 3000,
        //   icon: <CheckIcon className="stroke-green-600 stroke-[3]" />,
        // });
        return;
      }

      // todo: toast error
    } catch (error) {
      console.error("Error submitting form.", error);
      // todo: toast error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-16 w-full max-w-2xl space-y-6 rounded p-6">
        <section role="table" className="grid w-full grid-cols-12 gap-4 rounded-md">
          <div className="col-span-6">
            <InputFormField<ContactFormData>
              required
              name="name"
              label="Name"
              placeholder="Student full legal name..."
              control={control}
            />
          </div>
          <div className="col-span-6">
            <InputFormField<ContactFormData>
              name="email"
              label="Email"
              control={control}
              type="email"
              required
              aria-required
              className="text-sm"
            />
          </div>

          <div className="col-span-12">
            <TextareaFormField<ContactFormData>
              label="Message"
              rows={5}
              control={control}
              name="message"
              className="resize-none"
              placeholder="Please leave your message here..."
              required
              aria-required
              formDescription="Please leave your message here. The message must be less than 300 characters."
            />
          </div>
        </section>

        <div className="flex items-center justify-center gap-x-4">
          <Button
            disabled={submitting}
            loading
            // loading={submitting}
            type="submit"
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
          <Button type="reset" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
