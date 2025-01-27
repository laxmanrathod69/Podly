import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"

interface OtpProps {
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
}
const OtpInput = ({ otp, setOtp }: OtpProps) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp: string) => setOtp(otp)}>
      <div>
        <InputOTPSlot index={0} />
      </div>
      <div>
        <InputOTPSlot index={1} />
      </div>
      <div>
        <InputOTPSlot index={2} />
      </div>
      <div>
        <InputOTPSlot index={3} />
      </div>
      <div>
        <InputOTPSlot index={4} />
      </div>
      <div>
        <InputOTPSlot index={5} />
      </div>
    </InputOTP>
  )
}

export default OtpInput
