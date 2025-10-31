import React from "react";

const ResponsibleGambling = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      {/* Header */}
      <h1 className="text-green-700 text-lg font-bold mb-4">
        🎯 Responsible Gambling
      </h1>

      {/* Info Sections */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-4 w-full max-w-md">
        <h2 className="text-green-600 text-sm font-semibold mb-2">
          💡 Play Responsibly
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          Lottery and gaming are meant to be a source of fun and entertainment.
          Always play responsibly and spend only what you can afford to lose.
          Treat it as recreation, not as a way to earn income.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4 mb-4 w-full max-w-md">
        <h2 className="text-green-600 text-sm font-semibold mb-2">
          ⏳ Know Your Limits
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          Set a budget and time limit before you start. Avoid chasing your
          losses and take breaks regularly. If you ever feel pressured or
          frustrated, stop and take a step back.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4 mb-4 w-full max-w-md">
        <h2 className="text-green-600 text-sm font-semibold mb-2">
          🚫 Underage Gambling
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          Players must be 18 years or older to participate in lottery games.
          We strictly prohibit underage gambling. Parents are encouraged to
          supervise online activity to prevent access by minors.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4 mb-4 w-full max-w-md">
        <h2 className="text-green-600 text-sm font-semibold mb-2">
          🧘‍♀️ Seek Help If Needed
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          If gambling starts affecting your personal or financial well-being,
          seek help early. Support is confidential and available 24/7.
        </p>
        <ul className="text-gray-700 text-xs mt-2 list-disc ml-4">
          <li>📞 National Helpline: 1800-123-4567</li>
          <li>🌐 www.responsiblegambling.org</li>
        </ul>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-gray-500 text-center mt-4 max-w-md">
        Play smart. Stay in control. Gambling should always remain enjoyable.
      </p>
    </div>
  );
};

export default ResponsibleGambling;
