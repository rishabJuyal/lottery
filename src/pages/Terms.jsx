import React from "react";

const Terms = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl p-6 shadow-lg"
        style={{
          backgroundColor: "#fff7da",             // cream bg
          border: "3px solid #a20604",            // deep red border
          borderRadius: "0",
          boxShadow: "0 6px 16px rgba(164, 6, 4, 0.4)", // red-ish shadow
        }}
      >
        <h1
          className="text-[22px] font-bold uppercase mb-4 text-center text-nowrap"
          style={{ color: "#a20604", letterSpacing: "0.05em" }}
        >
          Terms & Conditions
        </h1>

        <div className="space-y-4 text-[15px] font-medium leading-relaxed">
          <p style={{ color: "#3b2300" }}>
            By accessing and using this platform, you agree to comply with the following 
            Terms & Conditions. Please read them carefully before participating 
            in any lottery or purchasing any tickets.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            1. Eligibility
          </h2>
          <p style={{ color: "#3b2300" }}>
            Users must be at least 18 years old to participate. By using this platform, 
            you confirm that all provided information is accurate and truthful.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            2. Ticket Purchases
          </h2>
          <p style={{ color: "#3b2300" }}>
            Once a ticket is purchased, it cannot be canceled, modified, or refunded. 
            The system automatically assigns ticket numbers, and availability depends 
            on live inventory.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            3. Draw Timing & Results
          </h2>
          <p style={{ color: "#3b2300" }}>
            All draw times are final. Delays may occur due to technical or operational 
            issues. Results displayed on this platform are official and binding.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            4. Winnings & Payouts
          </h2>
          <p style={{ color: "#3b2300" }}>
            Winnings will be credited to your registered wallet or bank account after 
            verification. The platform is not responsible for delays caused by banking 
            networks or incomplete user details.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            5. Responsible Gaming
          </h2>
          <p style={{ color: "#3b2300" }}>
            Users are encouraged to play responsibly. The platform reserves the right 
            to suspend accounts showing misuse, fraud, or harmful gaming behavior.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            6. Platform Rights
          </h2>
          <p style={{ color: "#3b2300" }}>
            We reserve the right to update, modify, or terminate services without 
            prior notice. Continued use of the platform implies acceptance 
            of updated terms.
          </p>

          <p className="pt-4 text-center font-semibold" style={{ color: "#a20604" }}>
            Thank you for using our platform. Play responsibly and good luck!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
