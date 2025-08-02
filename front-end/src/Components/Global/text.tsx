//# Helpers //
import FilterClasses from '../../Helpers/FilterClasses'
//# Classes //
import './text.scss'

interface textProps {
    tag: keyof React.JSX.IntrinsicElements
    className?: string
    children?: React.ReactNode
    title?: boolean
    margin?: boolean
    no_select?: boolean
    not_exceed?: boolean
}

export default function text({ tag, className, children, title, margin, no_select, not_exceed }: textProps) {
    const TxtTag: keyof React.JSX.IntrinsicElements = tag

    const frmtd_className: string = `
                text 
                ${className || ''}
                ${title ? 'text-title' : ''}
                ${margin ? 'text-margin' : ''}
                ${no_select ? 'text-no-select' : ''}
                ${not_exceed ? 'text-not-exceed' : ''}
                `
    return (
        <TxtTag className={FilterClasses(frmtd_className)}>
            {children}
        </TxtTag>
    )
}