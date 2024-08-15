export type Validator<T> = (value: T) => null | string;

export function isRequired<T>(value: T): null | string {
	if (!Boolean(value)) {
		return "This field is required.";
	}

	return null;
};
