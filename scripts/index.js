import arg from 'arg';
import child_process from 'child_process';

const VERSION = '1.0.0';

const commands = {
    build: () => {},
    dev: () => {}
};

const args = arg(
    {
        // Types
        '--version': Boolean,
        '--help': Boolean,
        '--inspect': Boolean,

        // Aliases
        '-v': '--version',
        '-h': '--help',
    },
    {
        permissive: true,
    }
);

if (args['--version']) {
    console.log(`Radaller v${VERSION}`)
    process.exit(0)
}

const foundCommand = Boolean(commands[args._[0]]);

if (!foundCommand && args['--help']) {
    console.log(`
        Usage
          $ radaller <command>
        Available commands
          ${Object.keys(commands).join(', ')}
        Options
          --version, -v   Version number
          --help, -h      Displays this message
        For more information run a command with the --help flag
          $ radaller build --help
    `);
    process.exit(0);
}

const forwardedArgs = foundCommand ? args._.slice(1) : args._;

if (!foundCommand) {
    console.error(
        `[Error] No command is defined. Please use $radaller <${Object.keys(commands).join('|')}>`
    );
    process.exit(0);
}

// Cover `radaller <subcommand> --help` case
if (args['--help']) {
    forwardedArgs.push('--help');
}
