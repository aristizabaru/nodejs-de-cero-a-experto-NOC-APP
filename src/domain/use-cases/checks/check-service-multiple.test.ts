import { LogEntity } from "../../entities/log.entity"
import { CheckServiceMultiple } from "./check-service-multiple"

describe('check-service-multiple.ts', () => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call successCallback when fetch returns true', async () => {
        const checkService = new CheckServiceMultiple(
            [mockRepository1, mockRepository2, mockRepository3],
            successCallback,
            errorCallback
        )

        const isSuccessful = await checkService.execute('http://google.com')

        expect(isSuccessful).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

    test('should call errorCallback when fetch returns fails', async () => {
        const checkService = new CheckServiceMultiple(
            [mockRepository1, mockRepository2, mockRepository3],
            successCallback,
            errorCallback
        )

        const isSuccessful = await checkService.execute('http://googlexxxxxxxxx.com')

        expect(isSuccessful).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})