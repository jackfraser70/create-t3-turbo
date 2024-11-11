import type { ComponentMapping } from "../layout/ComponentMapping";

export interface LayoutData {
	/**
	 * auto generated id
	 */
	id?: string;
	/**
	 * optional name of the component
	 */
	name?: string;
	/**
	 * name of the component (required to be in ComponentMapping)
	 */
	component: keyof typeof ComponentMapping;
	/**
	 * props for the component
	 */
	props: Record<string, unknown>;
	/**
	 * children of the component
	 */
	children?: LayoutData[];
}
[];
