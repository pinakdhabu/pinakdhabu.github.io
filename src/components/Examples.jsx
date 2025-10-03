import React from 'react';

const Examples = ({ examples }) => {
  if (!examples) {
    return null;
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 shadow-lg rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
        Usage Examples
      </h2>
      <div className="space-y-4">
        {Object.entries(examples).map(([distro, example]) => (
          <div key={distro}>
            <h3 className="font-semibold text-neutral-700 dark:text-neutral-300 capitalize">{distro}</h3>
            <pre className="bg-neutral-200 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-3 mt-1 rounded-md overflow-x-auto font-mono text-sm">
              <code>{example}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
