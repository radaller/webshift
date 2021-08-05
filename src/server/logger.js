import { format, createLogger, transports } from 'winston';

import stringify from 'fast-safe-stringify';

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: "YY-MM-DD HH:MM:SS"
        }),
        //format.json(),
        format.printf(
            ({ timestamp, level, message, ...args }) => {
                const meta = isEmpty(args) ? '' : stringify(args);
                return `${timestamp} - ${level}: ${message} ${meta}`;
            }
        ),
    ),
    transports: [
        new transports.Console({
            level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'verbose',
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});

export default logger;