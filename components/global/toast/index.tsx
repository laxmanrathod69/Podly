"use client"

import { toast } from "sonner"

type ToastProps = {
  type: "success" | "error" | "warning" | "info"
  message: string
}

export const Toast = ({ type, message }: ToastProps) => {
  switch (type) {
    case "success":
      return toast.success(message)
    case "error":
      return toast.error(message)
    case "warning":
      return toast.warning(message)
    case "info":
      return toast.info(message)
    default:
      return null
  }
}
