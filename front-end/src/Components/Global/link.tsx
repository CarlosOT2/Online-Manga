//# Components //
import Text from './text'
//# Libs //
import { Link } from 'react-router';
//# Utils //
import FilterClasses from '../../Utils/FilterClasses';
//# Classes //
import './link.scss'

interface link {
    /** to of the link */
    to?: string
    /** additional CSS classes to apply */
    className?: string
    /** children of the link */
    children?: React.ReactNode
    /** apply default style */
    defaultStyle?: boolean
    /** aria-label of the link */
    ariaLabel?: string
}

export default function link({ to = "/", className = '', children, defaultStyle = true, ariaLabel = undefined }: link) {
    const frmtd_className: string = FilterClasses(`
                    ${defaultStyle ? 'link' : ''} 
                    ${className}
                    `)
    return (
        <>
            <Link to={to} className={frmtd_className} aria-label={ariaLabel}>
                {
                    typeof children === 'string' ?
                        <Text tag='span' className={FilterClasses(frmtd_className)}>
                            {children}
                        </Text>
                        :
                        children
                }
            </Link>
        </>
    )
}