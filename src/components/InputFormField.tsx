import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export default function InputFormField<T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  formDescription = "",
  className,
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
            {required && <span className="text-destructive mt-1.5 -ml-1 text-lg font-medium">*</span>}
          </FormLabel>
          <FormControl>
            <input
              {...props}
              data-slot="input"
              className={cn(
                "aria-invalid:border-destructive focus-visible:border-ring h-11 rounded-lg border-2 border-transparent bg-black/50 px-4 py-2 md:text-base",
                className,
              )}
              {...field}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>{formDescription}</FormDescription>
        </FormItem>
      )}
    />
  );
}
