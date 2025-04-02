import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export default function TextareaFormField<T extends FieldValues>({
  label,
  name,
  control,
  previewMode = false,
  required = false,
  rows,
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
            <Textarea rows={rows} className={className} {...props} {...field} />
          </FormControl>
          <FormMessage />
          {previewMode && formDescription ? null : <FormDescription>{formDescription}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
