import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.ts', () => {
    test('should create a log entety instance', () => {

        const dataObj = {
            message: 'Hola Mundo',
            level: LogSeverityLevel.high,
            origin: 'log.entity.ts'
        }

        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('should create a LogEntetity from json', () => {
        const strLog = '{"message":"Service https://google.com working","level":"low","createdAt":"2023-12-16T14:06:00.763Z","origin":"check-service.ts"}'
        const log = LogEntity.fromJson(strLog)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe('Service https://google.com working')
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe('check-service.ts')
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('should create a LogEntetity from Object', () => {
        const objLog = {
            message: 'Service https://google.com working',
            level: LogSeverityLevel.low,
            createdAt: new Date('2023-12-16T14:06:00.763Z'),
            origin: 'check-service.ts'
        }
        const log = LogEntity.fromObjetc(objLog)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(objLog.message)
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe(objLog.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})