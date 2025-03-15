import { Loader2 } from "lucide-react"

export const Loader = ({
  label,
  isLoading,
  children,
  variant,
}: LoaderProps) => {
  if (!isLoading) return <>{children}</>

  if (!variant)
    return (
      <Loader2
        className="animate-spin"
        size={16}
        role="status"
        aria-live="polite"
      />
    )

  switch (variant) {
    case "spin":
      return (
        <div
          className="flex items-center gap-2 text-white-1 text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          <>{children}</> <Loader2 className="animate-spin" size={16} />
        </div>
      )

    case "spin2":
      return (
        <div
          className="flex items-center gap-2 text-white-1 text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          {label && <span>{label}</span>}
          <Loader2 className="animate-spin" size={16} />
        </div>
      )

    default:
      return <></>
  }
}
