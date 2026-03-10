export default function isNumber(value: string): boolean {
    return value.trim() !== "" && !isNaN(Number(value))
}