import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.impl"

describe('log.repository.impl.ts', () => {

    const mockDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const log = new LogEntity({
        message: 'Test',
        level: LogSeverityLevel.high,
        origin: 'file-system.datasource.test.ts'
    })

    const logRepository = new LogRepositoryImpl(mockDatasource)

    beforeAll(() => {
        jest.clearAllMocks()
    })

    test('saveLog should call the datasource with arguments', async () => {
        await logRepository.saveLog(log)

        expect(mockDatasource.saveLog).toHaveBeenCalledWith(log)

    })

    test('getLogs should call the datasource with arguments', async () => {
        await logRepository.getLogs(LogSeverityLevel.low)
        expect(mockDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
    })
})