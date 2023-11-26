import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export interface LogRepository {
    saveLog(log: LogEntity): Promise<void>
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}