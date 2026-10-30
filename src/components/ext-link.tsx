import type { ComponentProps } from "react";

/** Link that leaves the site: always opens in a new tab. */
export function ExtLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
