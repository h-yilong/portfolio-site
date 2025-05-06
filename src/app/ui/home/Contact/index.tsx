"use client";
import Button from "@/app/components/primitive/Button";
import { createContactRequest, type State } from "@/app/lib/server-actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useId, useRef } from "react";
import Input from "@/app/components/primitive/Input";
import ContactForm from "./ContactForm";

// todo: 1. reCaptcha 2. email limit 3. IP limit

export default function Contact() {
  const ref = useRef<HTMLFormElement | null>(null);
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createContactRequest, initialState);

  useEffect(() => {
    if (ref?.current && /successfully/.test(state.message)) {
      ref.current.reset();
    }
  }, [state]);

  return (
    <section className="max-width">
      <div className="my-24 overflow-hidden rounded-xl border border-white/10 bg-black/5" id="contact">
        <div className="flex h-8 w-full items-center bg-linear-to-r from-white/5 via-white/10 to-white/5">
          <div className="ml-4 h-3 w-3 rounded-full bg-white/30" />
          <div className="ml-2 h-3 w-3 rounded-full bg-white/30" />
          <div className="ml-2 h-3 w-3 rounded-full bg-white/30" />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
