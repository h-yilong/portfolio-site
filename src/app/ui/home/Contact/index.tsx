"use client";
import Button from "@/app/components/primitive/Button";
import { createContactRequest } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";

// todo: 1. reCaptcha 2. email limit 3. IP limit
// todo: loading state when sending request

export default function Contact() {
  const ref = useRef<HTMLFormElement | null>(null);
  const initialState = { message: "", errors: {} };
  const [state, dispatch, pending] = useFormState(createContactRequest, initialState);

  console.log(`%c state `, "font-weight:bolder;color:#f45;padding:2px;background:#fd1", state);
  console.log(`%c pending `, "padding:2px;background:#53a;color:#fff", pending);

  useEffect(() => {
    if (ref?.current && /successfully/.test(state.message)) {
      ref.current.reset();
    }
  }, [state]);

  return (
    <div className="mx-auto my-24 max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-black/5" id="contact">
      <div className="flex h-8 w-full items-center bg-gradient-to-r from-white/5 via-white/10 to-white/5">
        <div className="ml-4 h-3 w-3 rounded-full bg-white/30" />
        <div className="ml-2 h-3 w-3 rounded-full bg-white/30" />
        <div className="ml-2 h-3 w-3 rounded-full bg-white/30" />
      </div>
      <form ref={ref} action={dispatch} className="mx-auto flex w-full max-w-md flex-col gap-5 py-6">
        <label className="flex w-full items-center justify-between">
          <b>Full Name</b>
          <input
            disabled={pending}
            className={`ml-2 rounded-xl bg-white/10 px-4 py-2 ${state.errors?.name ? "border-rose-500" : "border-transparent"} border-2`}
            type="text"
            name="name"
            placeholder="enter your name..."
            required
          />
        </label>
        <label className="flex w-full items-center justify-between">
          <b>Email</b>
          <input
            disabled={pending}
            className={`ml-2 rounded-xl bg-white/10 px-4 py-2 ${state.errors?.email ? "border-rose-500" : "border-transparent"} border-2`}
            type="email"
            name="email"
            placeholder="enter your email..."
            required
          />
        </label>
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-rose-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <label className="flex w-full items-center justify-between">
          <b>Message</b>
          <input
            disabled={pending}
            className={`ml-2 rounded-xl bg-white/10 px-4 py-2 ${state.errors?.message ? "border-rose-500" : "border-transparent"} border-2`}
            type="text"
            name="message"
            placeholder="enter your message..."
            required
          />
        </label>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          {state.errors?.message &&
            state.errors.message.map((error: string) => (
              <p className="mt-2 text-sm text-rose-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <Button type="submit">{pending ? "Pending" : "Submit"}</Button>
        <Button type="reset">reset</Button>
        {/successfully/.test(state.message) && <p className="text-md mt-2 text-green-500">{state.message}</p>}
      </form>
    </div>
  );
}
