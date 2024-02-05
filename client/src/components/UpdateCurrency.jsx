import React, { useState } from 'react';
import axios from 'axios';

const UpdateCurrency = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [newConversionRate, setNewConversionRate] = useState('');

    const handleUpdateCurrency = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/currency/${currencyCode}`, {
                newConversionRate: parseFloat(newConversionRate)
            });
            console.log(response.data); // You can handle success message or redirection
        } catch (error) {
            console.error('Error updating currency:', error);
        }
    };

    return (
        <div className="update-currency-container">
            <h2>Update Currency</h2>
            <label>Currency Code:</label>
            <input type="text" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />

            <label>New Conversion Rate:</label>
            <input type="number" value={newConversionRate} onChange={(e) => setNewConversionRate(e.target.value)} />

            <button onClick={handleUpdateCurrency}>Update Currency</button>
        </div>
    );
};

export default UpdateCurrency;
