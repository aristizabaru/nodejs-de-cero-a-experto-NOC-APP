import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log"
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { MongoDataSource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgressDataSource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoDataSource()
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgressDataSource()
)

const emailService = new EmailService()

export class Server {
    public static async start() {
        console.log('Server started...')

        // new SendEmailLogs(emailService, fsLogRepository).execute(
        //     [
        //         'andres.aristizabal@gmail.com',
        //         'andres.aristizabal@tekiagency.com',
        //         'andres.aristizabal@plm.com.co',
        //     ])

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url: string = 'https://google.com'
                // const url: string = 'http://localhost:3000'

                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => {
                        console.log(error)
                    }
                ).execute(url)
            }
        )
    }
}