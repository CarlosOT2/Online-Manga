//# Components //
import Popular from './Popular'
import Updates from './Updates'
//# Classes //
import './Home.scss'



export default function Home() {

    (async function () {
        const response = await fetch('https://localhost:32771/api/teste');
        const data = await response.text()
        console.log(data)
    })();


    return (
        <>
            <Popular />
            <Updates />
        </>
    )
}