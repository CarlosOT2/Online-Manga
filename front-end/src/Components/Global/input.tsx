//# Utils //
import FilterClasses from '../../Utils/FilterClasses';
//# Types //
import type { InputsController } from '../../Types/InputsController'
import { IconType } from 'react-icons';
//# Classes //
import './input.scss'

type input = {
    /** type of the input */
    type: string
    /** name of the input, used in 'InputsData' from 'InputsController' Helper */
    name: string
    /** additional CSS classes to apply */
    className?: string
    /** aria-label of the input */
    ariaLabel?: string
    /** autoComplete of the input */
    autoComplete?: "on" | "off"
    /** add a icon to input */
    Icon?: IconType
    /** controller object containing InputsController from 'InputsController' Helper */
    InputsController: InputsController
}


export default function Input({ type, name, className = '', ariaLabel, autoComplete = "on", Icon, InputsController }: input) {
    function DefaultInput() {
        return (
            <input
                type={type}
                name={name}
                className={FilterClasses(`
                    input
                    ${className}
                    ${Icon ? 'input--icon' : ''}
                `)}
                aria-label={ariaLabel || undefined}
                onChange={InputsController.InputOnChange}
                autoComplete={autoComplete}
            />
        )
    }

    return (
        <>
            {Icon ?
                <div className={`input-div`}>
                    <Icon className={`input__icon`} />
                    <DefaultInput />
                </div>
                :
                <DefaultInput />
            }
        </>
    )
}