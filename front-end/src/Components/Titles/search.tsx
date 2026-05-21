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

    // Default suffix used to access exclusion InputsData
    const excludeTextString = 'exclude'
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


                                // MultiDropDown
                                const mddValue = InputsController.data[InputName];
                                if (Array.isArray(mddValue) && mddValue.length > 0 && Array.isArray(options)) {
                                    return mddValue
                                        .map(v => options.find((obj: staticData) => obj.id === Number(v))?.name)
                                        .join(", ");
                                }

                                // SelectText & SelectNumber
                                const slctValue = InputsController.data[InputName];
                                if ((typeof slctValue === "string" || typeof slctValue === "number") && !options) {
                                    return slctValue.toString() || "None";
                                }

                                // Faceted

                                if (isPlainObject(options) && Object.values(options).every(Array.isArray)) {

                                    const optionsKeys = Object.keys(options);
                                    const staticKeys = getAllStaticKeys()

                                    const values = optionsKeys.flatMap((key) => {
                                        const frmtdKey = key.toLowerCase() as keyof staticDataArray

                                        if (!staticKeys.includes(frmtdKey)) {
                                            console.error(`Invalid key "${key}". Cannot format value because it does not exist in data returned by GetAllStatic().`)
                                            return []
                                        }

                                        const keyValues = InputsController.data[`${InputName}_${key}`] ?? []
                                        const keyExcludeValues = InputsController.data[`${InputName}_${key}_${excludeTextString}`] ?? []

                                        return [
                                            ...keyValues.map((value: string) =>
                                                staticMapper(frmtdKey, Number(value))
                                            ),
                                            ...keyExcludeValues.map((value: string) =>
                                                `NOT ${staticMapper(frmtdKey, Number(value))}`
                                            )
                                        ]
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
                                            {value.map(function (option) {
                                                const dataIncludeKey = `${InputName}_${key}`
                                                const dataExcludeKey = `${InputName}_${key}_${excludeTextString}`

                                                const isInclude = (InputsController.data[dataIncludeKey] ?? []).includes(String(option.id))
                                                const isExclude = (InputsController.data[dataExcludeKey] ?? []).includes(String(option.id))

                                                return (
                                                    <li key={option.name}>
                                                        <CheckBoxInput
                                                            value={option.id}
                                                            label={option.name}
                                                            disableOnChange={true}
                                                            classNameLabel={
                                                                `
                                                                search__filters-item__options--faceted-label
                                                                ${isExclude ?
                                                                    `search__filters-item__options--faceted-label-exclude`
                                                                    : isInclude ?
                                                                        `search__filters-item__options--faceted-label-include`
                                                                        : ''
                                                                }
                                                                `
                                                            }
                                                            name={`${InputName}_${key}`}
                                                            onClick={(e) => {
                                                                const filterById = (list: string[], id: number) =>
                                                                    (list ?? []).filter((item) => Number(item) !== id)

                                                                const id = String(option.id)
                                                                const includes = InputsController.data[dataIncludeKey] ?? []
                                                                const excludes = InputsController.data[dataExcludeKey] ?? []

                                                                if (isInclude) {
                                                                    // include → exclude
                                                                    InputsController.changeValue(dataIncludeKey, filterById(includes, option.id))
                                                                    InputsController.changeValue(dataExcludeKey, [...excludes, id])
                                                                } else if (isExclude) {
                                                                    // exclude → none
                                                                    InputsController.changeValue(dataIncludeKey, filterById(includes, option.id))
                                                                    InputsController.changeValue(dataExcludeKey, filterById(excludes, option.id))
                                                                } else {
                                                                    // none → include
                                                                    InputsController.changeValue(dataIncludeKey, [...includes, id])
                                                                }
                                                            }}
                                                            InputsController={InputsController}
                                                        />
                                                    </li>
                                                )
                                            })}
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
        searchTags_Themes: string[],

        searchTags_Genres_exclude: string[],
        searchTags_Themes_exclude: string[]
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

            excludeGenresIds: data.searchTags_Genres_exclude,
            excludeThemesIds: data.searchTags_Themes_exclude
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