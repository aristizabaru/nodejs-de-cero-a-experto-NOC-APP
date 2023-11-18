import 'dotenv/config'
import { Server } from "./presentation/server"
import { envs } from './config/plugins/envs.plugin'

const main = async () => {
    // Server.start()
    console.log(envs)
}

(async () => {
    await main()
})()
