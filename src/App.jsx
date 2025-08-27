import { useState, useEffect } from 'react';
import Header from './components/Header';
import CommandSelector from './components/CommandSelector';
import OptionsPanel from './components/OptionsPanel';
import GeneratedCommand from './components/GeneratedCommand';
import Examples from './components/Examples';
import { commands } from './data';

function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (userPrefersDark ? 'dark' : 'light');
  });

  // Command generator state
  const [selectedCommandName, setSelectedCommandName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [commandString, setCommandString] = useState('');

  // Effect to apply theme class to body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect to update command string when options change
  useEffect(() => {
    if (!selectedCommandName) {
      setCommandString('');
      return;
    }
    const commandParts = [selectedCommandName];
    for (const [option, value] of Object.entries(selectedOptions)) {
      if (value) {
        if (typeof value === 'boolean') {
          commandParts.push(option);
        } else {
          commandParts.push(`${option} "${value}"`);
        }
      }
    }
    setCommandString(commandParts.join(' '));
  }, [selectedCommandName, selectedOptions]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleCommandChange = (commandName) => {
    setSelectedCommandName(commandName);
    setSelectedOptions({}); // Reset options when command changes
  };

  const handleOptionChange = (option, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }));
  };

  const selectedCommand = commands.find(cmd => cmd.name === selectedCommandName);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans`}>
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          {/* Left Column */}
          <div>
            <CommandSelector commands={commands} onCommandChange={handleCommandChange} />
            {selectedCommand && (
              <OptionsPanel
                options={selectedCommand.options}
                onOptionChange={handleOptionChange}
              />
            )}
          </div>

          {/* Right Column */}
          <div>
            <GeneratedCommand commandString={commandString} />
            {selectedCommand && <Examples examples={selectedCommand.examples} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
