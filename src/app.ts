import { envs } from "./config/plugins/envs.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"

const main = async () => {

    await MongoDatabase.connect({ dbName: envs.MONTO_DB_NAME, mongoUrl: envs.MONGO_URL })

    // Crear colección = tablas, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // })

    // await newLog.save()

    console.log(newLog)
    // Server.start()
}

(async () => {
    await main()
})()
