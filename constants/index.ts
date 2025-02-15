import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { v4 } from "uuid"

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/discover.svg",
    route: "/discover",
    label: "Discover",
  },
  {
    imgURL: "/icons/microphone.svg",
    route: "/create-podcast",
    label: "Create Podcast",
  },
]

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
