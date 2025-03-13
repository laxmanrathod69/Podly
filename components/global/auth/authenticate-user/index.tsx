import { onSignInUser, onSignUpUser } from "@/actions/auth/auth.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const AuthenticateUser = async () => {
  const user = await currentUser()
  if (!user?.id) {
    return redirect("/sign-in")
  }

  // Check if user is already signed in
  const authenticated = await onSignInUser(user.id)
  if (authenticated.status === 200) {
    return redirect("/") // Redirect to the home page/dashboard
  }

  // If not signed in, sign up the user
  const signedIn = await onSignUpUser({
    name: `${user?.firstName ?? "User"} ${user?.lastName ?? ""}`,
    clerkId: user.id,
    image: user?.imageUrl,
  })

  if (signedIn.status === 200) {
    return redirect("/") // Redirect to the home page/dashboard
  }

  return redirect("/sign-in")
}
