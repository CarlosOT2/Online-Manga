export type title = {
    id: number
    name: string
    synopsis: string
    releaseDate: string
    img: string

    authors: string[]
    artists: string[]

    genres: string[]
    themes: string[]

    contentRating: string
    demographic: string
    status: string
}

export type titlemetakeys = keyof Omit<title, "id" | "name" | "synopsis" | "releaseDate" | "img">