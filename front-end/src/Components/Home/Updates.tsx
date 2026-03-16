//# Components //
import Text from '../Global/text'
import TitleGrid from '../Global/Titles/titlesgrid'
//# Libs //
import { useState, useEffect } from 'react'
//# Api //
import { GetAllTitles } from '../../Shared/api/FetchTitle'
//# Types //
import { title } from '../../Shared/types/Data/title'
//# Classes //
import './updates.scss'

export default function Updates() {
    const [data, setData] = useState<title[]>([])
    // essa data aqui é temporaria, ela apenas pega uma tabela titles, para ser usado como teste, utilizado em ambos.
    async function req() {
        setData(await GetAllTitles(50))
    }

    useEffect(() => {
        req()
    }, [])

    return (
        <div className='home-updates'>

            <section className='home-updates__section'>
                <Text tag='h2' title={true}>
                    Latest Updates
                </Text>
                <TitleGrid data={data} variant='compact' />
            </section>

            <section className='home-updates__section'>
                <Text tag='h2' title={true}>
                    Recently Added
                </Text>
                <TitleGrid data={data} variant='compact' />
            </section>
        </div>
    )
}