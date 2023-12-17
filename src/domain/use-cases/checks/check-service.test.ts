import { LogEntity } from "../../entities/log.entity"
import { CheckService } from "./check-service"

describe('check-service.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call successCallback when fetch returns true', async () => {
        const checkService = new CheckService(mockRepository, successCallback, errorCallback)

        const isSuccessful = await checkService.execute('http://google.com')

        expect(isSuccessful).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

    test('should call errorCallbacke when fetch returns fails', async () => {
        const checkService = new CheckService(mockRepository, successCallback, errorCallback)

        const isSuccessful = await checkService.execute('http://googlexxxxxxxxx.com')

        expect(isSuccessful).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})