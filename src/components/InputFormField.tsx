import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export default function InputFormField<T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  formDescription = "",
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
  control: Control<T, any>;
  name: Path<T>;
  formDescription?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">
            {label}
            {required && <span className="mt-1.5 -ml-1 text-lg font-medium text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              {...props}
              className="dark:aria-invalid:ring-destructive/20 aria-invalid:ring-destructive/20 h-11 rounded-xl border-2 border-transparent bg-white/10 px-4 py-2 focus-visible:border-indigo-600 md:text-base dark:bg-white/10"
              {...field}
            />
          </FormControl>
          <FormMessage />
          {formDescription ? null : <FormDescription>{formDescription}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
