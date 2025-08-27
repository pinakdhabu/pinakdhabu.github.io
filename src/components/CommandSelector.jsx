import React from 'react';

const CommandSelector = ({ commands, onCommandChange }) => {
  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Select a Command
      </h2>
      <select
        onChange={(e) => onCommandChange(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
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
