import React from 'react';

const OptionsPanel = ({ options, onOptionChange }) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Command Options
      </h2>
      <div className="space-y-4">
        {options.map((opt) => (
          <div key={opt.flag} className="flex items-center">
            {opt.type === 'input' ? (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {opt.flag}: {opt.description}
                </label>
                <input
                  type="text"
                  data-flag={opt.flag}
                  onChange={(e) => onOptionChange(opt.flag, e.target.value)}
                  placeholder={`Enter value for ${opt.flag}`}
                  className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            ) : (
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  data-flag={opt.flag}
                  onChange={(e) => onOptionChange(opt.flag, e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {opt.flag}: {opt.description}
                </span>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsPanel;
