import { PrismaClient, SeverityLevel } from "@prisma/client"
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo"

const prisma = new PrismaClient()

const severyEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgressDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await prisma.logModel.create({
            data: {
                level: severyEnum[log.level],
                message: log.message,
                origin: log.origin,
            }
        })

        console.log('Postgres log created', newLog.id)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await prisma.logModel.findMany({
            where: {
                level: severyEnum[severityLevel],
            }
        })

        return logs.map(postgresLog => LogEntity.fromObjetc(postgresLog))
    }

}