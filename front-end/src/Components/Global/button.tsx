//# Utils //
import FilterClasses from '../../Shared/utils/FilterClasses';
//# Classes //
import './button.scss'

interface button {
    /** type of the button */
    type?: "button" | "submit" | "reset",
    /** additional CSS classes to apply */
    className?: string
    /** children of the button */
    children?: React.ReactNode
    /** onClick of the button */
    onClick?: any
    /** apply default style */
    defaultStyle?: boolean
    /** icon that will show next to button */
    icon?: any
    /** aria-label of the button */
    ariaLabel?: string
    /** aria-labelledby of the button */
    ariaLabelledBy?: string
}

export default function button({
    type = "button",
    className = '',
    children,
    onClick,
    icon,
    defaultStyle = true,
    ariaLabel = undefined,
    ariaLabelledBy = undefined
}: button) {

    const frmtd_className: string = `${defaultStyle ? 'button' : ''} ${className}`
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={FilterClasses(frmtd_className)}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
            >
                {icon}
                {children}
            </button>
        </>
    )
}