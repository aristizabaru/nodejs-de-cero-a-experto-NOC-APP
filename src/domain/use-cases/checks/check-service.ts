// Caso de uso - check service

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

export class CheckService implements CheckServiceUseCase {
    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            console.log(`${url} is ok`)

            return true
        } catch (error) {
            console.log(`${error}`)

            return false
        }
    }
}