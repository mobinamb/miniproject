const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

//GET
router.get('/', async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        console.log("Error happened while getting all countries from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//GET_id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const foundCountry = await Country.findByPk(id); // Updated variable name to 'foundCurrency'
        if (foundCountry) {
            res.json(foundCountry);
        } else {
            res.status(404).json({ error: 'Country not found' });
        }
    } catch (error) {
        console.log("Error happened while getting ids from countrues from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });



//POST
router.post('/', async (req, res) => {
    const newCountry = req.body;
    try {
        const createdCountry = await Country.create(newCountry);
        res.json(createdCountry);
    } catch (error) {
        console.log("Error happened while posting all countries from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update country by ID
router.put('/:id/:newName', async (req, res) => {
    const id = parseInt(req.params.id);
    const newName = req.params.newName;

    try {
        // Find the country by ID
        const country = await Country.findByPk(id);
        
        if (country) {
            // Update the country with new data
            country.name = newName; // Update conversion rate
            await country.save(); // Save changes to the database
            
            // Send the updated country as response
            res.json(country);
        } else {
            res.status(404).json({ error: 'Country not found' });
        }
    } catch (error) {
        console.log("Error happened while putting all countries from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//DELETE_ID
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const country = await Country.findByPk(id);
        if (country) {
            await country.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Country not found' });
        }
    } catch (error) {
        console.log("Error happened while deleting all countries from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
