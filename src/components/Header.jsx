import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, onToggleTheme }) => {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Linux Command Generator
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Build and explore commands for any distro
          </p>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default Header;
