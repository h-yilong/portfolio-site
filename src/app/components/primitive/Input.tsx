import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
  label?: string;
  errorMessage?: string;
  htmlFor?: string;
};

export default function Input({
  disabled,
  isError = false,
  name,
  label,
  type,
  placeholder,
  required,
  id,
  htmlFor,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={htmlFor} className="flex-1 pb-5 font-semibold">
        {label}
      </label>
      <div className="flex-[2]">
        <input
          id={id}
          {...rest}
          disabled={disabled}
          className={`w-full rounded-xl bg-white/10 px-4 py-2 ${isError ? "border-rose-500" : "border-transparent"} border-2 outline-2 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-opacity-50`}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          aria-describedby={`${id}-desc`}
        />
        <p aria-live="polite" aria-atomic="true" className="mt-2 h-5 text-sm text-rose-500" id={`${id}-desc`}>
          {errorMessage}
        </p>
      </div>
    </div>
  );
}
