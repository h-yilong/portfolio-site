import type { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";

const buttonVariants = cva("", {
  variants: {
    variant: {
      // default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      default: "from-indigo-700 to-indigo-800 hover:from-indigo-600 hover:to-indigo-700",
      destructive:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      // default: "h-9 px-4 py-2 has-[>svg]:px-3",
      default: "",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      disabled={disabled || loading}
      data-slot="button"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn focus-ring inline-flex w-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-3xl bg-linear-to-br px-6 py-4 font-semibold whitespace-nowrap transition-all outline-none hover:text-white focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        buttonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
      <Image
        src="/assets/images/loader.svg"
        width={14}
        height={14}
        alt="loader"
        className={cn("size-3.5", loading ? "" : "hidden")}
      />
    </Comp>
  );
}

export { Button, buttonVariants };
