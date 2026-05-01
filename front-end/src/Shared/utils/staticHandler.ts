//# Services //
import { GetAllStatic } from '../api/FetchStatic'

//.. Variáveis Globais //
const staticData = await GetAllStatic()

/**
 * **Converts a static-data ID (e.g., genre, theme, etc.) into a human-readable name.**
 */
export function staticMapper(category: keyof typeof staticData, id: number) {
    if (!staticData[category]) {
        console.warn('Warn: staticMapper, category could not be found, value:', category)
        return
    }
    return staticData[category].find(item => item.id === id)?.name;
}

/**
 * **Returns all keys from the object returned by `GetAllStatic()`**
 */
export function getAllStaticKeys(): (keyof typeof staticData)[] {
    return Object.keys(staticData) as (keyof typeof staticData)[]
}
