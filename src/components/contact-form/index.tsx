import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const contactFormSchema = yup
  .object({
    name: yup.string().min(2).max(20).required("Name is required"),
    message: yup.string().min(2).max(100).required(),
    email: yup.string().email().required(),
  })
  .required();

type ContactFormInputs = yup.InferType<typeof contactFormSchema>;

export default function ContactForm() {
  const { register, handleSubmit, formState } = useForm<ContactFormInputs>({
    resolver: yupResolver(contactFormSchema),
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<ContactFormInputs> = ({
    name,
    message,
    email,
  }) => {
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        message,
        email,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  return (
    <div className="w-full">
      <h2>Contact Form</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <fieldset className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              aria-label="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-placeholder="John Smith"
              placeholder="John Smith"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {errors.name && <span>This field is required</span>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              aria-placeholder="mo@mail.com"
              placeholder="mo@mail.com"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Message
            </label>
            <textarea
              {...register("message")}
              aria-placeholder="..."
              placeholder="hello world..."
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </fieldset>
        <br />
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
