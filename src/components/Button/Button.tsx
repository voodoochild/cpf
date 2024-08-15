import React from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	appearDisabled?: boolean;
}

export function Button(props: ButtonProps) {
	return (
		<button
			className={clsx(
				styles.btn,
				props.appearDisabled && styles.disabled
			)}
			type="submit"
		>
			{props.children}
		</button>
	);
}
