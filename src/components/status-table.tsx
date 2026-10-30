import { focus, type FocusStatus } from "@/data";
import { cn } from "@/lib/utils";

const statusColor: Record<FocusStatus, string> = {
  up: "text-up",
  "in progress": "text-learning",
  learning: "text-learning",
  planned: "text-muted-foreground",
};

/** Focus areas rendered like `show interfaces status`. */
export function StatusTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted-foreground">console — 9600 baud</span>
      </div>
      <table className="w-full font-mono text-xs sm:text-sm">
        <caption className="sr-only">Focus areas and their current status</caption>
        <thead>
          <tr className="text-left text-muted-foreground">
            <th scope="col" className="px-4 pt-3 pb-2 font-normal">
              Interface
            </th>
            <th scope="col" className="px-4 pt-3 pb-2 font-normal">
              Status
            </th>
            <th scope="col" className="hidden px-4 pt-3 pb-2 font-normal sm:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {focus.map((row) => (
            <tr key={row.interface} className="border-t border-border/50 align-top">
              <th scope="row" className="px-4 py-2.5 text-left font-medium">
                {row.interface}
                <span className="mt-1 block font-sans text-xs font-normal text-muted-foreground sm:hidden">
                  {row.description}
                </span>
              </th>
              <td className={cn("px-4 py-2.5 whitespace-nowrap", statusColor[row.status])}>
                <span aria-hidden>● </span>
                {row.status}
              </td>
              <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
