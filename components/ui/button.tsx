import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Every colour and size here resolves through a design token. The `cta`
 * variant carries MASTER.md's gold "Accent/CTA"; shadcn's `--accent` is a
 * hover surface and is deliberately not the same thing.
 *
 * Sizes: the `default` height is 44px, the minimum touch target. `sm` is 36px
 * and is only for controls inside a dense admin table row, never for a primary
 * action on a touch surface.
 */
const buttonVariants = cva(
  cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md",
    "text-sm font-medium whitespace-nowrap transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        cta: "bg-cta text-cta-foreground hover:bg-cta/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-cta underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        // 44px — the touch-target minimum, met by the control itself rather
        // than by padding around it.
        default: "h-11 px-5 py-2",
        sm: "h-9 gap-1.5 px-3",
        lg: "h-12 px-8",
        // Square icon buttons must still reach 44px.
        icon: "size-11",
        iconSm: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, type, ...props }: ButtonProps) {
  return (
    <button
      // A button inside a form defaults to type="submit", which submits the
      // form on any stray click. Explicit "button" unless a caller says otherwise.
      type={type ?? "button"}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
