import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl p-6"
        style={{
          backgroundColor: "#fff7da",                // cream
          border: "3px solid #a20604",               // red border
          borderRadius: "0",
          boxShadow: "0 6px 18px rgba(164, 6, 4, 0.4)", // red glow
        }}
      >
        <h1
          className="text-2xl font-bold uppercase mb-4 text-center"
          style={{ color: "#a20604", letterSpacing: "0.05em" }}
        >
          Contact Us
        </h1>

        <p className="text-[15px] font-medium mb-4" style={{ color: "#3b2300" }}>
          If you have any questions, complaints, or need help with your lottery purchases,
          feel free to reach us through the details below.
        </p>

        <ul className="space-y-2 mb-6 text-[15px]" style={{ color: "#3b2300" }}>
          <li>📧 <b>Email:</b> support@dearlottery.in</li>
          <li>📞 <b>Phone:</b> 98765 43210</li>
        </ul>

        <h2
          className="text-lg font-bold uppercase mb-3"
          style={{ color: "#e63820" }}
        >
          Send us a message
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 font-medium outline-none"
            style={{
              backgroundColor: "#fff",
              border: "2px solid #a20604",
              borderRadius: 0,
            }}
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 font-medium outline-none"
            style={{
              backgroundColor: "#fff",
              border: "2px solid #a20604",
              borderRadius: 0,
            }}
          />

          <textarea
            placeholder="Your Message"
            className="w-full px-3 py-2 h-28 font-medium outline-none"
            style={{
              backgroundColor: "#fff",
              border: "2px solid #a20604",
              borderRadius: 0,
            }}
          ></textarea>

          <button
            className="w-full font-bold py-2 transition active:scale-95"
            style={{
              background: "linear-gradient(to bottom, #ffed33, #f46d04)",
              color: "#3b2300",
              border: "2px solid #ffed33",
              borderRadius: "0",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
