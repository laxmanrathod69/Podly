import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { v4 } from "uuid"

export const AIVOICES = [
  { name: "Natalie", voiceId: "en-US-natalie", style: "Promo" },
  { name: "Amara", voiceId: "en-US-amara", style: "Conversational" },
  { name: "Jualia", voiceId: "en-US-julia", style: "Narration" },
  { name: "Zion", voiceId: "en-US-zion", style: "Promo" },
  { name: "Ken", voiceId: "en-US-ken", style: "Conversational" },
  { name: "Riley", voiceId: "en-US-riley", style: "Conversational" },
]

export const QUERY_KEYS = {
  trendingPodcasts: "trending-podcasts",
  popularPodcasts: "popular-podcasts",
  recentPodcasts: "recent-podcasts",
  topPodcasters: "top-podcasters",
  popularPodcasters: "popular-podcasters",
} as const

export const SIGN_UP_FORM: AuthFormProps[] = [
  {
    id: v4(),
    placeholder: "First name",
    name: "firstname",
    type: "text",
  },
  {
    id: v4(),
    placeholder: "Last name",
    name: "lastname",
    type: "text",
  },
  {
    id: v4(),
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: v4(),
    placeholder: "Password",
    name: "password",
    type: "password",
  },
]

export const SIGN_IN_FORM: AuthFormProps[] = [
  {
    id: v4(),
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: v4(),
    placeholder: "Password",
    name: "password",
    type: "password",
  },
]

export interface FormGeneratorProps {
  type?: "text" | "email" | "password" | "number"
  label?: string
  placeholder: string
  register: UseFormRegister<any>
  name: string
  errors: FieldErrors<FieldValues>
}
