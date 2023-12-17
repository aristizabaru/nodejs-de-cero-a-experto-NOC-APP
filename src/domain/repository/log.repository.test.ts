import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "./log.repository";

describe('log.repository.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-msessage',
        level: LogSeverityLevel.low
    })

    class MockLogReposotory implements LogRepository {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('should test the interface', async () => {
        const mockLogReposotory = new MockLogReposotory()

        expect(mockLogReposotory).toBeInstanceOf(MockLogReposotory)
        expect(typeof mockLogReposotory.saveLog).toBe('function')
        expect(typeof mockLogReposotory.getLogs).toBe('function')

        await mockLogReposotory.saveLog(newLog)
        const logs = await mockLogReposotory.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)
    })
})