import React, { useState } from "react";
import icon from "./assets/images/icon.svg";
import empty from "./assets/images/empty.svg";

function App() {
  return (
    <div>
      <Card />
    </div>
  );
}

function Card() {
  const [amount, setAmount] = useState("");
  const [yearly, setYearly] = useState("");
  const [percentage, setPercentage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [result, setResult] = useState(null);
  const [yearResult, setYearResult] = useState(null);

  // format total
  function formatCurrency(total) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(total);
  }

  // state before sbmission
  const [error, setError] = useState({
    amount: false,
    yearly: false,
    percentage: false,
    selectedType: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // clear all
  function handleClear() {
    setAmount("");
    setPercentage("");
    setYearly("");
    setSelectedType("");
    setResult(null);
    setYearResult(null);
    setError({
      amount: false,
      yearly: false,
      percentage: false,
      selectedType: false,
    });
    setHasSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);
    const newErrors = {
      amount: !amount,
      yearly: !yearly,
      percentage: !percentage,
      selectedType: !selectedType,
    };

    setError(newErrors);
    // if field is empty simply retun
    if (!percentage || !amount || !selectedType || !yearly) {
      return;
    }
    let calculatedResult = 0;
    let yearCalculatedResult = 0;
    if (selectedType === "repayment") {
      calculatedResult = (amount * yearly * percentage) / 100;
      yearCalculatedResult = (amount * yearly * percentage * 1000) / 100;
    } else if (selectedType === "interest") {
      calculatedResult = (amount + yearly + percentage) / 100;
      yearCalculatedResult = (amount + yearly + percentage * 1000) / 100;
    }
    setResult(calculatedResult);
    setYearResult(yearCalculatedResult);
  }

  return (
    <main>
      <Calculator
        amount={amount}
        onChange={setAmount}
        yearly={yearly}
        onYearly={setYearly}
        percentage={percentage}
        onPercentage={setPercentage}
        selectedType={selectedType}
        onSelectedType={setSelectedType}
        onHandleClear={handleClear}
        onSubmit={handleSubmit}
        error={error}
        hasSubmitted={hasSubmitted}
      />
      <Result
        result={result}
        onClick={handleSubmit}
        yearResult={yearResult}
        formatCurrency={formatCurrency}
      />
    </main>
  );
}

function Calculator({
  amount,
  onChange,
  yearly,
  onPercentage,
  onYearly,
  percentage,
  selectedType,
  onSelectedType,
  onHandleClear,
  onSubmit,
  error,
  hasSubmitted,
}) {
  return (
    <section className="form-area">
      <div className="title">
        <h2>Mortage Calculator</h2>
        <div onClick={onHandleClear}>Clear All</div>
      </div>

      <form>
        <div className="input-group">
          <label>Mortage Amount</label>
          <div
            className={`input-with-symbol ${
              error.amount && hasSubmitted ? "input-error" : ""
            }`}
          >
            <span
              className={`${
                error.amount && hasSubmitted ? "span-error" : "success"
              } `}
            >
              £
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => onChange(Number(e.target.value))}
            />
          </div>
          {error.amount && hasSubmitted ? (
            <small>This field is required</small>
          ) : (
            ""
          )}
        </div>
        <div className="input-box">
          <div className="input-field field">
            <label>Mortgage Term</label>
            <div
              className={`input-with-year ${
                error.yearly && hasSubmitted ? "input-error" : ""
              }`}
            >
              <input
                type="number"
                value={yearly}
                onChange={(e) => onYearly(Number(e.target.value))}
              />

              <span
                className={`${
                  error.percentage && hasSubmitted ? "year-error" : "year"
                } `}
              >
                years
              </span>
            </div>
            {error.yearly && hasSubmitted ? (
              <small>This field is required</small>
            ) : (
              ""
            )}
          </div>
          <div className="input-field field">
            <label>Interest Rate</label>
            <div
              className={`input-with-percentage ${
                error.percentage && hasSubmitted ? "input-error" : ""
              }`}
            >
              <input
                type="number"
                value={percentage}
                onChange={(e) => onPercentage(Number(e.target.value))}
              />

              <span
                className={`${
                  error.percentage && hasSubmitted
                    ? "percentage-error"
                    : "percentage"
                } `}
              >
                %
              </span>
            </div>
            {error.percentage && hasSubmitted ? (
              <small>This field is required</small>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <label>Mortgage Type</label>
          <div className="tip">
            <input
              type="radio"
              value="repayment"
              checked={selectedType === "repayment"}
              onChange={(e) => onSelectedType(e.target.value)}
            />
            <span>Repayment</span>
          </div>
          <div className="tip">
            <input
              type="radio"
              value="interest"
              checked={selectedType === "interest"}
              onChange={(e) => onSelectedType(e.target.value)}
            />
            <span>Interest Only</span>
          </div>
          {error.selectedType && hasSubmitted ? (
            <small>This field is required</small>
          ) : (
            ""
          )}
        </div>

        <button onClick={onSubmit}>
          <img src={icon} alt="calculator" />
          Calculate Repayments
        </button>
      </form>
    </section>
  );
}

function Result({ result, yearResult, formatCurrency }) {
  return (
    <div className="result-area">
      {!result && yearResult === null ? (
        <div className="incompleted">
          <img src={empty} alt="Empty illustration" />
          <h2>Results shown here</h2>
          <p>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="complete-message">
          <h2>Your results</h2>
          <p>
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="result-message">
            <div>
              <p>Your monthly repayments</p>
              <h2>{formatCurrency(result)}</h2>
            </div>
            <p>Total you'll repay over the term</p>
            <h2>{formatCurrency(yearResult)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
