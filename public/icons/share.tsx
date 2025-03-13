import { ShareIcon } from "lucide-react"

export const Share = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-white-1">
    <ShareIcon size={15} /> <h3 className="text-sm font-normal">{label}</h3>
  </div>
)
