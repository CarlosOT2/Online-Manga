//# Components //
import TitleGrid from '../Global/Titles/titlesgrid'
//# Libs //
import { useState, useEffect } from 'react'
//# Api //
import { GetAllTitles } from '../../Shared/api/FetchTitle'
//# Types //
import { title } from '../../Shared/types/Data/title'
//# Classes //
import './latestupdates.scss'

export default function LatestUpdates() {
    const [data, setData] = useState<title[]>([])
    
    async function req() {
        setData(await GetAllTitles(50))
    }

    useEffect(() => {
        req()
    }, [])

    return (
        <>
            <div className='latestupdates'>
                <section className='latestupdates__result'>
                    <TitleGrid data={data} variant={'card'} />
                </section>
            </div>
        </>
    )
}