export type staticData = {
  id: number;
  name: string;
}

export type staticDataArray = {
  statuses: staticData[]
  contentRatings: staticData[]
  demographics: staticData[]
  genres: staticData[]
  themes: staticData[]
}
