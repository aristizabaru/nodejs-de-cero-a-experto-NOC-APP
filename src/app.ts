import { PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/envs.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"

const main = async () => {

    await MongoDatabase.connect({ dbName: envs.MONTO_DB_NAME, mongoUrl: envs.MONGO_URL })

    const prisma = new PrismaClient()
    const newLog = await prisma.logModel.create({
        data: {
            level: 'HIGH',
            message: 'Test message',
            origin: 'app.ts'
        }
    })

    console.log({ newLog })

    // Server.start()
}

(async () => {
    await main()
})()
