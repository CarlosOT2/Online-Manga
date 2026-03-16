//# Components //
import Text from '../Global/text'
import Button from '../Global/Inputs/button'
import Img from '../Global/img'
//# Libs //
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
//# Services //
import { GetTitleById } from '../../Shared/api/FetchTitle'
//# Utils //
import staticMapper from '../../Shared/utils/staticMapper'
//# Types //
import { title, titlemetakeys } from '../../Shared/types/Data/title'
import { staticDataArray } from '../../Shared/types/Data/static'
//# Config //
import { metanames } from '../../config/Components/title'
//# Classes //
import './title.scss'
//# Icons //
import { FaStar } from "react-icons/fa"
import { IoBook } from "react-icons/io5"
import { TbMessageReportFilled } from "react-icons/tb"
import { LuUpload } from "react-icons/lu"

function Buttons() {
    return (
        <div className='title__fast-info-buttons' role='group'>
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
        </div>
    )
}

function SectionMeta({ data }: { data: title | undefined }) {
    if (!data) {
        console.warn("Warn: Failed to load section meta info data")
        return
    }

    type metadata = title[keyof title] | undefined
    type groupconfig = {
        name: string,
        data: metadata,
        statickey?: keyof staticDataArray
    }
    const config: groupconfig[] =
        (Object.entries(metanames) as [titlemetakeys, typeof metanames[titlemetakeys]][])
            .map(([key, value]) => ({
                name: value.metaname,
                data: data[key],
                statickey: value.statickey
            }));

    /*
    .. Formats the data into a consistent array structure,
    .. ensuring it's easy to loop through and render on the front end.
    */
    function formatData(raw: metadata) {
        if (Array.isArray(raw)) {
            if (raw.length === 0) return ["None"]
            return raw
        }
        return [raw]
    }

    function Groups({ config }: { config: groupconfig[] }) {
        return config.map((obj, i) => {
            const name = (obj.data && Array.isArray(obj.data) && obj.data.length > 1)
                ? `${obj.name}s`
                : obj.name;
            const formattedData = formatData(obj.data).map(item => {
                if (obj.statickey) {
                    return staticMapper(obj.statickey, Number(item))
                }
                return item
            })

            return (
                <li className="title__info-meta-group" key={`meta_${i}`}>
                    <Text tag="h2" className="title__info-meta-label">
                        {name}
                    </Text>
                    <ul className="title__info-meta-wrapper">
                        {
                            formattedData.map((data, data_i) => (
                                <Text key={`data_${data_i}`} tag="li" className="title__info-meta-item">
                                    {data}
                                </Text>
                            ))
                        }
                    </ul>
                </li>
            );
        });
    }

    return (
        <ul className={'title__info-meta'}>
            <Groups config={config} />
        </ul >
    )
}

function SectionChapters() {
    function TemplateChapter() {
        return (
            <>
                <li className={'title__info-chapters-group'}>
                    <Text tag='span' className='title__info-chapters-group-txt'>
                        Chapter 1
                    </Text>
                </li>
            </>
        )
    }
    return (
        <ul className={'title__info-chapters'}>
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
            <TemplateChapter />
        </ul>
    )
}

export default function Title() {

    //.. Variables
    const { name, id } = useParams();

    //.. States
    const [data, setData] = useState<title>()

    async function req() {
        const res = await GetTitleById(Number(id))
        if (res) setData(res[0])
    }

    useEffect(() => {
        req()
    }, [])



    return (
        <>
            <Text tag='h1' sr_only={true}>
                Title: {data?.name}
            </Text >
            <div className='title__container'>
                <Img className={'title__bg-img'} src={'/manga-teste.jpg'} ariaHidden={true} />
                <header className='title__fast-info'>
                    <Img className={'title__fast-info-img'} src={'/manga-teste.jpg'} alt={`Cover of ${data?.name}`} />
                    <div className={'title__fast-info-container'}>
                        <Text className={'title__fast-info-name'} tag='h1' title={true}>
                            {data?.name}
                        </Text>
                        <Text className={'title__fast-info-author'} tag='p'>
                            {data?.authors.join(", ")}
                        </Text>
                        <Buttons />
                    </div>
                </header>
                <article className={'title__info'}>
                    <section className={'title__info-synopsis'}>
                        <Text split_paragraph={'.'} tag='p'>
                            {data?.synopsis}
                        </Text>
                    </section>
                    <hr className='title__info-line' />
                    <section className={'title__info-container'}>
                        <SectionMeta data={data} />
                        <SectionChapters />
                    </section>
                </article>
            </div>
        </>
    )
}