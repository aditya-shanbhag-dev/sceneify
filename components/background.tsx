import { cn } from "@/lib/utils";

export default function Background() {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[20px_20px]",
          "bg-[radial-gradient(#d4d4d4_1.5px,transparent_1.5px)]",
          "dark:bg-[radial-gradient(#404040_1.5px,transparent_1.5px)]",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center",
          "justify-center bg-background",
          "mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"
        )}
      ></div>
    </>
  );
}
