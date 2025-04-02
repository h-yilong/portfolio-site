import { InputHTMLAttributes, forwardRef } from "react";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  isError?: boolean;
  label?: string;
  errorMessage?: string;
  as?: "input" | "textarea";
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled,
      isError = false,
      name,
      label,
      type = "text",
      placeholder,
      required,
      id,
      errorMessage,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const inputId = id || name;

    return (
      <div className="sm:flex sm:flex-row sm:items-center sm:gap-2">
        {label && (
          <label htmlFor={inputId} className="block pb-2 font-semibold sm:flex-1 sm:pb-5">
            {label}
            {required && (
              <span className="ml-1 text-rose-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="flex-1 sm:flex-2">
          <input
            ref={ref}
            id={inputId}
            {...rest}
            disabled={disabled}
            className={`w-full rounded-xl bg-white/10 px-4 py-2 ${
              isError ? "border-rose-500" : "border-transparent"
            } disabled:text-opacity-50 border-2 outline-hidden placeholder:text-gray-400 focus:border-indigo-600 disabled:cursor-not-allowed ${className}`.trim()}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            aria-invalid={isError}
            aria-describedby={errorMessage ? `${inputId}-error` : undefined}
          />
          {errorMessage && (
            <p role="alert" aria-live="polite" className="mt-2 h-5 text-sm text-rose-500" id={`${inputId}-error`}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
