//# Components //
import FeaturedTitles from '../Global/Titles/featuredtitles'
import Text from '../Global/text'
//# Libs //
import { useState, useEffect } from 'react'
//# Api //
import { GetAllTitles } from '../../Shared/api/FetchTitle'
//# Types //
import { title } from '../../Shared/types/Data/title'
//# Classes //
import './popular.scss'

export default function Popular() {
    const [data, setData] = useState<title[]>([])

    // essa data aqui é temporaria, ela vai ser utilizada para testar o popular/featuredtitles
    async function req() {
        setData(await GetAllTitles(1))
    }

    useEffect(() => {
        req()
    }, [])

    return (
        <>
            <div className='home-popular'>
                <FeaturedTitles data={data}/>
            </div>
        </>
    )
}