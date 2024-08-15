import clsx from "clsx";

import styles from "./TextField.module.css";

/**
 * Much of this would be made generic in a full design system implementation,
 * with types that extend the standard attributes for each type of form
 * element, while omitting attributes that we want to control.
 *
 * 	e.g. Enforce use of handleChange prop instead of using onChange directly
 */

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	errors?: string[];
	handleBlur?: () => void;
	handleChange?: (value: string) => void;
};

export function TextField({
	errors,
	handleBlur,
	handleChange,
	label,
	name,
	value
}: TextFieldProps) {
	const onBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
		handleBlur?.();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange?.(e.target.value);
	};

	// TODO: change error rendering
	return (
		<div className={clsx(
			errors?.length && styles.error,
		)}>
			<label>
				<span>{label}</span>
				<input
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					type="text"
					value={value}
				/>
			</label>
			<span className={styles.errorMsg}>{errors?.join("\n")}</span>
		</div>
	);
}
