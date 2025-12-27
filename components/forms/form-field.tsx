import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
}

export function FormField({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps) {
  return (
    <form.Field
      name={name}
      children={(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
              placeholder={placeholder}
              type={type}
              autoComplete="off"
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    />
  );
}
