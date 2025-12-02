/**
 * **Splits an array into subarrays of specified size**
 *
 * @param arr Contains the array
 * @param size Max size per sub-array 
 * @returns An array of subarrays
 */
export default function chunkArray<T>(arr: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}