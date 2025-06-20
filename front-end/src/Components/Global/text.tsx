//# Classes //
import './text.scss'

interface textProps {
    tag: keyof React.JSX.IntrinsicElements
    className?: string,
    children?: React.ReactNode
}

export default function text({ tag, className, children }: textProps) {
    const TxtTag: keyof React.JSX.IntrinsicElements = tag
    return (
        <TxtTag className={`text ${className ? className : ''}`}>
            {children}
        </TxtTag>
    )
}