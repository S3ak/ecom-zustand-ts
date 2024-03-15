import { useForm, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../form/input-field";

const contactFormSchema = yup
  .object({
    name: yup
      .string()
      .min(2)
      .max(20)
      .required("Bob need you to fill this out."),
    message: yup.string().min(2).max(100).required(),
    email: yup.string().email().required(),
  })
  .required();

export type ContactFormInputs = yup.InferType<typeof contactFormSchema>;

export default function ContactFormAction() {
  const { register, formState, reset, control } = useForm<ContactFormInputs>({
    resolver: yupResolver(contactFormSchema),
    mode: "onBlur",
  });

  const { errors } = formState;

  return (
    <div className="w-full">
      <h2>Contact Form</h2>

      <Form
        action="https://dummyjson.com/products/add" // Send post request with the FormData
        // encType={'application/json'} you can also switch to json object
        onSuccess={() => {
          alert("Your application is updated.");
        }}
        onError={() => {
          alert("Submission has failed.");
        }}
        control={control}
        className="w-full px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <fieldset className="flex flex-col gap-2">
          <InputField
            type="text"
            label="Name"
            name="name"
            placeholder="John Doe"
            register={register}
            errors={errors}
          />

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
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
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
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
            {errors.message && (
              <p className="text-red-700">{errors.message.message}</p>
            )}
          </div>
        </fieldset>
        <br />
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Send
        </button>

        <button
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
          className="px-4 py-2 ml-5 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Reset
        </button>
      </Form>
    </div>
  );
}
