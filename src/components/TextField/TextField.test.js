import { render, screen } from "@testing-library/react";
import { TextField } from ".";

describe("TextField", () => {
	it("renders a textfield", () => {
		const label = "First name";
		const name = "firstname";

		render(<TextField label={label} name={name} data-testid={"tf"} />);

		const labelEl = screen.getByText(label);
		const inputEl = screen.getByTestId("tf");

		expect(labelEl).toBeInTheDocument();
		expect(inputEl).toBeInTheDocument();
	});
});
