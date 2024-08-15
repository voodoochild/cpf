import { PropsWithChildren } from "react";

import styles from "./Button.module.css";

export type ButtonProps = PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button(props: ButtonProps) {
	return (
		<button
			className={styles.btn}
			type="submit"
		>
			{props.children}
		</button>
	);
}
