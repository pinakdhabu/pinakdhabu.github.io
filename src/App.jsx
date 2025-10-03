import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans`}>
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          {/* Left Column */}
          <div>
            <CommandSelector commands={commands} onCommandChange={handleCommandChange} />
            <AnimatePresence mode="wait">
              {selectedCommand && (
                <motion.div
                  key="options-panel"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={panelVariants}
                  transition={{ duration: 0.3 }}
                >
                  <OptionsPanel
                    options={selectedCommand.options}
                    onOptionChange={handleOptionChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div>
            <GeneratedCommand commandString={commandString} />
            <AnimatePresence>
              {selectedCommand && (
                <motion.div
                  key="examples"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={panelVariants}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Examples examples={selectedCommand.examples} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
