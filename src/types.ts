/** Option shape shared by BaseSelect and BaseMenuSelect. */
export interface SelectOption<T extends string = string> {
    value: T;
    label: string;
    title?: string;
    disabled?: boolean;
}

/** A selectable option within a BaseToggleGroup action. */
export interface BaseToggleGroupSubAction {
    id: string;
    label: string;
    icon: string;
    title?: string;
    active?: boolean;
    disabled?: boolean;
}

/** A toolbar action: a toggle button, or a fold-out radio menu when `subActions` is set. */
export interface BaseToggleGroupAction {
    id: string;
    label: string;
    icon: string;
    title?: string;
    active?: boolean;
    disabled?: boolean;
    subActions?: readonly BaseToggleGroupSubAction[];
}
