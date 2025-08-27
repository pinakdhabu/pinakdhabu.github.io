import React from 'react';

const Examples = ({ examples }) => {
  if (!examples) {
    return null;
  }

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Usage Examples
      </h2>
      <div className="space-y-4">
        {Object.entries(examples).map(([distro, example]) => (
          <div key={distro}>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">{distro}</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-3 mt-1 rounded-md overflow-x-auto">
              <code>{example}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
