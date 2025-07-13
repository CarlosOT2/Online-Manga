//# Libs //
import { Link } from 'react-router';
//# Helpers //
import FilterClasses from '../../Helpers/FilterClasses';
//# Classes //
import './link.scss'

interface link {
    to?: string
    className?: string
    children?: React.ReactNode
    defaultStyle?: boolean
    text?: boolean,
}

export default function link({ to = "/", className = '', children, defaultStyle = true }: link) {
    const frmtd_className: string = `${defaultStyle ? 'link' : ''} ${className}`
    return (
        <>
            <Link to={to} className={FilterClasses(frmtd_className)}>
                {children}
            </Link>
        </>
    )
}