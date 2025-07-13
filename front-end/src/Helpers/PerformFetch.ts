//.. Types

type config = {
    method?: string
    headers?: { [key: string]: string }
    body?: string | null
    url: string
}

/**
 * **Performs HTTPS request using fetch with provided config**
 *
 * @param config Contains configuration object
 * @returns {Promise<any>} return res.json()
 * @throws {Error} 
 */
export default async function PerformFetch<T>(config: config): Promise<T> {
    const {
        method = "GET",
        headers = {},
        body = null,
        url = ""
    } = config

    try {
        const res = await fetch(url, { method, headers, body, })
        return res.json() as T
    } catch (err) {
        if (err instanceof Error) {
            console.error(`ERROR: ${err.message}`)
        }
        throw err
    }
}

