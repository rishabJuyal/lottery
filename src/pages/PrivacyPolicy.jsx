import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl p-6 shadow-lg"
        style={{
          backgroundColor: "#fff7da",             // cream background
          border: "3px solid #a20604",            // red border
          borderRadius: "0",
          boxShadow: "0 6px 16px rgba(164, 6, 4, 0.4)", // red glow shadow
        }}
      >
        <h1
          className="text-2xl font-bold uppercase mb-4 text-center"
          style={{ color: "#a20604", letterSpacing: "0.05em" }}
        >
          Privacy Policy
        </h1>

        <div className="space-y-4 text-[15px] font-medium leading-relaxed">
          <p style={{ color: "#3b2300" }}>
            Your privacy is important to us. This Privacy Policy explains how we collect,
            use, and safeguard your information when you use our lottery platform.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            1. Information We Collect
          </h2>
          <p style={{ color: "#3b2300" }}>
            We collect personal details you provide such as name, phone number, email,
            bank/UPI information, and gameplay activity. Technical data such as device
            information and IP address may also be collected for security and analytics.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            2. How We Use Your Information
          </h2>
          <p style={{ color: "#3b2300" }}>
            Your data is used to process transactions, verify identity, improve the
            gaming experience, prevent fraudulent activity, and comply with legal
            obligations. We do not sell your information to third parties.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            3. Data Security
          </h2>
          <p style={{ color: "#3b2300" }}>
            We use modern encryption, authentication, and monitoring tools to protect
            your information. However, no online platform is 100% secure. You are
            responsible for keeping your login credentials safe.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            4. Third-Party Services
          </h2>
          <p style={{ color: "#3b2300" }}>
            Payment gateways, analytics tools, or verification services may receive only
            the information required to complete their functions. These services follow
            their own privacy policies.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            5. User Rights
          </h2>
          <p style={{ color: "#3b2300" }}>
            You may request corrections, deletions, or access to your stored personal data.
            You can also opt out of non-essential notifications anytime through settings.
          </p>

          <h2 className="font-bold text-lg" style={{ color: "#e63820" }}>
            6. Updates to This Policy
          </h2>
          <p style={{ color: "#3b2300" }}>
            We may update this Privacy Policy periodically. Continued use of the platform
            after updates means you accept the revised terms.
          </p>

          <p className="pt-4 text-center font-semibold" style={{ color: "#a20604" }}>
            Thank you for trusting our platform. Your data safety is our priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
