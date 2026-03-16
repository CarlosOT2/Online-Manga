//# Components //
import Text from '../text'
import Link from '../link'
import Img from '../img'
//# Utils //
import chunkArray from '../../../Shared/utils/chunkArray'
import staticMapper from '../../../Shared/utils/staticMapper'
//# Types //
import { title } from '../../../Shared/types/Data/title'
//# Config //
import { grid } from '../../../config/Components/title'
//# Classes //
import './titlesgrid.scss'

type TitlesGrid = {
    data: title[],
    variant: 'card' | 'compact'
}
type TitleInfoConfig = {
    contentRating?: boolean,
    demographic?: boolean,
    genres?: boolean,
    themes?: boolean,
    synopsis?: boolean
}

export default function TitlesGrid({
    data,
    variant
}: TitlesGrid) {
    /*
    a Imagem por enquanto vai ser que está em public, depois que eu configurar o servidor vou utilizar as imagens
    armazenadas em data, que seria 'title.img'
    */
    const { items, columns } = grid[variant]
    const OrganizedData = chunkArray<title>(data, items).slice(0, columns);

    function TitleInfo({ title, config }: { title: title, config?: TitleInfoConfig }) {
        const { contentRating, demographic, synopsis, genres, themes } = config ?? {}

        return (
            <section className='titlegrid__item-info-container'>
                <Text not_exceed_X={true} className={`titlegrid__item-name`} tag={'h3'}>
                    {title.name}
                </Text>
                <ul className='titlegrid__item-list'>
                    {contentRating && (
                        <li>
                            <Text no_select={true} not_exceed_X={true} className={`titlegrid__item-contentRating`} tag={'span'}>
                                {staticMapper("contentRatings", Number(title.contentRating))}
                            </Text>
                        </li>
                    )}
                    {demographic && (
                        <li>
                            <Text no_select={true} not_exceed_X={true} className={`titlegrid__item-demographic`} tag={'span'}>
                                {staticMapper("demographics", Number(title.demographic))}
                            </Text>
                        </li>
                    )}
                    {genres && (
                        title.genres.map((g, i) =>
                            <li key={`genre-${i}`}>
                                <Text no_select={true} not_exceed_X={true} className={`titlegrid__item-genre`} tag={'span'}>
                                    {staticMapper("genres", Number(g))}
                                </Text>
                            </li>
                        )
                    )}
                    {themes && (
                        title.themes.map((t, i) =>
                            <li key={`genre-${i}`}>
                                <Text no_select={true} not_exceed_X={true} className={`titlegrid__item-theme`} tag={'span'}>
                                    {staticMapper("themes", Number(t))}
                                </Text>
                            </li>
                        )
                    )}
                </ul>
                {synopsis && (
                    <Text tag={'span'} not_exceed_Y={true}>
                        {title.synopsis}
                    </Text>
                )}

            </section>
        )
    }
    function TitleItem({ title }: { title: title }) {
        return (
            <li key={`item-${title.id}`}>
                <Link
                    to={`/title/${title.id}/${title.name}`}
                    className='titlegrid__item__link'
                >
                    <article className='titlegrid__item-article'>
                        <Img
                            className={'titlegrid__item-img'}
                            src={`public/manga-teste.jpg`}
                            alt={`Cover of ${title.name}`}
                        />
                        {variant === 'compact' && (
                            <TitleInfo title={title}/>
                        )}
                        {variant === 'card' && (
                            <TitleInfo title={title} config={{ contentRating: true, demographic: true, genres: true, themes: true, synopsis: true }} />
                        )}
                    </article>
                </Link>
            </li>
        )
    }
    
    return (
        <div
            className={`titlegrid titlegrid--${variant}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
        >
            {
                OrganizedData.map((subArray, s_index) => (
                    <ul className={`titlegrid__list`} key={`titles-${s_index}`}>
                        {
                            subArray.map((title) => (
                                <TitleItem title={title} />
                            ))
                        }
                    </ul>
                ))
            }
        </div>
    )
}