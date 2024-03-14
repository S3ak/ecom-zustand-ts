import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("foo");
  const [email, setEmail] = useState("bar@mail.com");
  const [message, setMessage] = useState("zar");

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiName: name,
        apiEmail: email,
        apiMessage: message,
      }),
    })
      .then((res) => res.json())
      .then(console.log);

    console.log("submit form");
  }

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    switch (event.target.id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>

      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input value={name} onChange={handleOnChange} type="text" id="name" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={handleOnChange}
            type="email"
            id="email"
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={handleOnChange}
            value={message}
            id="message"
          ></textarea>
        </div>
        <br />
        <hr />
        <button type="submit">Send</button>
        <hr />
      </form>
    </div>
  );
}
