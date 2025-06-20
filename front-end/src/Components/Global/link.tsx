//# Libs //
import { Link } from 'react-router';
//# Classes //
import './link.scss'

interface link {
    Rota?: string,
    children?: React.ReactNode
}

export default function link({ Rota = "/", children }: link) {
    return (
        <>
            <Link to={Rota} className='link'>
                {children}
            </Link>
        </>
    )
}