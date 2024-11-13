import type { BaseTypeRep } from "./baseTypesRep";

export type Task = BaseTypeRep & {
	readonly name: string;
	readonly dueDate: string;
};
