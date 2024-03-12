export default function Input({
  label = "",
  type = "text",
  id = "",
  autoComplete = "",
  value = "",
  onChange = (e) => console.log("handle on change", e),
}: {
  label: string;
  type: string;
  id: string;
  value: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          name={id}
          autoComplete={autoComplete}
          aria-label={label}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
