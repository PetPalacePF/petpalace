import axios from "../config/axios";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import bgContact from "../assets/bg-Contact.jpg";

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();

  const sendEmail = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("user_message");

    if (!name || !email || !message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    emailjs
      .sendForm(
        "service_u1ix50k",
        "template_7xjjakl",
        event.target,
        "5Hv7UVEQ4RPK2FXlG"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your message has been sent successfully.",
        });
        axios.post("/mail", {
          userEmail: email,
          userMessage: message,
          userName: name,
        });

        event.target.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      });
  };

  useEffect(() => {
    window.localStorage.setItem("buyNow", JSON.stringify(false));
  }, []);

  return (
    <div
      className="mx-auto overflow-hidden"
      style={{ backgroundImage: `url(${bgContact})` }}
    >
      <div className="flex flex-col items-center min-h-screen mt-16">
        <form
          className="max-w-md w-full backdrop-filter backdrop-blur-md bg-violetahome bg-opacity-50 rounded-lg p-8 shadow-md"
          onSubmit={sendEmail}
        >
          <h1 className="text-3xl font-bold mb-8 text-center border-b-2 border-black pb-2">
            Contact Us
          </h1>
          {isAuthenticated ? (
            <div className="mb-4">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                value={user.name}
                placeholder="Insert your name"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="Insert your name"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {isAuthenticated ? (
            <div className="mb-4">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                value={user.email}
                placeholder="Insert your email"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="Insert your email"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="user_message"
              className="block text-sm font-medium text-black"
            >
              Message
            </label>
            <textarea
              name="user_message"
              id="user_message"
              cols="30"
              rows="5"
              placeholder="Write a message"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-violetamain text-white py-2 px-4 rounded-md hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-violetamain focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
