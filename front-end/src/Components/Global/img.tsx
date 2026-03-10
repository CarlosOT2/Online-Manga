//# Utils //
import FilterClasses from '../../Shared/utils/FilterClasses'

type Img = {
    /** src of the image */
    src: string
    /** additional CSS classes to apply */
    className?: string
    /** alt of the image */
    alt?: string
    /** aria-hidden of the image */
    ariaHidden?: boolean
}

export default function Img({ src, className, alt, ariaHidden = undefined }: Img) {
    return (
        <img
            className={className ? FilterClasses(className) : undefined}
            src={src || undefined}
            alt={alt || undefined}
            aria-hidden={ariaHidden}
            loading='lazy'
        />
    )
}