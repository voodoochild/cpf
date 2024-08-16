"use client";

import React, { useState, Dispatch } from "react";
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
    <form className={styles.billSummary} method="post" onSubmit={handleSubmit}>
      <h1 className={styles.greeting} role="presentation">Hi, {user.firstName}</h1>
      <p className={styles.summary}>You have {bill.number} medical bills ready from ABC Health System. You can pay your bills here, or verify your identity to view full bill details.</p>
      <dl className={styles.totalDue}>
        <dt>Total due</dt>
        <dd>{bill.total}</dd>
      </dl>
      <Button type="submit">Pay total</Button>
    </form>
  );
}

function PaymentInfo({ cardNumber, setCardNumber, loadNextStep }: FlowStepProps) {
  // REFACTOR: move state up to the top-level component
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

    // REFACTOR: add list of validators to the field definition
    // Run a validation pass on all fields
    const formData = { cardNumber, expiry, cvv, name, zipCode };
    const _formErrors: { [k: string]: string[] } = {};
    Object.entries(formData).map(([key, value]) => {
      const errors = [isRequired].map(
        (fn) => fn(value)
      ).filter(
        (v) => v !== null
      );

      if (errors.length) {
        _formErrors[key] = errors;
      }
    });

    if (Object.keys(_formErrors).length) {
      setFormErrors(_formErrors);
    } else {
      loadNextStep();
    }
  };

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <span role="presentation">1</span>
        <h1>Payment information</h1>
      </div>
      <div className={styles.formFields}>
        <TextField
          data-testid="pf-cardnumber"
          errors={formErrors?.cardNumber}
          handleBlur={() => doValidation("cardNumber", cardNumber, [isRequired])}
          handleChange={setCardNumber}
          label="Card number"
          maxLength={16}
          name="cardNumber"
          value={cardNumber}
        />
        <div className={styles.sideBySide}>
          <TextField
            data-testid="pf-expiry"
            errors={formErrors?.expiry}
            handleBlur={() => doValidation("expiry", expiry, [isRequired])}
            handleChange={setExpiry}
            label="Expires (MM/YY)"
            maxLength={5}
            name="expiry"
            value={expiry}
          />
          <TextField
            data-testid="pf-cvv"
            errors={formErrors?.cvv}
            handleBlur={() => doValidation("cvv", cvv, [isRequired])}
            handleChange={setCvv}
            label="Security code (CVV)"
            maxLength={3}
            name="cvv"
            value={cvv}
          />
        </div>
        <TextField
          data-testid="pf-name"
          errors={formErrors?.name}
          handleBlur={() => doValidation("name", name, [isRequired])}
          handleChange={setName}
          label="Name on card"
          name="name"
          value={name}
        />
        <TextField
          data-testid="pf-zipcode"
          errors={formErrors?.zipCode}
          handleBlur={() => doValidation("zipCode", zipCode, [isRequired])}
          handleChange={setZipCode}
          label="ZIP code"
          maxLength={5}
          name="zipCode"
          value={zipCode}
        />
        <Button
          appearDisabled={Object.keys(formErrors).length > 0}
          type="submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}

function Review({ bill, cardNumber, loadNextStep }: FlowStepProps) {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loadNextStep();
  };

  // TODO: this will break if cardNumber is too short,
  // but that would be caught by proper form validation
  const lastFour = cardNumber.substring(cardNumber.length - 4);

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <span role="presentation">2</span>
        <h1>Review and pay</h1>
      </div>
      <p className={styles.paymentDetails}>You're about to make a payment of <b>{bill.total}</b></p>
      <dl className={styles.paymentMethod}>
        <dt>Payment method</dt>
        <dd>
          <img aria-hidden="true" src="/visa.svg" /> Card ending in ••••{lastFour}
        </dd>
      </dl>
      <Button type="submit">Pay {bill.total}</Button>
    </form>
  );
}

function Completed() {
  return (
    <div>
      <h1 className={styles.thankYou} role="presentation">Thank you for your payment!</h1>
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
