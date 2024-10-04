"use client";
import Button from "@/app/components/primitive/Button";
import { createContactRequest } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useId, useRef } from "react";
import Input from "@/app/components/primitive/Input";

const Form = ({ state }) => {
  const { pending } = useFormStatus();
  const id = useId();

  return (
    <>
      <Input
        htmlFor={`${id}-name`}
        id={`${id}-name`}
        disabled={pending}
        isError={!!state.errors?.name}
        label="Full Name"
        type="text"
        name="name"
        placeholder="Enter your name..."
        // errorMessage="some error happened"
        required
      />

      <Input
        htmlFor={`${id}-email`}
        id={`${id}-email`}
        disabled={pending}
        isError={!!state.errors?.email}
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email address..."
        errorMessage={state.errors?.email && state.errors.email.join(";")}
        required
      />

      <Input
        htmlFor={`${id}-message`}
        id={`${id}-message`}
        disabled={pending}
        isError={!!state.errors?.message}
        label="message"
        type="text"
        name="message"
        placeholder="Enter your message..."
        errorMessage={state.errors?.message && state.errors.message.join(";")}
        required
      />
      <p className="text-md h-5 text-center leading-5 text-green-500">
        {/successfully/.test(state.message) ? state.message : null}
      </p>
      <div className="mx-auto flex w-fit gap-3">
        <Button type="submit" loading={pending}>
          {pending ? "Pending" : "Submit"}
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </>
  );
};

// todo: 1. reCaptcha 2. email limit 3. IP limit

export default function Contact() {
  const ref = useRef<HTMLFormElement | null>(null);
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createContactRequest, initialState);

  console.log(`%c state `, "font-weight:bolder;color:#f45;padding:2px;background:#fd1", state);

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
      <form ref={ref} action={dispatch} className="mx-auto flex w-full max-w-md flex-col gap-3 py-6">
        <Form state={state} />
      </form>
    </div>
  );
}
