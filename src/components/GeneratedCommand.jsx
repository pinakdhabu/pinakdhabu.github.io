import React, { useState } from 'react';

const GeneratedCommand = ({ commandString }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (commandString) {
      navigator.clipboard.writeText(commandString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Generated Command
      </h2>
      <div className="relative">
        <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded-md overflow-x-auto">
          <code>{commandString || '...'}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={!commandString}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default GeneratedCommand;
