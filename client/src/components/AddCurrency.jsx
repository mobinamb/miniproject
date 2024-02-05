import React, { useState } from 'react';
import axios from 'axios';

const AddCurrency = () => {
  // State variables to manage input values for currency code, country name, and conversion rate
  const [_currencyCode, setCurrencyCode] = useState('');
  const [_countryName, setCountryName] = useState('');
  const [_conversionRate, setConversionRate] = useState('');

  // Event handler for form submission 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCurrency = {
      currencyCode: _currencyCode,
      countryName: _countryName,
      conversionRate: parseFloat(_conversionRate)
    };
  
    try {
      const response = await axios.post('http://localhost:3001/api/currency-country/', newCurrency);
      console.log('Response:', response.data);
      // Reset form fields after successful submission
      setCurrencyCode('');
      setCountryName(''); // Reset to default country name
      setConversionRate(''); // Reset to default conversion rate
    } catch(error) {
      console.error('Error:', error);
      // Log more details about the error
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    };
  };

  return (
    <div className="add-currency-container">
      <h2>Add Currency</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currencyCode">Currency Code:</label>
          <input
            type="text"
            id="currencyCode"
            value={_currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={_countryName}
            onChange={(e) => setCountryName(e.target.value)} // Update country name
            required
          />
        </div>
        <div>
          <label htmlFor="conversionRate">Conversion Rate:</label>
          <input
            type="number"
            id="conversionRate"
            value={_conversionRate}
            onChange={(e) => setConversionRate(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <button type="submit">Add Currency</button>
        </div>
      </form>
    </div>
  );
};

export default AddCurrency;
