import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useField } from "formik"

export default function FormField(props) {
  const { name, label, type, ...otherProps } = props
  const [field, { touched, error }] = useField({ name })

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type={type}
        id={label}
        placeholder={label}
        {...field}
        {...otherProps}
      />
      {touched && error ? (
        <span className="text-sm text-red-600">{error}</span>
      ) : null}
    </div>
  )
}
