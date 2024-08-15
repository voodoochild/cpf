import React from "react";
import clsx from "clsx";

import styles from "./TextField.module.css";

interface TextFieldProps extends React.ComponentPropsWithoutRef<"input"> {
	label: string;
	name: string;
	errors?: string[];
	handleBlur?: () => void;
	handleChange?: (value: string) => void;
}

export function TextField({
	errors,
	handleBlur,
	handleChange,
	label,
	name,
	value,
	...rest
}: TextFieldProps) {
	const onBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
		handleBlur?.();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange?.(e.target.value);
	};

	return (
		<div className={
			clsx(
				styles.textField,
				Boolean(value) && !errors?.length && styles.valid,
				errors?.length && styles.error
			)
		}>
			<label>
				<span className={styles.label}>{label}</span>
				<input
					{...rest}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					type="text"
					value={value}
				/>
			</label>
			{errors?.map((err) => (<div className={styles.errorMsg}>{err}</div>))}
		</div>
	);
}
