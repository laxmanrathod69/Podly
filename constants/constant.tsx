import { useSignOut } from "@/hooks/auth"
import { Delete } from "@/public/icons/delete"
import { Discover } from "@/public/icons/discover"
import { Edit } from "@/public/icons/edit"
import { Home } from "@/public/icons/home"
import { LogOut } from "@/public/icons/log-out"
import { Microphone } from "@/public/icons/microphone"
import { Share } from "@/public/icons/share"
import { useRouter } from "next/navigation"
import { v4 } from "uuid"

export const SIDEBAR_ITEMS = [
  {
    item: <Home />,
    route: "/",
    label: "Home",
  },
  {
    item: <Discover />,
    route: "/search",
    label: "Discover",
  },
  {
    item: <Microphone />,
    route: "/create",
    label: "Create Podcast",
  },
]

export const USER_PROFILE_ITEMS = (isOwner: boolean) => {
  const handleShareAction = () => {
    console.log("share clicked.")
  }

  const handleEditAction = () => {
    console.log("edit clicked.")
  }

  const ownerItems = [
    {
      id: v4(),
      item: <Edit label="Edit" />,
      action: handleEditAction,
    },
    {
      id: v4(),
      item: <Share label="Share" />,
      action: handleShareAction,
    },
  ]

  const nonOwnerItems = [
    {
      id: v4(),
      item: <Share label="Share" />,
      action: handleShareAction,
    },
  ]

  return isOwner ? ownerItems : nonOwnerItems
}

export const RIGHTSIDEBAR_USER_PROFILE_ITEMS = (userId: string) => {
  const router = useRouter()
  return [
    {
      id: v4(),
      item: (
        <h3 className="text-sm font-medium text-white-2 hover:underline w-full">
          Profile
        </h3>
      ),
      action: () => {
        router.push(`/user/${userId}`)
      },
    },
  ]
}

export const RIGHTSIDEBAR_USER_PROFILE_SPECIAL_ITEMS = [
  { id: v4(), item: <LogOut />, action: () => useSignOut() },
]

export const PODCAST_DETAILS_ITEMS = (isOwner: boolean) => {
  const handleShareAction = () => {
    console.log("share clicked.")
  }
  const handleEditAction = () => {
    console.log("edit clicked.")
  }

  const handleDeleteAction = () => {
    console.log("delete clicked")
  }

  const ownerItems = [
    {
      id: v4(),
      item: <Edit label="Edit" />,
      action: handleEditAction,
    },
    {
      id: v4(),
      item: <Delete label="Delete" />,
      action: handleDeleteAction,
    },
    {
      id: v4(),
      item: <Share label="Share" />,
      action: handleShareAction,
    },
  ]

  const nonOwnerItems = [
    {
      id: v4(),
      item: <Share label="Share" />,
      action: handleShareAction,
    },
  ]

  return isOwner ? ownerItems : nonOwnerItems
}
