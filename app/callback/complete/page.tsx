import { onSignUpUser } from "@/actions/auth.actions"
import { useErrorToast2 } from "@/hooks/toasts"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallBack = async () => {
  const user = await currentUser()
  if (!user?.id) {
    useErrorToast2("Oops! Something went wrong.")
    redirect("/sign-in")
  }

  const complete = await onSignUpUser({
    name: `${user?.firstName ?? "User"} ${user?.lastName ?? ""}`,
    clerkId: user.id,
    image: user?.imageUrl,
  })

  if (complete.status === 200) {
    redirect("/") // WIP: redirect to dashboard
  }

  if (complete.status !== 200) {
    useErrorToast2("Oops! Something went wrong.")
    redirect("/sign-in")
  }
}

export default CompleteOAuthAfterCallBack
