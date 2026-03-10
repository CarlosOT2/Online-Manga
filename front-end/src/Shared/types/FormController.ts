export type InputsController = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    changeValue: (name: string, value: any) => void,
    data: Record<string, any>
}

export type SubmitController = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}