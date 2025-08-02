//# Helpers //
import FilterClasses from '../../Helpers/FilterClasses';
//# Classes //
import './button.scss'

interface button {
    className?: string
    children?: React.ReactNode
    defaultStyle?: boolean
    icon?: any
}

export default function button({
    className = '',
    children,
    icon,
    defaultStyle = true
}: button) {

    const frmtd_className: string = `${defaultStyle ? 'button' : ''} ${className}`
    return (
        <>
            <button className={FilterClasses(frmtd_className)}>
                {icon}
                {children}
            </button>
        </>
    )
}