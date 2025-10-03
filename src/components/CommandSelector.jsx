import React from 'react';

const CommandSelector = ({ commands, onCommandChange }) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 shadow-lg rounded-lg p-6 mb-6 border border-neutral-200 dark:border-neutral-700">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
        Select a Command
      </h2>
      <select
        onChange={(e) => onCommandChange(e.target.value)}
        className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
      >
        <option value="">--Please choose a command--</option>
        {commands.map((cmd) => (
          <option key={cmd.name} value={cmd.name}>
            {cmd.name} - {cmd.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommandSelector;
