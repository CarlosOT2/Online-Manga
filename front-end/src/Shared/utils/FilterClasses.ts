/**
 * **Filters classes, fixing their text**
 *
 * @param classes Contains classesName
 * @returns return Filtered Classes
 */
export default function FilterClasses(classes: string): string {
    return classes.replace(/\s+/g, ' ').trim()
}
 