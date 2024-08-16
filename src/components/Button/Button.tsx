import React from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	appearDisabled?: boolean;
}

export function Button({
	appearDisabled,
	children,
	className,
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			className={clsx(
				className,
				styles.btn,
				appearDisabled && styles.disabled
			)}
			type="submit"
		>
			{children}
		</button>
	);
}
