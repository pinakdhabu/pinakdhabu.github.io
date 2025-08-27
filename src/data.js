export const commands = [
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
