//# Components //
import Text from '../Global/text'
import Link from '../Global/link'
//# Libs //
import { Outlet, useLocation } from "react-router-dom";
//# Classes //
import './wrapper.scss'
//# Icons //
import { IoMdArrowBack } from "react-icons/io";



export default function Wrapper({ titles }: { titles: Record<string, string> }) {
    const { pathname } = useLocation()
    const title = titles[pathname.split('/').pop() ?? '']  

    return (
        <>
            <div className='wrapper'>
                <div className='wrapper__container'>
                    <Link to='/'>
                        <IoMdArrowBack size={25} />
                    </Link>
                    <Text tag='h2' title={true}>
                        {title}
                    </Text>
                </div>
            </div>
            <Outlet />
        </>
    )
}