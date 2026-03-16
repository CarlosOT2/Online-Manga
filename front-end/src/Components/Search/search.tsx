//# Components //
import Text from '../Global/text'
import Link from '../Global/link'
import Input from '../Global/Inputs/input'
import Button from '../Global/Inputs/button'
import RadioInput from '../Global/Inputs/radioinput'
import CheckBoxInput from '../Global/Inputs/checkboxinput'
import TitleGrid from '../Global/Titles/titlesgrid'
//# Libs //
import { useState, useEffect, useId, useRef } from 'react'
//# Api //
import { GetTitlesByFilters } from '../../Shared/api/FetchTitle'
//# Services //
import { GetAllStatic } from '../../Shared/api/FetchStatic'
//# Utils //
import { useFormController } from '../../Shared/form/FormController'
//# Types //
import { staticData, staticDataArray } from '../../Shared/types/Data/static'
import { title } from '../../Shared/types/Data/title'
import type { InputsController } from '../../Shared/types/FormController'
//# Classes //
import './search.scss'
//# Icons //
import { IoMdArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

//.. Local Types // 
type state = {
    showFilterItem: string | null,
    setShowFilterItem: React.Dispatch<React.SetStateAction<string | null>>
}

type Faceted = {
    type: 'faceted';
    label: string;
    options: Record<string, staticData[]>;
    state: state;
    InputsController: InputsController;
}

type SingleSelect = {
    type: 'singleselect';
    label: string;
    options: staticData[];
    state: state;
    InputsController: InputsController;
}

type SelectAddiction = {
    type: 'selectaddiction';
    label: string;
    options?: undefined;
    state: state;
    InputsController: InputsController;
}

type SearchNumber = {
    type: 'searchnumber';
    label: string;
    options?: undefined;
    state: state;
    InputsController: InputsController;
}

//.. Local Components //
function FilterItem({ type, label, options, state, InputsController }: Faceted | SingleSelect | SelectAddiction | SearchNumber) {
    const id = `label_${useId()}`
    const { showFilterItem, setShowFilterItem } = state
    const InputName = `search${label.replace(/\s+/g, '').replace(/^./, c => c.toUpperCase())}`

    return (
        <>
            <div className='search__filters-item'>
                <h3 id={id}>
                    {label}
                </h3>
                <Button
                    onClick={() => {
                        if (label !== showFilterItem) {
                            setShowFilterItem(label)
                        }
                        else {
                            setShowFilterItem(null)
                        }
                    }}
                    icon={<MdOutlineUnfoldMore size={20} />}
                    ariaLabelledBy={id}
                    defaultStyle={false}
                    className='search__filters-button'
                >
                    <Text tag='span' no_select={true}>
                        None
                    </Text>
                </Button>
                {showFilterItem === label && (
                    <div
                        className={`
                        search__filters-item__options
                        ${type === "faceted" ? "search__filters-item__options--faceted" : ""}
                        ${type === "singleselect" ? "search__filters-item__options--singleselect" : ""}
                        ${type === "selectaddiction" ? "search__filters-item__options--selectaddiction" : ""}
                        ${type === "searchnumber" ? "search__filters-item__options--searchnumber" : ""}
                        `}
                    >
                        {
                            type === "faceted" ?
                                Object.entries(options).map(([key, value]) => (
                                    <section key={key}>
                                        <Text tag='h4'>
                                            {key}
                                            <div className='search__filters-item__options__title-line' aria-hidden={true}></div>
                                        </Text>

                                        <ul>
                                            {value.map(option => (
                                                <li key={option.name}>
                                                    <CheckBoxInput
                                                        value={option.id}
                                                        label={option.name}
                                                        name={`${InputName}_${key}`}
                                                        InputsController={InputsController}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))
                                : type === "singleselect" ?
                                    <ul>
                                        {
                                            options.map(option => (
                                                <li key={option.name}>
                                                    <RadioInput
                                                        label={option.name}
                                                        value={option.id}
                                                        name={InputName}
                                                        InputsController={InputsController}
                                                    />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    : type == "selectaddiction" ?
                                        <>
                                            <Input
                                                type='text'
                                                className='search__filters-item__options__input'
                                                Icon={HiMiniMagnifyingGlass}
                                                name={InputName}
                                                autoComplete='off'
                                                InputsController={InputsController}
                                            />
                                        </>
                                        : type == "searchnumber" ?
                                            <>
                                                <Input
                                                    type='number'
                                                    className='search__filters-item__options__input'
                                                    name={InputName}
                                                    autoComplete='off'
                                                    InputsController={InputsController}
                                                />
                                            </>
                                            :
                                            <span>Invalid filter type</span>

                        }
                    </div>
                )}
            </div >
        </>
    )
}

export default function Search() {
    const { InputsController, SubmitController } = useFormController({
        handleSubmit: handleSubmit
    })
    const formRef = useRef<HTMLFormElement>(null);

    const [data, setData] = useState<title[]>([])
    const [staticData, setStaticData] = useState<staticDataArray>({})

    const [showFilterItem, setShowFilterItem] = useState<string | null>(null)
    const [showFilters, setShowFilters] = useState(false)

    async function handleSubmit(data: {
        searchName: string,
        searchAuthors: string[],
        searchArtists: string[],

        searchContentRating: string,
        searchDemographic: string,
        searchPublicationYear: string,
        searchStatus: string,

        searchTags_Genres: string[],
        searchTags_Themes: string[]
    }) {

        const res = await GetTitlesByFilters({
            name: data.searchName,
            authors: data.searchAuthors,
            artists: data.searchArtists,

            contentRatingId: data.searchContentRating,
            demographicId: data.searchDemographic,
            publicationYear: data.searchPublicationYear,
            statusId: data.searchStatus,

            genresIds: data.searchTags_Genres,
            themesIds: data.searchTags_Themes,

        })
        
        console.log(res)
        if (res) setData(res)

    }

    //.. Get static data from the database
    //.. Makes an unfiltered request when reloading/opening the page
    useEffect(() => {
        GetAllStatic().then(setStaticData)
        formRef.current?.requestSubmit();
    }, [])

    //.. Resets the selected filter tab
    useEffect(() => {
        setShowFilterItem(null)
    }, [showFilters])

    return (
        <main className='search'>
            <div className='search__container-title'>
                <Link to='/'>
                    <IoMdArrowBack size={25} />
                </Link>
                <Text tag='h2' title={true}>
                    Search
                </Text>
            </div>

            <form
                ref={formRef}
                className='search__form'
                onSubmit={SubmitController.onSubmit}
            >
                <section className='search__form-inputs'>
                    <Input
                        type='text'
                        className='search__form-inputs__input'
                        Icon={HiMiniMagnifyingGlass}
                        name='searchName'
                        autoComplete='off'
                        InputsController={InputsController}
                    />
                    <Button
                        onClick={() => { setShowFilters(!showFilters) }}
                        className='search__form-inputs__button-filter'
                    >
                        <IoIosArrowDown size={20} color='var(--color1)' />
                        <Text tag='span'>
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </Text>
                    </Button>
                    <Button
                        type={'submit'}
                        className='search__form-inputs__button-submit'
                    >
                        <HiMiniMagnifyingGlass size={20} color='var(--color1)' />
                        <Text tag='span'>
                            Search
                        </Text>
                    </Button>
                </section>
                {showFilters && (
                    <>
                        <section className='search__filters'>
                            <FilterItem
                                type={"faceted"}
                                label="Tags"
                                options={{ Themes: staticData.themes, Genres: staticData.genres }}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"singleselect"}
                                label="Content Rating"
                                options={staticData.contentRatings}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"singleselect"}
                                label="Demographic"
                                options={staticData.demographics}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"singleselect"}
                                label="Status"
                                options={staticData.statuses}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"selectaddiction"}
                                label="Authors"
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"selectaddiction"}
                                label="Artists"
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"searchnumber"}
                                label="Publication Year"
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                        </section>
                    </>
                )}
            </form>

            <section className='search__result'>
                <Text tag='h3' title={true} sr_only={true}>
                    Results
                </Text>
                <TitleGrid data={data} variant={'card'} />
            </section>
        </main >
    )
}