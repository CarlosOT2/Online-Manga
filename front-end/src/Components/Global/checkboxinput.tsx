//# Components //
import Text from './text';
//# Utils //
import FilterClasses from '../../Shared/utils/FilterClasses';
//# Types //
import type { InputsController } from '../../Shared/types/FormController'
//# Classes //
import './checkboxinput.scss'

interface checkboxinput {
    /** Value is the data you want to store when that option is selected */
    value: any
    /** name of the input, used in 'data' from 'FormController' Hook */
    name: string
    /** controller object containing InputsController from 'FormController' Hook */
    InputsController: InputsController
    /** label for the checkbox */
    label: string
    /** additional CSS classes to apply on label */
    classNameLabel?: string
    /** additional CSS classes to apply on input */
    classNameInput?: string
    /** onClick of the checkbox input */
    onClick?: any
    /** apply default style */
    defaultStyle?: boolean
    /** aria-label of the checkbox input */
    ariaLabel?: string
    /** aria-labelledby of the checkbox input */
    ariaLabelledBy?: string

}

export default function checkboxinput({
    value,
    name,
    InputsController,
    label,

    classNameLabel = '',
    classNameInput = '',

    onClick,
    ariaLabel = undefined,
    ariaLabelledBy = undefined
}: checkboxinput) {

    const frmtd_value = String(value)
    const checked = InputsController.data[name]?.includes?.(frmtd_value) ?? false
    
    const frmtd_classNameLabel: string = `
       checkboxinput-label 
       ${checked ? 'checkboxinput-label--selected' : ''}
       ${classNameLabel}
       `
    const frmtd_classNameInput: string = `
       checkboxinput-input 
       ${classNameInput}
       `
    const frmtd_classNameText: string = `
       checkboxinput-text 
       ${checked ? 'checkboxinput-text--selected' : ''}
       `

    return (
        <>
            <label className={FilterClasses(frmtd_classNameLabel)}>
                <input
                    type="checkbox"
                    name={name}
                    onClick={onClick}
                    value={frmtd_value}
                    className={FilterClasses(frmtd_classNameInput)}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    onChange={InputsController.onChange}
                    checked={checked}
                />
                <Text
                    tag='span'
                    no_select={true}
                    className={FilterClasses(frmtd_classNameText)}
                >
                    {label}
                </Text>
            </label>

        </>
    )
}