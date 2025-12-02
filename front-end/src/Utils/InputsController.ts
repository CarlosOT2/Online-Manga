//# Types //
import type  { InputsController } from '../Types/InputsController'
//# Libs //
import { useState } from "react";

/**
 * **Function used to manage inputs form**
 *
 * To use it, pass the InputOnChange function to the input's onChange event. 
 * To access and manipulate the value written by the user, use InputsData, 
 * which holds the current input values
 */
export function InitInputsController() {
    const [InputsData, setInputsData] = useState({})

    const InputsController: InputsController = {
        InputOnChange: OnChange
    }   

    function OnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setInputsData(prev => ({
            ...prev,      
            [name]: value 
        }))
    }

    return ({
        InputsData: InputsData,
        InputsController: InputsController,
    })
}