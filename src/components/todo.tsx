/** Visible placeholder for content that hasn't been supplied yet. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-learning/50 px-4 py-3 font-mono text-xs text-learning">
      TODO: {children}
    </p>
  );
}
