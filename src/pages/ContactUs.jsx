import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-orange-100 p-4">
      <div className="bg-white shadow-lg max-w-3xl w-full p-8">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-4">
          If you have any questions or feedback, feel free to contact us at:
        </p>
        <ul className="text-gray-700 list-disc ml-5">
          <li>Email: support@example.com</li>
          <li>Phone: +1 234 567 890</li>
          <li>Address: 123 Example Street, City, Country</li>
        </ul>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button className="bg-[var(--color-primary)] text-white py-2 px-4 rounded hover:bg-[#002C77] transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
