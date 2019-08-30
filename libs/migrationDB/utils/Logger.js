
const { createLogger, format, transports } = require("winston")
const moment =require("moment")
const path =require("path")

const AppConfig =require("../config/AppConfig")

const logPath = path.join(__dirname, `../../logs/${moment().format("YYYY/MM/DD")}`)

const myFormat = format.json(({ level, message, label, timestamp }) => {
    return {
        timestamp,
        level,
        label,
        message
    }
})


const logger = createLogger({
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat
    ),

    transports: [
        new transports.Console({
            format: format.prettyPrint()
        }),
        // Write all logs error (and below) to `error.log`
        new transports.File({
            maxsize: AppConfig.LOGGER_FILE_MAX_SIZE,
            maxFiles: AppConfig.LOGGER_FILE_MAX_FILES,
            filename: `${logPath}/erorr.log`,
            level: "error"
        }),
        // Write to all logs with level `info` and below to `combined.log`
        new transports.File({
            maxsize: AppConfig.LOGGER_FILE_MAX_SIZE,
            maxFiles: AppConfig.LOGGER_FILE_MAX_FILES,
            filename: `${logPath}/combined.log`
        })
    ]
})


module.exports = logger