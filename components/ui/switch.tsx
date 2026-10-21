"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// Interruptor nos tokens do site: acento quando ligado, linha quando desligado.
// O foco visível vem do :focus-visible global.
export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-linha bg-linha p-0.5 transition-colors data-[state=checked]:border-acento data-[state=checked]:bg-acento disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-texto transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-acento-contraste" />
    </SwitchPrimitive.Root>
  );
}
