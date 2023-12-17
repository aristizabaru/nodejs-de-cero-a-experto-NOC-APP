import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-msessage',
        level: LogSeverityLevel.low
    })

    class MockLogDatasource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('should test the interface', async () => {
        const mockLogDatasource = new MockLogDatasource()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDatasource.saveLog).toBe('function')
        expect(typeof mockLogDatasource.getLogs).toBe('function')

        await mockLogDatasource.saveLog(newLog)
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)
    })
})