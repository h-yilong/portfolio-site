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
            {!required && <span className="ml-1 text-xs font-medium text-gray-500">(optional)</span>}
          </FormLabel>
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
          <FormMessage />
          {formDescription ? null : <FormDescription>{formDescription}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
