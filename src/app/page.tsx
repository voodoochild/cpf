"use client";

import { useState, Dispatch } from "react";
import { getUser } from "~/api/users";
import { getBill } from "~/api/billing";
import { Button } from "~/components/Button";
import { TextField } from "~/components/TextField";
import { omit } from "~/utils/obj";
import { isRequired } from "~/utils/validators";
import type { Validator } from "~/utils/validators";

import styles from "./index.module.css";

/*********** Flow steps ************/

type FlowStepProps = {
  loadNextStep: () => void;
  user: { firstName: string };
  bill: { number: number; total: string; }
  cardNumber: string;
  setCardNumber: Dispatch<string>;
};

function BillSummary({ loadNextStep, user, bill }: FlowStepProps) {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loadNextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hi, {user.firstName}</h1>
      <p>You have {bill.number} medical bills ready from ABC Health System. You can pay your bills here, or verify your identity to view full bill details.</p>
      <dl className={styles.totalDue}>
        <dt>Total due</dt>
        <dd>{bill.total}</dd>
      </dl>
      <Button type="submit">Pay total</Button>
    </form>
  );
}

function PaymentInfo({ cardNumber, setCardNumber, loadNextStep }: FlowStepProps) {
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [formErrors, setFormErrors] = useState<{ [k: string]: string[] }>({});

  const doValidation = (name: string, value: string, validators: Validator<unknown>[]) => {
    const errors = validators.map(
      (fn) => fn(value)
    ).filter(
      (v) => v !== null
    );

    if (errors.length) {
      setFormErrors({
        ...omit<string[]>(name, formErrors),
        [name]: errors,
      });
    } else {
      setFormErrors({
        ...omit<string[]>(name, formErrors)
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loadNextStep();
  };

  // TODO: form layout, "disable" submit button, handle submit
  return (
    <form onSubmit={handleSubmit}>
      <h1>Payment information</h1>
      <TextField
        errors={formErrors?.cardNumber}
        handleBlur={() => doValidation("cardNumber", cardNumber, [isRequired])}
        handleChange={setCardNumber}
        label="Card number"
        name="cardNumber"
        value={cardNumber}
      />
      <div>
        <TextField
          errors={formErrors?.expiry}
          handleBlur={() => doValidation("expiry", expiry, [isRequired])}
          handleChange={setExpiry}
          label="Expires (MM/YY)"
          name="expiry"
          value={expiry}
        />
        <TextField
          errors={formErrors?.cvv}
          handleBlur={() => doValidation("cvv", cvv, [isRequired])}
          handleChange={setCvv}
          label="Security code (CVV)"
          name="cvv"
          value={cvv}
        />
      </div>
      <TextField
        errors={formErrors?.name}
        handleBlur={() => doValidation("name", name, [isRequired])}
        handleChange={setName}
        label="Name on card"
        name="name"
        value={name}
      />
      <TextField
        errors={formErrors?.zipCode}
        handleBlur={() => doValidation("zipCode", zipCode, [isRequired])}
        handleChange={setZipCode}
        label="ZIP code"
        name="zipCode"
        value={zipCode}
      />
      <Button type="submit">Continue</Button>
    </form>
  );
}

function Review({ bill, cardNumber, loadNextStep }: FlowStepProps) {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loadNextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Review and pay</h1>
      <p>You're about to make a payment of {bill.total}</p>
      <dl>
        <dt>Payment method</dt>
        <dd>Card ending in {cardNumber}</dd>
      </dl>
      <Button type="submit">Pay {bill.total}</Button>
    </form>
  );
}

function Completed() {
  return (
    <div>
      <h1>Thank you for your payment!</h1>
    </div>
  );
};

/*********** Flow management ************/

const flowSteps = Object.freeze({
  billSummary: BillSummary,
  paymentInfo: PaymentInfo,
  review: Review,
  completed: Completed,
});

type FlowStep = keyof typeof flowSteps;

function getNextStep(currentStep: string) {
  const keys = Object.keys(flowSteps);
  const index = keys.indexOf(currentStep);
  const nextIndex = index + 1;
  return nextIndex < keys.length ? keys[nextIndex] : currentStep;
}

/*********** Flow rendering ************/

export default function PaymentFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("billSummary");
  const [cardNumber, setCardNumber] = useState("");

  // Mocked API calls -- would be in a useEffect if retrieved async
  const user = getUser();
  const bill = getBill();

  const loadNextStep = () => {
    const nextStep = getNextStep(currentStep) as FlowStep;
    if (nextStep && nextStep !== currentStep) {
      setCurrentStep(nextStep);
    }
  }

  const Step = flowSteps[currentStep];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Step
          bill={bill}
          cardNumber={cardNumber}
          loadNextStep={loadNextStep}
          setCardNumber={setCardNumber}
          user={user}
        />
      </div>
    </main>
  );
}
