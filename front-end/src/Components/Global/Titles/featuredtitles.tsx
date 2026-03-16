//# Components //
import Text from '../text'
import Link from '../link'
import Img from '../img'
//# Utils //
import staticMapper from '../../../Shared/utils/staticMapper'
//# Types //
import { title } from '../../../Shared/types/Data/title'
//# Classes //
import './featuredtitles.scss'

export default function FeaturedTitles({ data }: { data: title[] }) {
    return (
        <section className='featuredtitles'>
            {
                data.map((title) => (
                    <Link
                        to={`/title/${title.id}/${title.name}`}
                        className='featuredtitles__link'
                    >
                        <article className='featuredtitles__item'>
                            <Img className={'featuredtitles__item-img'} src={`public/manga-teste.jpg`} />
                            <section className='featuredtitles__item-section'>
                                <Text not_exceed_X={true} className={`featuredtitles__item-name`} tag={'h3'}>
                                    {title.name}
                                </Text>
                                <ul className='featuredtitles__item-list'>
                                    <li>
                                        <Text no_select={true} not_exceed_X={true} className={`featuredtitles__item-contentRating`} tag={'span'}>
                                            {staticMapper("contentRatings", Number(title.contentRating))}
                                        </Text>
                                    </li>
                                    <li>
                                        <Text no_select={true} not_exceed_X={true} className={`featuredtitles__item-demographic`} tag={'span'}>
                                            {staticMapper("demographics", Number(title.demographic))}
                                        </Text>
                                    </li>
                                    {
                                        title.genres.slice(0, 3).map((g, i) =>
                                            <li key={`genre-${i}`}>
                                                <Text no_select={true} not_exceed_X={true} className={`featuredtitles__item-genre`} tag={'span'}>
                                                    {staticMapper("genres", Number(g))}
                                                </Text>
                                            </li>
                                        )
                                    }
                                </ul>
                                <Text className={'featuredtitles__item-synopsis'} tag={'span'} not_exceed_Y={true}>
                                    {title.synopsis}
                                </Text>
                                <Text className={'featuredtitles__item-authors'} not_exceed_X={true} tag={'p'}>
                                    {title?.authors.join(", ")}
                                </Text>
                            </section>
                        </article>
                    </Link>
                ))
            }
        </section >
    )
}