//# Components //
import Text from '../Global/text'
import Button from '../Global/button'
//# Libs //
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useMeasure from 'react-use-measure'
//# Helpers //
import PerformFetch from '../../Helpers/PerformFetch'
//# Types //
import { title } from '../../Types/title'
//# Classes //
import './title.scss'
//# Icons //
import { FaStar } from "react-icons/fa"
import { IoBook } from "react-icons/io5"
import { TbMessageReportFilled } from "react-icons/tb"
import { LuUpload } from "react-icons/lu"
import { HiDotsHorizontal } from "react-icons/hi"


function SectionButtons() {

    const [ref, bounds] = useMeasure()

    return (
        <section ref={ref} className='title__info-buttons'>
            {bounds.width > 670 ? (
                <>
                    <Button className='title__button' icon={<FaStar className='title__button-icon' />}>
                        <Text className='title__button-txt' tag='span' no_select={true}>
                            Favorite
                        </Text>
                    </Button>
                    <Button className='title__button' icon={<IoBook className='title__button-icon' />}>
                        <Text className='title__button-txt' tag='span' no_select={true}>
                            Read
                        </Text>
                    </Button>
                    <Button className='title__button' icon={<TbMessageReportFilled className='title__button-icon' />}>
                        <Text className='title__button-txt' tag='span' no_select={true}>
                            Report
                        </Text>
                    </Button>
                    <Button className='title__button' icon={<LuUpload className='title__button-icon' />}>
                        <Text className='title__button-txt' tag='span' no_select={true}>
                            Upload
                        </Text>
                    </Button>
                </>
            ) : (
                <>
                    <Button className='title__button--small' icon={<FaStar className='title__button-icon' />} />
                    <Button className='title__button--small' icon={<HiDotsHorizontal className='title__button-icon' />} />
                </>
            )}
        </section>
    )
}
function SectionChapters() {
    return (
        <div className='title__chapters'>
        </div>
    )
}

export default function Title() {

    //.. Variables
    const { name, id } = useParams();

    //.. States
    const [data, setData] = useState<title>()

    async function req() {
        setData(await PerformFetch<title>({ url: `https://localhost:8081/title?id=${id}&name=${name}` }))
    }

    useEffect(() => {
        req()
    }, [])

    return (
        <>
            
            <div className='title'>
                <section className='title__info'>
                    <img className={'title__info-bg-img'} src={'../../../public/manga-teste.jpg'}/>
                    <img className={'title__info-img'} src={'../../../public/manga-teste.jpg'} />
                    <div className={'title__info-div'}>
                        <Text className={'title__info-name'} tag='span' title={true}>
                            {data?.name}
                        </Text>
                        <Text className={'title__info-author'} tag='span'>
                            {data?.author}
                        </Text>
                        <SectionButtons />
                    </div>
                </section>
                <SectionChapters />
            </div>
        </>
    )
}