import AuthForm from "@/components/global/auth/forms"

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-full glassmorphism-auth">
      <AuthForm type="signIn" />
    </div>
  )
}

export default SignInPage
