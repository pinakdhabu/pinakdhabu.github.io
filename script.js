document.addEventListener('DOMContentLoaded', () => {
    // Theme switching logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', theme);
    };

    const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(preferredTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });


    // Command generator logic
    const commands = [
        {
            name: 'ls',
            description: 'List directory contents',
            options: [
                { flag: '-l', description: 'Use a long listing format' },
                { flag: '-a', description: 'Do not ignore entries starting with .' },
                { flag: '--human-readable', description: 'with -l, print sizes in human readable format (e.g., 1K 234M 2G)' }
            ],
            examples: {
                Debian: 'ls -l /var/log',
                RHEL: 'ls -a ~',
                Arch: 'ls --human-readable /'
            }
        },
        {
            name: 'grep',
            description: 'Print lines that match patterns',
            options: [
                { flag: '-i', description: 'Ignore case distinctions in patterns and data' },
                { flag: '-v', description: 'Invert the sense of matching, to select non-matching lines' },
                { flag: '-r', description: 'Read all files under each directory, recursively' }
            ],
            examples: {
                Debian: `grep -r "error" /var/log/`,
                RHEL: `grep -i "user" /etc/passwd`,
                Arch: `ps aux | grep -v "root"`
            }
        },
        {
            name: 'find',
            description: 'Search for files in a directory hierarchy',
            options: [
                { flag: '-name', description: 'Pattern for the file name' , type: 'input'},
                { flag: '-type', description: 'File is of type [f=file, d=directory]' , type: 'input'},
                { flag: '-mtime', description: 'File\'s data was last modified n*24 hours ago', type: 'input' }
            ],
            examples: {
                Debian: `find /home -name "*.txt"`,
                RHEL: `find /var/log -type f -mtime -7`,
                Arch: `find . -type d -name "config*"`
            }
        }
    ];

    const commandSelect = document.getElementById('command-select');
    const optionsContainer = document.getElementById('command-options-container');
    const optionsEl = document.getElementById('command-options');
    const optionsTitle = document.getElementById('options-title');
    const generatedCommandEl = document.getElementById('generated-command');
    const examplesContainer = document.getElementById('command-examples-container');
    const examplesEl = document.getElementById('command-examples');
    const examplesTitle = document.getElementById('examples-title');
    const copyButton = document.getElementById('copy-button');

    // Populate command select dropdown
    commands.forEach(command => {
        const option = document.createElement('option');
        option.value = command.name;
        option.textContent = `${command.name} - ${command.description}`;
        commandSelect.appendChild(option);
    });

    commandSelect.addEventListener('change', () => {
        const selectedCommandName = commandSelect.value;
        const selectedCommand = commands.find(c => c.name === selectedCommandName);

        updateUIForCommand(selectedCommand);
    });

    function updateUIForCommand(command) {
        if (!command) {
            optionsContainer.style.display = 'none';
            examplesContainer.style.display = 'none';
            generatedCommandEl.textContent = '';
            return;
        }

        // Show containers
        optionsContainer.style.display = 'block';
        examplesContainer.style.display = 'block';

        // Update titles
        optionsTitle.textContent = `Options for "${command.name}"`;
        examplesTitle.textContent = `Examples for "${command.name}"`;

        // Populate options
        optionsEl.innerHTML = '';
        command.options.forEach(opt => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';

            const input = document.createElement('input');
            input.dataset.flag = opt.flag;

            if(opt.type === 'input') {
                input.type = 'text';
                input.placeholder = `Enter value for ${opt.flag}`;
                input.className = 'form-control';
            } else {
                input.type = 'checkbox';
            }

            const label = document.createElement('label');
            label.htmlFor = `opt-${opt.flag}`;
            label.textContent = `${opt.flag}: ${opt.description}`;

            if(opt.type !== 'input') {
                optionDiv.appendChild(input);
            }
            optionDiv.appendChild(label);
            if(opt.type === 'input') {
                optionDiv.appendChild(input);
            }

            optionsEl.appendChild(optionDiv);

            input.addEventListener('change', () => updateGeneratedCommand(command));
            input.addEventListener('keyup', () => updateGeneratedCommand(command));
        });

        // Populate examples
        examplesEl.innerHTML = '';
        for (const distro in command.examples) {
            const exampleDiv = document.createElement('div');
            exampleDiv.className = 'example';
            exampleDiv.innerHTML = `<strong>${distro}:</strong><pre><code>${command.examples[distro]}</code></pre>`;
            examplesEl.appendChild(exampleDiv);
        }

        updateGeneratedCommand(command);
    }

    function updateGeneratedCommand(command) {
        let cmdString = command.name;
        const selectedOptions = optionsEl.querySelectorAll('input:checked, input[type="text"]');

        selectedOptions.forEach(input => {
            if (input.type === 'checkbox' && input.checked) {
                cmdString += ` ${input.dataset.flag}`;
            } else if (input.type === 'text' && input.value) {
                cmdString += ` ${input.dataset.flag} ${input.value}`;
            }
        });

        generatedCommandEl.textContent = cmdString;
    }

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedCommandEl.textContent).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy to Clipboard';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});
