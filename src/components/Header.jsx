import React from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Header = ({ theme, onToggleTheme }) => {
  return (
    <header className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Logo />
          <div>
            <h1 className="text-xl font-bold text-neutral-800 dark:text-white">
              Linux Command Generator
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Build and explore commands for any distro
            </p>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default Header;
