//# Services //
import PerformFetch from './PerformFetch'
//# Types //
import { title } from '../types/Data/title'

export async function GetAllTitles(limit: number) {
    return await PerformFetch<title[]>({ url: `/title?limit=${limit}` })
}

export async function GetTitleById(id: number) {
    return await PerformFetch<title[]>({ url: `/title?id=${id}` })
}

export async function GetTitlesByFilters(data: {
    name?: string,
    author?: string,
    artist?: string,
    genresIds?: number[] | string[],
    themesIds?: number[] | string[],
    statusIds?: number[] | string[],
    demographicIds?: number[] | string[],
    contentRatingIds?: number[] | string[],
    publicationYear?: number | string,
}) {

    const params = new URLSearchParams()
    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return

        if (Array.isArray(value)) {
            console.log(key)
            console.log(value)
            value.forEach(v => params.append(key, String(v)))
        } else {
            params.append(key, String(value))
        }
    })
    const query = params.toString()
    return await PerformFetch<title[]>({ url: `/title/search?${query}` })
}
