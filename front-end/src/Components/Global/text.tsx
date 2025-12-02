//# Utils //
import FilterClasses from '../../Utils/FilterClasses'
//# Classes //
import './text.scss'
//# Namespaces //
import { JSX } from 'react'

interface textProps {
    /** HTML 'tag' for text */
    tag: keyof React.JSX.IntrinsicElements
    /** additional CSS classes to apply */
    className?: string
    /** children of the link */
    children?: React.ReactNode
    /** apply title style  */
    title?: boolean
    /** add margin to text */
    margin?: boolean
    /** makes the text unselectable */
    no_select?: boolean
    /** limits text to the size of its parent and shows "..." if it overflows */
    not_exceed?: boolean
    /** splits text into paragraphs using the given string as delimiter */
    split_paragraph?: string
    /** when the text should be screen reader only */
    sr_only?: boolean
}

function splitParagraph(tag: keyof React.JSX.IntrinsicElements, text: string, splitBy: string, className: string): JSX.Element[] {
    const TxtTag = tag
    const splitedText = text.split(splitBy)
        .map(i => i.trim())
        .filter(i => i.length > 0)
        .map(i => i + '.');

    const paragraphs: JSX.Element[] = [];
    for (let i = 0; i < splitedText.length; i += 2) {
        const group = splitedText[i] + (splitedText[i + 1] ? '' + splitedText[i + 1] : '');
        paragraphs.push(
            <TxtTag className={className} key={i}>
                {group}
            </TxtTag>
        )
    }

    return paragraphs
}

export default function Text({ tag, className, children, title, margin, no_select, not_exceed, split_paragraph, sr_only }: textProps) {
    const TxtTag: keyof React.JSX.IntrinsicElements = tag

    const frmtd_className: string = FilterClasses(`
                text 
                ${className || ''}
                ${title ? 'text-title' : ''}
                ${margin ? 'text-margin' : ''}
                ${no_select ? 'text-no-select' : ''}
                ${not_exceed ? 'text-not-exceed' : ''}
                ${sr_only ? 'text-sr-only' : ''}
                `)
    return (
        <>
            {

                split_paragraph && typeof (children) === 'string' ?
                    <div className='text-paragraph-div'>
                        {splitParagraph(tag, children, split_paragraph, frmtd_className)}
                    </div>
                    :
                    <TxtTag className={frmtd_className}>
                        {children}
                    </TxtTag>
            }
        </>
    )
}