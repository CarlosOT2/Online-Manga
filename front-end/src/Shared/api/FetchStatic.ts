//# Services //
import PerformFetch from './PerformFetch'
//# Types //
import { staticDataArray } from '../types/Data/static'

export async function GetAllStatic() {
    return await PerformFetch<staticDataArray>({ url: `/static` })
}


