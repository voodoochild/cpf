export function omit<T>(key: string, obj: { [k: string]: T }) {
	const { [key]: omitted, ...rest } = obj;
	return rest;
}
