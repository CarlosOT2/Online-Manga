//# Components //
import Text from '../Global/text'
//# Classes //
import './Updates.scss'

function UpdatesMangas() {
    //-- Isso daqui é apenas um teste, o mangadata vai ser passado como argumento para ser utilizado no latest, e recently added
    //-- Eu já fiz o template basico já consigo ter uma ideia de como vai ser, agora resta fazer o back-end para receber esses dados.
    const mangadata = [
        {
            nome: 'Gantz',
            image: 'public/manga-teste.jpg'
        },
        {
            nome: 'Gantz',
            image: 'public/manga-teste.jpg'
        },
        {
            nome: 'Gantz',
            image: 'public/manga-teste.jpg'
        },
    ]
    return (
        <>
            <section className='home-updates__section-mangas'>
                <div className='home-updates__section-mangas-column'>
                    {
                        mangadata.map((manga) =>
                            <div className='home-updates__section-mangas-item'>
                                <img className={'home-updates__section-mangas-img'} src={manga.image}>
                                </img>
                                <Text tag={'span'}>
                                    {manga.nome}
                                </Text>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default function Updates() {
    return (
        <section className='home-updates'>
            <section className='home-updates__section-latest'>
                <Text tag='h1' className='home-updates-title'>
                    Latest
                </Text>
                <UpdatesMangas />
            </section>
            <section className='home-updates__section-recently-added'>
                <Text tag='h1' className='home-updates-title'>
                    Recently Added
                </Text>
                <UpdatesMangas />
            </section>
        </section>
    )
}