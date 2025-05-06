import { Textarea } from "@/components/ui/textarea";
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
            {!required && <span className="ml-1 text-xs font-medium text-gray-500">(optional)</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              className={cn(
                "dark:aria-invalid:ring-destructive/20 aria-invalid:ring-destructive/20 rounded-xl border-2 border-transparent bg-white/10 px-4 py-2 focus-visible:border-indigo-600 md:text-base dark:bg-white/10",
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
