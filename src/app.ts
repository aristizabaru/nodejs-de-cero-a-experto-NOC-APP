import { envs } from "./config/plugins/envs.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"

const main = async () => {

    await MongoDatabase.connect({ dbName: envs.MONTO_DB_NAME, mongoUrl: envs.MONGO_URL })

    Server.start()
}

(async () => {
    await main()
})()
