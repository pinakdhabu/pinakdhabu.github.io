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
    <div className="bg-neutral-100 dark:bg-neutral-800 shadow-lg rounded-lg p-6 mb-6 border border-neutral-200 dark:border-neutral-700">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
        Generated Command
      </h2>
      <div className="relative">
        <pre className="bg-neutral-200 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-4 rounded-md overflow-x-auto font-mono text-sm">
          <code>{commandString || '...'}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-800 focus:ring-primary-500 disabled:opacity-50 transition"
          disabled={!commandString}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default GeneratedCommand;
