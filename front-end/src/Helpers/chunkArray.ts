/**
 * **Filters classes, fixing their text**
 *
 * @param arr Contains the array
 * @param size Max size per sub-array 
 * @returns return Filtered Classes
 */
export default function chunkArray<T>(arr: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}