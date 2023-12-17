import { EmailService } from "../../../presentation/email/email-service"
import { LogEntity } from "../../entities/log.entity"
import { SendEmailLogs } from "./send-email-log"

describe('send-email-log.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call sendEmail and saveLog', async () => {
        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockRepository)

        const result = await sendEmailLogs.execute('andres.aristizbal@gmail.com')

        expect(result).toBe(true)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockRepository)

        const result = await sendEmailLogs.execute('andres.aristizbal@gmail.com')

        expect(result).toBe(false)
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})