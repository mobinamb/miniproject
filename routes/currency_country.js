const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');
const Country = require('../models/Country');

router.get('/', async (req, res) => {
    try {
        const currenciesWithCountry = await Currency.findAll({
            include: [{
                model: Country,
                attributes: ['name']
            }],
            attributes: ['currencyCode']
        });

        const currencyCountryData = currenciesWithCountry.map(currency => ({
            currencyCode: currency.currencyCode,
            countryName: currency.Country ? currency.Country.name : 'Unknown'
        }));

        res.json(currencyCountryData);
    } catch (error) {
        console.error('Error occurred while retrieving currency-country data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
