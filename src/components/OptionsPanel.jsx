import React from 'react';

const OptionsPanel = ({ options, onOptionChange }) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 shadow-lg rounded-lg p-6 mb-6 border border-neutral-200 dark:border-neutral-700">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
        Command Options
      </h2>
      <div className="space-y-6">
        {options.map((opt) => (
          <div key={opt.flag}>
            {opt.type === 'input' ? (
              <div>
                <label htmlFor={opt.flag} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {opt.flag}
                </label>
                 <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{opt.description}</p>
                <input
                  type="text"
                  id={opt.flag}
                  onChange={(e) => onOptionChange(opt.flag, e.target.value)}
                  placeholder="Enter value..."
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                />
              </div>
            ) : (
              <label className="flex items-center space-x-3 p-3 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => onOptionChange(opt.flag, e.target.checked)}
                  className="h-5 w-5 rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500 bg-neutral-50 dark:bg-neutral-700"
                />
                <div>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{opt.flag}</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{opt.description}</p>
                </div>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsPanel;
