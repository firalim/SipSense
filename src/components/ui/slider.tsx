import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      "h-5",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative w-full grow overflow-hidden rounded-full bg-gray-200 h-1.5">
      <SliderPrimitive.Range className="absolute h-full bg-burgundy" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-4 h-4 bg-mint rounded-full border-2 border-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-mint/50 disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };