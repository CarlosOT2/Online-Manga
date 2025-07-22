//# Components //
import Text from '../Global/text'
//# Libs //
import { useState, useEffect } from 'react'
//# Helpers //
import PerformFetch from '../../Helpers/PerformFetch'
import chunkArray from '../../Helpers/chunkArray'
//# Config //
import { columns, m_perColumn } from '../../config/Home/UpdatesConfig'
//# Classes //
import './Updates.scss'

//.. Tipos
type manga = {
    nome: string
    autor: string
    img: string
}

//.. Funções

function UpdatesMangas({ data }: { data: manga[] }) {
    /*
    a Imagem por enquanto vai ser que está em public, depois que eu configurar o servidor vou utilizar as imagens
    armazenadas em data, que seria 'manga.img'
    */

    const OrganizedData = chunkArray<manga>(data, m_perColumn).slice(0, columns);
    
    return (
        <>
            {
                OrganizedData.map((subArray, s_index) => (
                    <div className='home-updates__mangas' key={`mangas-${s_index}`}>
                        {
                            subArray.map((manga, m_index) => (
                                <div className='home-updates__mangas-item' key={`item-${m_index}`}>
                                    <img className={'home-updates__mangas-img'} src={`public/manga-teste.jpg`}>
                                    </img>
                                    <div className='home-updates__mangas-item-info'>
                                        <Text not_exceed={true} className={`home-updates__mangas-name`} tag={'span'}>
                                            {manga.nome}
                                        </Text>
                                        <Text not_exceed={true} className={`home-updates__mangas-author`} tag={'span'}>
                                            {manga.autor}
                                        </Text>
                                    </div>
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

    const [data, setData] = useState<manga[]>([])
    // essa data aqui é temporaria, ela apenas pega uma tabela de mangas, para ser usado como teste, utilizado em ambos.
    async function req() {
        setData(await PerformFetch<manga[]>({ url: 'https://localhost:8081/Mangas' }))
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