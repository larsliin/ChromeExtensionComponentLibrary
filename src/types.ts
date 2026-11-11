/** Option shape shared by BaseSelect and BaseMenuSelect. */
export interface SelectOption<T extends string = string> {
    value: T;
    label: string;
    disabled?: boolean;
}
