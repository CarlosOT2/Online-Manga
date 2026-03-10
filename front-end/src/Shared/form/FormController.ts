//# Types //
import type { InputsController, SubmitController } from '../types/FormController'
//# Libs //
import { useState } from "react";

type config = {
    handleSubmit: (...args: any[]) => Promise<any>;
}

/**
 * **Hook used to manage forms**
 *
 * **It can only be used by one form at a time**
 * 
 * Pass the InputsController onChange function to the input's onChange event, 
 * To manipulate the value written by the user.
 * 
 * In the form submit event, use the onSubmit function provided by SubmitController and pass it to the form’s onSubmit handler.
 * Pass to fetchsubmit (in useFormController) the function responsible for handling the submit. 
 * This function will receive, as an argument, the data object from InputsController.
 * 
 */
export function useFormController(config: config) {
    const { handleSubmit } = config

    const [data, setData] = useState<{ [key: string]: any }>({})

    const InputsController: InputsController = {
        onChange: onChange,
        changeValue: changeValue,
        data: data,
    }
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = event.target

        if (type == 'checkbox') {
            setData(prev => {
                const current = (prev[name] as any[]) || [];

                return {
                    ...prev,
                    [name]: current.includes(value)
                        ? current.filter((v: any) => v !== value)
                        : [...current, value]
                };
            });
        }
        else {
            setData(prev => ({ ...prev, [name]: value }))
        }

        console.log(data)
    }
    function changeValue(name: string, value: any) {
        setData(prev => ({ ...prev, [name]: value }))
    }

    const SubmitController: SubmitController = {
        onSubmit: onSubmit,
    }
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        await handleSubmit(InputsController.data)

        
    }
    
    return { InputsController, SubmitController }
}