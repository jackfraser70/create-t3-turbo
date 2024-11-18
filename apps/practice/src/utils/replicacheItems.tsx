import type { ReadTransaction } from "replicache";

// Modify the type definitions to be compatible with JSONValue
type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
interface JSONArray extends Array<JSONValue> {}
interface JSONObject {
	[key: string]: JSONValue;
}

// Define a generic function to list items based on a prefix
export async function listItems<T extends JSONValue>(
	tx: ReadTransaction,
	prefix: string,
): Promise<T[]> {
	// return the id and the item
	return (await tx.scan<T>({ prefix, limit: 100 }).values().toArray()) as T[];
}

export async function getItem<T extends JSONValue>(
	tx: ReadTransaction,
	id: string,
): Promise<T | null> {
	try {
		console.log("Attempting to retrieve item with ID:", id);
		const returnValue = await tx.get<T>(id);
		if (returnValue === undefined) {
			console.warn(`Item with ID ${id} not found.`);
			return null;
		}
		console.log("Item retrieved successfully:", returnValue);
		return returnValue as T;
	} catch (error) {
		console.error("Error retrieving item:", error);
		return null;
	}
}
