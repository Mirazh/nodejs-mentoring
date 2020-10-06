import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    sequelize: 3,
    debug: 4
};

const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

export const logger = winston.createLogger({
    levels,
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            format
        })
    ]
});

