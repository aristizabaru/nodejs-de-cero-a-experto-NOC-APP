import { CronService } from "./cron/cron-service"

export class Server {
    public static start() {
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date()
                console.log('Every 5 seconds', date.toLocaleTimeString('co-CO'))
            }
        )
    }
}