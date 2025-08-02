//# Components //
import Text from '../Global/text'
import Link from '../Global/link'
//# Libs //
import { useState, useEffect } from 'react'
//# Helpers //
import PerformFetch from '../../Helpers/PerformFetch'
import chunkArray from '../../Helpers/chunkArray'
//# Types //
import { title } from '../../Types/title'
//# Config //
import { columns, m_perColumn } from '../../config/Home/UpdatesConfig'
//# Classes //
import './updates.scss'


//.. Functions
function UpdatesMangas({ data }: { data: title[] }) {
    /*
    a Imagem por enquanto vai ser que está em public, depois que eu configurar o servidor vou utilizar as imagens
    armazenadas em data, que seria 'manga.img'
    */

    const OrganizedData = chunkArray<title>(data, m_perColumn).slice(0, columns);
     
    return (
        <>
            {
                OrganizedData.map((subArray, s_index) => (
                    <div className='home-updates__mangas' key={`mangas-${s_index}`}>
                        {
                            subArray.map((manga, m_index) => (
                                <div key={`item-${m_index}`}>
                                    <Link to={`/title/${manga.id}/${manga.name}`} className='home-updates__mangas-link'>
                                        <img className={'home-updates__mangas-img'} src={`public/manga-teste.jpg`}>
                                        </img>
                                        <div className='home-updates__mangas-info'>

                                            <Text not_exceed={true} className={`home-updates__mangas-name`} tag={'span'}>
                                                {manga.name}
                                            </Text>
                                            <Text not_exceed={true} className={`home-updates__mangas-author`} tag={'span'}>
                                                {manga.author}
                                            </Text>
                                        </div>
                                    </Link>
                                </div>

                            ))
                        }
                    </div>
                ))
            }

        </>
    )
}

export default function Updates() {

    const [data, setData] = useState<title[]>([])
    // essa data aqui é temporaria, ela apenas pega uma tabela de mangas, para ser usado como teste, utilizado em ambos.
    async function req() {
        setData(await PerformFetch<title[]>({ url: 'https://localhost:8081/title' }))
    }

    useEffect(() => {
        req()
    }, [])

    return (
        <section className='home-updates'>
            <Text tag='span' title={true} margin={true}>
                Latest Updates
            </Text>
            <section className='home-updates__section'>
                <UpdatesMangas data={data} />
            </section>
            <Text tag='span' title={true} margin={true}>
                Recently Added
            </Text>
            <section className='home-updates__section'>
                <UpdatesMangas data={data} />
            </section>
        </section>
    )
}