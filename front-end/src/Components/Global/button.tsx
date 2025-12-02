//# Utils //
import FilterClasses from '../../Utils/FilterClasses';
//# Classes //
import './button.scss'

interface button {
    /** additional CSS classes to apply */
    className?: string
    /** children of the link */
    children?: React.ReactNode
    /** apply default style */
    defaultStyle?: boolean
    /** icon that will show next to button */
    icon?: any
    /** aria-label of the link */
    ariaLabel?: string
}

export default function button({
    className = '',
    children,
    icon,
    defaultStyle = true,
    ariaLabel = undefined
}: button) {

    const frmtd_className: string = `${defaultStyle ? 'button' : ''} ${className}`
    return (
        <>
            <button className={FilterClasses(frmtd_className)} aria-label={ariaLabel}>
                {icon}
                {children}
            </button>
        </>
    )
}