import React, { useState } from 'react';
import axios from 'axios';

const DeleteCurrency = () => {
    const [currencyCode, setCurrencyCode] = useState('');

    const handleDeleteCurrency = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/currency/${currencyCode}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting currency:', error);
        }
    };

    return (
        <div className="delete-currency-container">
            <h2>Delete Currency</h2>
            <label>Currency Code:</label>
            <input type="text" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />

            <button onClick={handleDeleteCurrency}>Delete Currency</button>
        </div>
    );
};

export default DeleteCurrency;
