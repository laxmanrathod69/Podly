import { onSignInUser, onSignUpUser } from "@/actions/auth.actions"
import { useErrorToast2 } from "@/hooks/toasts"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteSignIn = async () => {
  const user = await currentUser()
  if (!user?.id) {
    useErrorToast2("Something went wrong. Please try again later.")
    return redirect("/sign-in")
  }

  const authenticated = await onSignInUser(user.id)

  if (authenticated.status === 200) {
    return redirect("/") // Redirect to dashboard
  }

  const signedIn = await onSignUpUser({
    name: `${user?.firstName ?? "User"} ${user?.lastName ?? ""}`,
    clerkId: user.id,
    image: user?.imageUrl,
  })

  if (signedIn.status === 200) {
    return redirect("/") // Redirect to dashboard
  }

  useErrorToast2("Something went wrong. Please try again later.")
  return redirect("/sign-in")
}

export default CompleteSignIn
