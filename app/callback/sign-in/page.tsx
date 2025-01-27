import { onSignInUser, onSignUpUser } from "@/actions/auth.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteSignIn = async () => {
  const user = await currentUser()
  if (!user || !user.id) {
    redirect("/sign-in")
  }
  // Check if the user exists in the database
  const authenticated = await onSignInUser(user.id)
  console.log("authenticated user: " + { authenticated })
  if (authenticated.status === 400) {
    // If the user does not exist, create a new user entry in the database
    const complete = await onSignUpUser({
      firstname: user.firstName!,
      lastname: user.lastName!,
      image: user.imageUrl,
      clerkId: user.id,
    })

    if (complete.status === 200) {
      redirect("/") // Redirect to dashboard
    } else {
      redirect("/sign-in")
    }
  } else if (authenticated.status === 200) {
    redirect("/") // Redirect to dashboard
  } else {
    redirect("/sign-in")
  }
}

export default CompleteSignIn
