//# Services //
import PerformFetch from '../PerformFetch'
//# Types //
import { title } from '../../Types/Data/title'

export async function GetAllTitles(limit: number) {
    return await PerformFetch<title[]>({ url: `/title?limit=${limit}` })
}

export async function GetTitleById(id: number) {
    return await PerformFetch<title[]>({ url: `/title?id=${id}` })
}

