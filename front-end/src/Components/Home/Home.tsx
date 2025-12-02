//# Components //
import Popular from './popular'
import Updates from './updates'
import Text from '../Global/text'
//# Classes //
import './home.scss'



export default function Home() {
    return (
        <>
            <Text tag='h1' sr_only={true}>
                CatManga — Read Manga Online
            </Text >
            <Popular />
            <Updates />
        </>
    )
}