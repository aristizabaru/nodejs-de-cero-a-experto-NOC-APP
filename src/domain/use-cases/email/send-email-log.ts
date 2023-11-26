import { EmailService } from "../../../presentation/email/email-service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {

    }

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Log email sent',
                origin: 'send-email-log.ts'
            })
            this.logRepository.saveLog(log)

            if (!sent) {
                throw new Error('Email log not sent')
            }

            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-log.ts'
            })
            this.logRepository.saveLog(log)

            return false
        }
    }
}