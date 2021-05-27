import path from 'path';
import arg from 'arg';
import build from './build';
import dev from './dev';

const VERSION = '1.0.0';

const defaultCommand = 'dev';
const commands = {
    build,
    dev
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
    console.log(`webshift v${VERSION}`)
    process.exit(0)
}

const foundCommand = Boolean(commands[args._[0]]);

if (!foundCommand && args['--help']) {
    console.log(`
        Usage
          $ webshift <command>
        Available commands
          ${Object.keys(commands).join(', ')}
        Options
          --version, -v   Version number
          --help, -h      Displays this message
        For more information run a command with the --help flag
          $ webshift build --help
    `);
    process.exit(0);
}

const command = foundCommand ? args._[0] : defaultCommand;
const forwardedArgs = foundCommand ? args._.slice(1) : args._;

if (!foundCommand) {
    console.error(
        `[Error] No command is defined. Please use $webshift <${Object.keys(commands).join('|')}>`
    );
    process.exit(0);
}

// Cover `webshift <subcommand> --help` case
if (args['--help']) {
    forwardedArgs.push('--help');
}

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
console.log(forwardedArgs);
console.log(process.cwd())
commands[command](forwardedArgs);

// const child = spawn('node', [path.resolve(__dirname, 'build.js')]);
//
// child.on('exit', (code) => {
//     console.log(`Child process exited with code ${code}`);
// });
// child.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });
// child.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });
