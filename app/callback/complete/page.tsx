import { onSignUpUser } from "@/actions/auth.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallBack = async () => {
  const user = await currentUser()
  if (!user || !user.id) {
    redirect("/sign-in")
  }

  const complete = await onSignUpUser({
    firstname: user.firstName!,
    lastname: user.lastName!,
    image: user.imageUrl,
    clerkId: user.id,
  })

  if (complete.status === 200) {
    redirect("/") // WIP: redirect to dashboard
  }

  if (complete.status !== 200) {
    redirect("/sign-in")
  }
}

export default CompleteOAuthAfterCallBack
