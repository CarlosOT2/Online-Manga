//# Utils //
import FilterClasses from '../../Shared/utils/FilterClasses';
//# Libs //
import { useRef, useEffect } from 'react';
//# Types //
import type { InputsController } from '../../Shared/types/FormController'
import { IconType } from 'react-icons';
//# Classes //
import './input.scss'

type input = {
    /** type of the input */
    type: string
    /** name of the input, used in 'data' from 'FormController' Hook */
    name: string
    /** additional CSS classes to apply */
    className?: string
    /** aria-label of the input */
    ariaLabel?: string
    /** autoComplete of the input */
    autoComplete?: "on" | "off"
    /** add a icon to input */
    Icon?: IconType
    /** controller object containing InputsController from 'FormController' Hook */
    InputsController: InputsController
}


export default function Input({ type, name, className = '', ariaLabel, autoComplete = "on", Icon, InputsController }: input) {

    //.. Used to prevent input from losing focus when the user types
    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        ref.current?.focus();
    }, [InputsController.data[name]]);

    function DefaultInput() {
        return (
            <input
                ref={ref}
                type={type}
                name={name}
                value={InputsController.data[name]}
                className={FilterClasses(`
                    input
                    ${className}
                `)}
                aria-label={ariaLabel || undefined}
                onChange={InputsController.onChange}
                autoComplete={autoComplete}
            />
        )
    }

    return (
        <>
            {Icon ?
                <div className={`input-icon-container ${className}`}>
                    <Icon />
                    <DefaultInput />
                </div>
                :
                <DefaultInput />
            }
        </>
    )
}