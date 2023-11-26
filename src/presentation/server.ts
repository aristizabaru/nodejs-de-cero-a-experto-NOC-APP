import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"


const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())
const emailService = new EmailService()

export class Server {
    public static start() {
        console.log('Server started...')

        new SendEmailLogs(emailService, fileSystemLogRepository).execute(
            [
                'andres.aristizabal@gmail.com',
                'andres.aristizabal@tekiagency.com',
                'andres.aristizabal@plm.com.co',
            ])

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url: string = 'https://google.com'
        //         // const url: string = 'http://localhost:3000'

        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )
    }
}