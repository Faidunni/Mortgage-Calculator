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

  const calculation = (amount * yearly * percentage) / 100;
  const [selectedType, setSelectedType] = useState("repayment");
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
      />
      <Result />
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
}) {
  return (
    <section className="form-area">
      <div className="title">
        <h2>Mortage Calculator</h2>
        <div>Clear All</div>
      </div>

      <form>
        <div className="input-group">
          <label>Mortage Amount</label>
          <div className="input-with-symbol">
            <span>£</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => onChange(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <div className="input-group">
            <label>Mortgage Term</label>
            <div className="input-with-label">
              <input
                type="text"
                value={yearly}
                onChange={(e) => onYearly(Number(e.target.value))}
              />
              <span>years</span>
            </div>
          </div>
          <div className="input-group">
            <label>Interest Rate</label>
            <div className="input-with-label">
              <input
                type="text"
                value={percentage}
                onChange={(e) => onPercentage(Number(e.target.value))}
              />
              <span>%</span>
            </div>
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
              value="repayment"
              checked={selectedType === "repayment"}
              onChange={(e) => onSelectedType(e.target.value)}
            />
            <span>Interest Only</span>
          </div>
        </div>
        <button>
          <img src={icon} alt="calculator" />
          Calculate Repayments
        </button>
      </form>
    </section>
  );
}
function Result() {
  return (
    <div className="result-area">
      <img src={empty} alt={empty} />
      <h2>Results shown here</h2>
      <p>
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

export default App;
