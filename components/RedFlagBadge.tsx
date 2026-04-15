import type { Severity } from "@/lib/bid-analyzer";

interface RedFlagBadgeProps {
  severity: Severity;
  label: string;
}

const styles: Record<Severity, string> = {
  ok: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warn: "bg-amber-50 text-amber-700 border-amber-200",
  bad: "bg-red-50 text-red-700 border-red-200",
};

const dots: Record<Severity, string> = {
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
  bad: "bg-red-500",
};

export default function RedFlagBadge({ severity, label }: RedFlagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[severity]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[severity]}`} />
      {label}
    </span>
  );
}
