//# Components //
import Text from '../text'
import Link from '../link'
import Img from '../img'
import Button from '../Inputs/button'
//# Libs //
import { useState } from 'react'
//# Utils //
import staticMapper from '../../../Shared/utils/staticMapper'
//# Types //
import { title } from '../../../Shared/types/Data/title'
//# Classes //
import './featuredtitles.scss'
//# Icons //
import { FaChevronLeft } from "react-icons/fa"
import { FaChevronRight } from "react-icons/fa"


export default function FeaturedTitles({ data }: { data: title[] }) {
    const [titleIndex, setTitleIndex] = useState(0)

    function handleTitleSwitch(direction: number) {
        let newIndex = titleIndex + direction;

        if (newIndex < 0)
            newIndex = data.length - 1;
        if (newIndex >= data.length)
            newIndex = 0;

        setTitleIndex(newIndex)
    }

    return (
        <section className='featuredtitles' >
            <div className='featuredtitles__track' style={{ transform: `translateX(-${titleIndex * 100}%)` }}>
                {
                    data.map((title: title) => {
                        return (
                            <Link
                                to={`/title/${title.id}/${title.name}`}
                                className='featuredtitles__slide'
                            >
                                <article className='featuredtitles__card'>
                                    <Img className={'featuredtitles__card__img'} src={`public/manga-teste.jpg`} />
                                    <section className='featuredtitles__card__section'>
                                        <Text not_exceed_X={true} className={`featuredtitles__card__name`} tag={'h3'}>
                                            {title.name}
                                        </Text>
                                        <ul className='featuredtitles__card__list'>
                                            <li>
                                                <Text no_select={true} not_exceed_X={true} className={`featuredtitles__card__contentRating`} tag={'span'}>
                                                    {staticMapper("contentRatings", Number(title.contentRating))}
                                                </Text>
                                            </li>
                                            <li>
                                                <Text no_select={true} not_exceed_X={true} className={`featuredtitles__card__demographic`} tag={'span'}>
                                                    {staticMapper("demographics", Number(title.demographic))}
                                                </Text>
                                            </li>
                                            {
                                                title.genres.slice(0, 5).map((g, i) =>
                                                    <li key={`genre-${i}`}>
                                                        <Text no_select={true} not_exceed_X={true} className={`featuredtitles__card__genre`} tag={'span'}>
                                                            {staticMapper("genres", Number(g))}
                                                        </Text>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                        <Text className={'featuredtitles__card__synopsis'} tag={'span'} not_exceed_Y={true}>
                                            {title.synopsis}
                                        </Text>
                                        <footer className='featuredtitles__card__footer'>
                                            <Text className={'featuredtitles__card__authors'} not_exceed_X={true} tag={'p'}>
                                                {title?.authors.slice(0, 6).join(", ")}
                                            </Text>
                                        </footer>
                                    </section>
                                </article>
                            </Link>
                        )
                    })
                }
            </div>
            <div className='featuredtitles__buttons'>
                <Button
                    className='featuredtitles__buttons__button--left'
                    icon={<FaChevronLeft />}
                    defaultStyle={false}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleTitleSwitch(-1)
                    }}
                />
                <Button
                    className='featuredtitles__buttons__button--right'
                    icon={<FaChevronRight />}
                    defaultStyle={false}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleTitleSwitch(1)
                    }}
                />
            </div>
        </section>
    )
}