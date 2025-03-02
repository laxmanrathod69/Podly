import { ErrorMessage } from "@hookform/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormGeneratorProps } from "@/constants"

export const FormGenerator = ({
  label,
  placeholder,
  register,
  name,
  errors,
  type,
}: FormGeneratorProps) => {
  return (
    <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
      {label && label}
      <Input
        id={`input-${label}`}
        type={type}
        placeholder={placeholder}
        className="bg-black-input border-black-2 rounded-lg h-8 text-white-1 text-xs font-semibold"
        {...register(name)}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-red-400 text-[.65rem] ml-1">
            {message === "Required" ? "" : message}
          </p>
        )}
      />
    </Label>
  )
}
