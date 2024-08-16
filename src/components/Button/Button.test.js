import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
	it("renders a button", () => {
		const label = "I am a button";

		render(<Button data-testid={"btn"}>{label} </Button>);

		const buttonEl = screen.getByTestId("btn");

		expect(buttonEl).toBeInTheDocument()
	});
});
