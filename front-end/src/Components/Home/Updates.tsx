//# Components //
import Text from '../Global/text'
import Link from '../Global/link'
import Img from '../Global/img'
//# Libs //
import { useState, useEffect } from 'react'
//# Services //
import { GetAllTitles } from '../../Services/api/FetchTitle'
//# Utils //
import chunkArray from '../../Utils/chunkArray'
import staticMapper from '../../Utils/staticMapper'
//# Types //
import { title } from '../../Types/Data/title'
//# Config //
import { columns, m_perColumn } from '../../config/Components/updates'
//# Classes //
import './updates.scss'


//.. Functions
function UpdatesTitles({ data }: { data: title[] }) {
    /*
    a Imagem por enquanto vai ser que está em public, depois que eu configurar o servidor vou utilizar as imagens
    armazenadas em data, que seria 'title.img'
    */

    const OrganizedData = chunkArray<title>(data, m_perColumn).slice(0, columns);

    return (
        <>
            {
                OrganizedData.map((subArray, s_index) => (
                    <ul className={'home-updates__section__titles-list'} key={`titles-${s_index}`}>
                        {
                            subArray.map((title, m_index) => (
                                <li key={`item-${m_index}`}>
                                    <Link to={`/title/${title.id}/${title.name}`} className='home-updates__titles-link'>
                                        <article>
                                            <Img className={'home-updates__titles-img'} src={`public/manga-teste.jpg`} alt={`Cover of ${title.name}`} />
                                            <div className='home-updates__titles-info'>
                                                <Text not_exceed={true} className={`home-updates__titles-name`} tag={'h3'}>
                                                    {title.name}
                                                </Text>
                                                <ul className='home-updates__titles-info__list'>
                                                    <li>
                                                        <Text no_select={true} not_exceed={true} className={`home-updates__titles-contentRating`} tag={'span'}>
                                                            {staticMapper("contentRatings", Number(title.contentRating))}
                                                        </Text>
                                                    </li>
                                                    <li>
                                                        <Text no_select={true} not_exceed={true} className={`home-updates__titles-demographic`} tag={'span'}>
                                                            {staticMapper("demographics", Number(title.demographic))}
                                                        </Text>
                                                    </li>
                                                </ul>
                                            </div>
                                        </article>
                                    </Link>
                                </li>

                            ))
                        }
                    </ul>
                ))
            }

        </>
    )
}

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
                <div className='home-updates__section__container'>
                    <UpdatesTitles data={data} />
                </div>
            </section>

            <section className='home-updates__section'>
                <Text tag='h2' title={true}>
                    Recently Added
                </Text>
                <div className='home-updates__section__container'>
                    <UpdatesTitles data={data} />
                </div>
            </section>
        </div>
    )
}