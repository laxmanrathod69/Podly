import { toast } from "sonner"

export const useSuccessToast = (message: string) => toast.success(message)
export const useErrorToast2 = (message: string) => toast.error(message)

export const useLoadingToast = (message: string, id: string) =>
  toast.loading(message, { id })

export const useDismissToast = (id: string): void => {
  toast.dismiss(id)
}

export const useErrorToast = (error: unknown): void => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unexpected error occurred"

  toast.error(errorMessage)
}
