import { onSignInUser, onSignUpUser } from "@/actions/auth.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteSignIn = async () => {
  const user = await currentUser()
  if (!user?.id) {
    return redirect("/sign-in")
  }

  const authenticated = await onSignInUser(user.id)

  if (authenticated.status === 200) {
    return redirect("/") // Redirect to dashboard
  }

  const signedIn = await onSignUpUser({
    name: `${user.firstName} ${user.lastName ?? ""}`,
    clerkId: user.id,
    image: user?.imageUrl,
  })

  if (signedIn.status === 200) {
    return redirect("/") // Redirect to dashboard
  }

  return redirect("/sign-in")
}

export default CompleteSignIn
