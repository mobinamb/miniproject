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


router.post('/', async (req, res) => {
    const { currencyCode, countryName, conversionRate } = req.body;

    try {
        // Check if the country already exists in the database
        let country = await Country.findOne({ where: { name: countryName } });
        
        // If the country doesn't exist, create a new country entry
        if (!country) {
            country = await Country.create({ name: countryName });
        }

        // Create the currency entry and associate it with the country
        const createdCurrency = await Currency.create({
            currencyCode,
            countryId: country.id, // Use the ID of the country
            conversionRate
        });

        res.json(createdCurrency);
    } catch (error) {
        console.error('Error occurred while adding currency:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
