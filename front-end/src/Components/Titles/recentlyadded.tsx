//# Components //
import TitleGrid from '../Global/Titles/titlesgrid'
//# Libs //
import { useState, useEffect } from 'react'
//# Api //
import { GetAllTitles } from '../../Shared/api/FetchTitle'
//# Types //
import { title } from '../../Shared/types/Data/title'
//# Classes //
import './recentlyadded.scss'

export default function RecentlyAdded() {
    const [data, setData] = useState<title[]>([])

    async function req() {
        setData(await GetAllTitles(50))
    }

    useEffect(() => {
        req()
    }, [])

    return (
        <>
            <div className='recentlyadded'>
                <section className='recentlyadded__result'>
                    <TitleGrid data={data} variant={'card'} />
                </section>
            </div>
        </>
    )
}