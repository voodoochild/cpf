import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentFlow from "./page";

describe("PaymentFlow", () => {
	it("renders the bill summary", () => {
		render(<PaymentFlow />);

		const greetingEl = screen.getByText("Hi, Taylor");
		const buttonEl = screen.getByRole("button", { name: "Pay total" });

		expect(greetingEl).toBeInTheDocument();
		expect(buttonEl).toBeInTheDocument();
	});

	it("renders the payment info form", async () => {
		const user = userEvent.setup();

		render(<PaymentFlow />);

		await user.click(screen.getByRole("button", { name: "Pay total" }));

		const cardNumberEl = screen.getByTestId("pf-cardnumber");
		const expiryEl = screen.getByTestId("pf-expiry");
		const cvvEl = screen.getByTestId("pf-cvv");
		const nameEl = screen.getByTestId("pf-name");
		const zipCodeEl = screen.getByTestId("pf-zipcode");

		expect(cardNumberEl).toBeInTheDocument();
		expect(expiryEl).toBeInTheDocument();
		expect(cvvEl).toBeInTheDocument();
		expect(nameEl).toBeInTheDocument();
		expect(zipCodeEl).toBeInTheDocument();
	});

	it("shows an error when a required field is empty", async () => {
		const user = userEvent.setup();

		render(<PaymentFlow />);

		await user.click(screen.getByRole("button", { name: "Pay total" }));

		const cardNumberEl = screen.getByTestId("pf-cardnumber");

		fireEvent.blur(cardNumberEl);

		const errorEl = screen.getByText("This field is required.");

		expect(errorEl).toBeInTheDocument();
	});

	it("renders the payment review", async () => {
		const user = userEvent.setup();

		render(<PaymentFlow />);

		await user.click(screen.getByRole("button", { name: "Pay total" }));

		const cardNumberEl = screen.getByTestId("pf-cardnumber");
		const expiryEl = screen.getByTestId("pf-expiry");
		const cvvEl = screen.getByTestId("pf-cvv");
		const nameEl = screen.getByTestId("pf-name");
		const zipCodeEl = screen.getByTestId("pf-zipcode");

		fireEvent.change(cardNumberEl, { target: { value: "1111222233334444" } });
		fireEvent.change(expiryEl, { target: { value: "08/24" } });
		fireEvent.change(cvvEl, { target: { value: "123" } });
		fireEvent.change(nameEl, { target: { value: "Kriss Watt" } });
		fireEvent.change(zipCodeEl, { target: { value: "95032" } });

		await user.click(screen.getByRole("button", { name: "Continue" }));

		const paymentEl = screen.getByText("Card ending in ••••4444");
		const buttonEl = screen.getByRole("button", { name: "Pay $600.00" });

		expect(paymentEl).toBeInTheDocument();
		expect(buttonEl).toBeInTheDocument();
	});

	it("renders completed message", async () => {
		const user = userEvent.setup();

		render(<PaymentFlow />);

		await user.click(screen.getByRole("button", { name: "Pay total" }));

		const cardNumberEl = screen.getByTestId("pf-cardnumber");
		const expiryEl = screen.getByTestId("pf-expiry");
		const cvvEl = screen.getByTestId("pf-cvv");
		const nameEl = screen.getByTestId("pf-name");
		const zipCodeEl = screen.getByTestId("pf-zipcode");

		fireEvent.change(cardNumberEl, { target: { value: "1111222233334444" } });
		fireEvent.change(expiryEl, { target: { value: "08/24" } });
		fireEvent.change(cvvEl, { target: { value: "123" } });
		fireEvent.change(nameEl, { target: { value: "Kriss Watt" } });
		fireEvent.change(zipCodeEl, { target: { value: "95032" } });

		await user.click(screen.getByRole("button", { name: "Continue" }));
		await user.click(screen.getByRole("button", { name: "Pay $600.00" }));

		const thankYouEl = screen.getByText("Thank you for your payment!");

		expect(thankYouEl).toBeInTheDocument();
	});
});
