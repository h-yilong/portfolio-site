import ContactForm from "./ContactForm";

// todo: 1. reCaptcha 2. email limit 3. IP limit
export default function Contact() {
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
