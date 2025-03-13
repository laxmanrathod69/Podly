import { Trash } from "lucide-react"

export const Delete = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-white-1">
    <Trash size={15} /> <h3 className="text-sm font-normal">{label}</h3>
  </div>
)
