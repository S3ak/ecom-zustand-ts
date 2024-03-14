import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState } = useForm<Inputs>();

  const onSubmit = ({ name, message, email }) => {
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
    <div>
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name", { required: true })} type="text" />
          {formState.errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea {...register("message")}></textarea>
        </div>
        <br />
        <hr />
        <button type="submit">Send</button>
        <hr />
      </form>
    </div>
  );
}
