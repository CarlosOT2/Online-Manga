//.. Types
type config = {
    method?: string
    headers?: { [key: string]: string }
    body?: string | null
    url: string
}
//.. API Url 
const APIUrl = import.meta.env.VITE_API_URL;

/**
 * **Performs HTTPS request using fetch with provided config**
 *
 * @returns {Promise<any>} return res.json() as T
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
        const res = await fetch(`${APIUrl}${url}`, { method, headers, body, })
        if (!res.ok) { 
            throw new Error(`${res.status} HTTP CODE; ${await res.text()}`) 
        }
        return res.json() as T
    } catch (err) {
        if (err instanceof Error) {
            console.error(`ERROR: ${err.message}`)
        }
        throw err
    }
}

