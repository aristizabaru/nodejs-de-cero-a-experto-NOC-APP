import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"


const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
    public static start() {
        console.log('Server started...')

        const emailService = new EmailService(fileSystemLogRepository)

        emailService.sendEmailWithFileSystemLogs(
            ['andres.aristizabal@gmail.com', 'danyramirezm93@hotmail.com']
        )

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url: string = 'https://google.com'
                // const url: string = 'http://localhost:3000'

                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url)
            }
        )
    }
}