import { Edit2 } from "lucide-react"

export const Edit = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-white-1">
    <Edit2 size={15} /> <h3 className="text-sm font-normal">{label}</h3>
  </div>
)
