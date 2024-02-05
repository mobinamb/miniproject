import React, { useState } from 'react';

const Conversion = () => {
  // State variables to manage input values and converted amount
  const [currencyCode, setCurrencyCode] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  // Event handler for currency code input change
  const handleCurrencyCodeChange = (event) => {
    setCurrencyCode(event.target.value);
  };

  // Event handler for amount input change 
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Event handler for conversion button click (not implemented yet)
  const handleConvert = () => {
    // Placeholder for conversion logic (to be implemented later)
    // Here, you would fetch exchange rates and calculate the converted amount
    // For now, let's just display the original amount
    setConvertedAmount(amount);
  };

  return (
    <div className="conversion-container">
      <h2>Conversion</h2>
      <div>
        <label htmlFor="currencyCode">Currency Code:</label>
        <input
          type="text"
          id="currencyCode"
          value={currencyCode}
          onChange={handleCurrencyCodeChange}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <div>
        <label htmlFor="convertedAmount">Converted Amount:</label>
        <input
          type="text"
          id="convertedAmount"
          value={convertedAmount}
          readOnly // Make the field read-only
        />
      </div>
    </div>
  );
};

export default Conversion;
