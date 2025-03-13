import { onAuthenticatedUser } from "@/actions/auth/auth.actions"
import { onGetUser } from "@/actions/user/user.actions"
import { UserProfile } from "@/components/global/user-profile"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"

type Params = Promise<{ userid: string }>

const UserProfilePage = async ({ params }: { params: Params }) => {
  const { userid } = await params
  const authUser = await onAuthenticatedUser()

  if (!authUser || authUser.status !== 200) return redirect("/sign-in")

  const client = new QueryClient()
  await client.prefetchQuery({
    queryKey: ["user", userid],
    queryFn: () => onGetUser(userid),
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UserProfile userId={userid} authUserId={authUser.data?.id} />
    </HydrationBoundary>
  )
}

export default UserProfilePage
