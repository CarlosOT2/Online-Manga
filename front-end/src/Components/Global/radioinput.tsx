//# Components //
import Text from './text'
//# Utils //
import FilterClasses from '../../Shared/utils/FilterClasses';
//# Types //
import type { InputsController } from '../../Shared/types/FormController'
//# Classes //
import './radioinput.scss'

interface radioinput {
    /** Value is the data you want to store when that option is selected */
    value: any
    /** name of the input, used in 'data' from 'FormController' Hook */
    name: string
    /** label for the radio input */
    label: string
    /** controller object containing InputsController from 'FormController' Hook */
    InputsController: InputsController
    /** additional CSS classes to apply on label */
    classNameLabel?: string
    /** additional CSS classes to apply on input */
    classNameInput?: string
    /** onClick of the radio input */
    onClick?: any
    /** aria-label of the radio input */
    ariaLabel?: string
    /** aria-labelledby of the radio input */
    ariaLabelledBy?: string
}

export default function radioinput({
    value,
    name,
    label,
    InputsController,
    classNameInput = '',
    classNameLabel = '',
    onClick,
    ariaLabel = undefined,
    ariaLabelledBy = undefined
}: radioinput) {

    const frmtd_value = String(value)
    const checked = InputsController.data[name] === frmtd_value

    const frmtd_classNameLabel = `
      radioinput-label
      ${classNameLabel}
    `
    const frmtd_classNameInput = `
      radioinput-input
      ${classNameInput}
      ${checked ? 'radioinput-input--checked' : ''}
    `

    const frmtd_classNameText = `
      radioinput-text
      ${checked ? 'radioinput-text--checked' : ''}
    `
    
    return (
        <label className={FilterClasses(frmtd_classNameLabel)}>
            <input
                type="radio"
                name={name}
                value={frmtd_value}
                className={FilterClasses(frmtd_classNameInput)}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                onChange={InputsController.onChange}
                onClick={() => {
                    if(onClick) onClick()
                    if(checked) InputsController.changeValue(name, null)
                }}
                checked={checked}
            />
            <Text tag='span' no_select={true} className={FilterClasses(frmtd_classNameText)}>
                {label}
            </Text>
        </label>
    )
}