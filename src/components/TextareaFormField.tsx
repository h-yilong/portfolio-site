import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function TextareaFormField<T extends FieldValues>({
  label,
  name,
  control,
  previewMode = false,
  required = false,
  className,
  formDescription = "",
  ...props
}: React.ComponentProps<"textarea"> & {
  label: string;
  control: Control<T, any>;
  name: Path<T>;
  previewMode?: boolean;
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
            <textarea
              data-slot="textarea"
              className={cn(
                "focus-visible:border-ring aria-invalid:border-destructive rounded-lg border-2 border-transparent bg-black/50 px-4 py-2 md:text-base",
                className,
              )}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
          {previewMode && formDescription ? null : <FormDescription>{formDescription}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
