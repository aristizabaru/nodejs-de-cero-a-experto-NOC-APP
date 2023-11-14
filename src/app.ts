import { Server } from "./presentation/server"

const main = async () => {
    Server.start()
}

(async () => {
    await main()
})()
