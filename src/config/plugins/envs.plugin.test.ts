import { envs } from "./envs.plugin"

describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'andres.aristizabal@gmail.com',
            MAILER_SECRET_KEY: 'rqpfbqavrynobcme',
            PROD: false,
            MONGO_URL: 'mongodb://aristizabaru:123456789@localhost:27017',
            MONTO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'aristizabaru',
            MONGO_PASS: '123456789'
        })
    })
})