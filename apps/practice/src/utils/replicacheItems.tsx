import type { ReadTransaction } from "replicache";

// Add this type definition at the top of your file
type ReadonlyJSONValue =
	| string
	| number
	| boolean
	| null
	| ReadonlyJSONArray
	| ReadonlyJSONObject;
interface ReadonlyJSONArray extends ReadonlyArray<ReadonlyJSONValue> {}
interface ReadonlyJSONObject {
	readonly [key: string]: ReadonlyJSONValue;
}

// Define a generic function to list items based on a prefix
export async function listItems<T extends ReadonlyJSONValue>(
	tx: ReadTransaction,
	prefix: string,
): Promise<T[]> {
	// return the id and the item
	return (await tx.scan<T>({ prefix, limit: 100 }).values().toArray()) as T[];
}
