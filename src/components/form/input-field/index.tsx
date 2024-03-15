import { ContactFormInputs } from "@/components/contact-form";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<ContactFormInputs>;
  errors: FieldErrors<ContactFormInputs>;
  name: keyof ContactFormInputs;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute | undefined;
};

export default function InputField({
  register,
  errors,
  label,
  placeholder,
  type,
  name,
  ...rest
}: Props) {
  const error = errors[name] || null;

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-bold text-gray-700"
      >
        {label}
      </label>

      <input
        {...rest}
        {...register(name)}
        id={name}
        type={type}
        aria-label={label}
        aria-invalid={error ? "true" : "false"}
        aria-placeholder={placeholder}
        placeholder={placeholder}
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-"
      />
      {error && <p className="text-red-700">{error?.message}</p>}
    </div>
  );
}
