// Caso de uso - check service

import { LogRepository } from "../../repository/log.repository"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckServiceMultiple implements CheckServiceUseCase {

    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    private callLogs(log: LogEntity) {
        this.logRepositories.forEach(logRepository => {
            logRepository.saveLog(log)
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            })

            this.callLogs(log)
            this.successCallback && this.successCallback()

            return true
        } catch (error) {

            const errorMessage: string = `${error}`

            const log = new LogEntity({
                message: `${url} is not ok. ${errorMessage}`,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            })
            this.callLogs(log)

            this.errorCallback && this.errorCallback(errorMessage)

            return false
        }
    }
}