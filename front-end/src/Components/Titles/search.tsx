//# Components //
import Text from '../Global/text'
import Input from '../Global/Inputs/input'
import Button from '../Global/Inputs/button'
import CheckBoxInput from '../Global/Inputs/checkboxinput'
import TitleGrid from '../Global/Titles/titlesgrid'
//# Libs //
import { useState, useEffect, useId, useRef } from 'react'
import FilterClasses from '../../Shared/utils/FilterClasses'
import isPlainObject from '../../Shared/utils/isPlainObject'
import { staticMapper, getAllStaticKeys } from '../../Shared/utils/staticHandler'
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

type MultiDropDown = {
    type: 'multidropdown';
    label: string;
    options: staticData[];
    state: state;
    InputsController: InputsController;
}

type SelectText = {
    type: 'selecttext';
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
function FilterItem({ type, label, options, state, InputsController }: Faceted | MultiDropDown | SelectText | SearchNumber) {
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
                    <Text tag='span' no_select={true} not_exceed_X={true}>
                        {
                            (() => {
                                const value = InputsController.data[InputName];

                                // MultiDropDown
                                if (Array.isArray(value) && value.length > 0 && Array.isArray(options)) {
                                    return value
                                        .map(v => options.find((obj: staticData) => obj.id === Number(v))?.name)
                                        .join(", ");
                                }

                                // SelectText & SelectNumber
                                if ((typeof value === "string" || typeof value === "number") && !options) {
                                    return value.toString() || "None";
                                }

                                // Faceted
                                if (isPlainObject(options) && Object.values(options).every(Array.isArray)) {
                                    const optionsKeys = Object.keys(options);
                                    const staticKeys = getAllStaticKeys()

                                    const values = optionsKeys.flatMap((key) => {
                                        const frmtdKey = key.toLowerCase() as keyof staticDataArray

                                        if (!staticKeys.includes(frmtdKey)) {
                                            console.error(`Invalid key "${key}". Cannot format value because it does not exist in data returned by GetAllStatic().`)
                                            return null
                                        }

                                        const keyValues = InputsController.data[`${InputName}_${key}`] ?? []
                                        return keyValues.map((value: string) => staticMapper(frmtdKey, Number(value)))
                                    })

                                    if (values.length > 0) return values.join(", ")
                                }

                                return "None";
                            })()
                        }
                    </Text>
                </Button>
                {showFilterItem === label && (
                    <div
                        className={FilterClasses(`
                        search__filters-item__options
                        ${type === "faceted" ? "search__filters-item__options--faceted" : ""}
                        ${type === "multidropdown" ? "search__filters-item__options--multidropdown" : ""}
                        ${type === "selecttext" ? "search__filters-item__options--selecttext" : ""}
                        ${type === "searchnumber" ? "search__filters-item__options--searchnumber" : ""}
                        `)}
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
                                : type === "multidropdown" ?
                                    <ul>
                                        {
                                            options.map(option => (
                                                <li key={option.name}>
                                                    <CheckBoxInput
                                                        value={option.id}
                                                        label={option.name}
                                                        name={`${InputName}`}
                                                        InputsController={InputsController}
                                                    />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    : type == "selecttext" ?
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
        searchAuthor: string,
        searchArtist: string,

        searchContentRating: string[],
        searchDemographic: string[],
        searchStatus: string[],
        searchPublicationYear: string,

        searchTags_Genres: string[],
        searchTags_Themes: string[]
    }) {
        const res = await GetTitlesByFilters({
            name: data.searchName,
            author: data.searchAuthor,
            artist: data.searchArtist,

            contentRatingIds: data.searchContentRating,
            demographicIds: data.searchDemographic,
            statusIds: data.searchStatus,
            publicationYear: data.searchPublicationYear,

            genresIds: data.searchTags_Genres,
            themesIds: data.searchTags_Themes,
        })

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
        <div className='search'>
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
                                type={"multidropdown"}
                                label="Content Rating"
                                options={staticData.contentRatings}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"multidropdown"}
                                label="Demographic"
                                options={staticData.demographics}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"multidropdown"}
                                label="Status"
                                options={staticData.statuses}
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"selecttext"}
                                label="Author"
                                state={{ showFilterItem, setShowFilterItem }}
                                InputsController={InputsController}
                            />
                            <FilterItem
                                type={"selecttext"}
                                label="Artist"
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
        </div >
    )
}