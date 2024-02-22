import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Conversion = () => {
  // State variables to manage input values and converted amount
  const [initialCurrencyCode, setInitialCurrencyCode] = useState('');
  const [finalCurrencyCode, setFinalCurrencyCode] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);

  // Fetch all currencies from the backend API on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/currency');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  // Event handler for initial currency code input change
  const handleInitialCurrencyCodeChange = (event) => {
    setInitialCurrencyCode(event.target.value);
  };

  // Event handler for final currency code input change
  const handleFinalCurrencyCodeChange = (event) => {
    setFinalCurrencyCode(event.target.value);
  };

  // Event handler for amount input change 
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Event handler for conversion button click
  const handleConvert = () => {
    // Find the currency objects corresponding to the initial and final currency codes
    const initialCurrency = currencies.find(currency => currency.currencyCode === initialCurrencyCode);
    const finalCurrency = currencies.find(currency => currency.currencyCode === finalCurrencyCode);

    if (initialCurrency && finalCurrency) {
      // Perform the conversion using the conversion rates of the initial and final currencies
      const conversionRate = finalCurrency.conversionRate / initialCurrency.conversionRate;
      const converted = amount * conversionRate;
      setConvertedAmount(converted);
    } else {
      console.error('Initial or final currency not found');
    }
  };

  return (
    <div className="conversion-container">
      <h2>Conversion</h2>
      <div>
        <label htmlFor="initialCurrencyCode">Initial Currency Code:</label>
        <input
          type="text"
          id="initialCurrencyCode"
          value={initialCurrencyCode}
          onChange={handleInitialCurrencyCodeChange}
        />
      </div>
      <div>
        <label htmlFor="finalCurrencyCode">Final Currency Code:</label>
        <input
          type="text"
          id="finalCurrencyCode"
          value={finalCurrencyCode}
          onChange={handleFinalCurrencyCodeChange}
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
