const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const Currency = require('../models/Currency'); 
const Country = require('../models/Country'); 

/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
    {
      id: 1,
      currencyCode: "CDN",
      country: "Canada",
      conversionRate: 1
    },
    {
      id: 2,
      currencyCode: "USD",
      country: "United States of America",
      conversionRate: 0.75
    }
  ]
  
  /**
   * TESTING Endpoint (Completed)
   * @receives a get request to the URL: http://localhost:3001/
   * @responds with the string 'Hello World!'
   */
  
  /**
   * TODO: GET Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/
   * @responds with returning the data as a JSON
   */// GET all currencies
  router.get('/', async (req, res) => {
    try {
        const currencies = await Currency.findAll(); // Updated variable name to 'Currency'
        res.json(currencies);
    } catch (error) {
        console.log("Error happened while getting all currencies from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */
  router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const foundCurrency = await Currency.findByPk(id); // Updated variable name to 'foundCurrency'
        if (foundCurrency) {
            res.json(foundCurrency);
        } else {
            res.status(404).json({ error: 'Currency not found' });
        }
    } catch (error) {
        console.log("Error happened while getting ids from currencies from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  router.post('/', async (req, res) => {
    const newCurrency = req.body;
    try {
        const createdCurrency = await Currency.create(newCurrency); // Updated variable name to 'Currency'
        res.json(createdCurrency);
    } catch (error) {
        console.log("Error happened while posting currencies from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * TODO: PUT:id endpoint
   * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
   * with data object enclosed
   * Hint: updates the currency with the new conversion rate
   * @responds by returning the newly updated resource
   */
  router.put('/:id/:newRate', async (req, res) => {
    const id = parseInt(req.params.id);
    const newRate = req.params.newRate;
    try {
        const foundCurrency = await Currency.findByPk(id); // Updated variable name to 'foundCurrency'
        if (foundCurrency) {
            foundCurrency.conversionRate = newRate; // Update conversion rate
            await foundCurrency.save(); // Save changes to the database
            res.json(foundCurrency);
        } else {
            res.status(404).json({ error: 'Currency not found' });
        }
    } catch (error) {
        console.log("Error happened while putting currencies from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  /**
   * TODO: DELETE:id Endpoint
   * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
   * @responds by returning a status code of 204
   */
  router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const foundCurrency = await Currency.findByPk(id); // Updated variable name to 'foundCurrency'
        if (foundCurrency) {
            await foundCurrency.destroy(); // Updated variable name to 'foundCurrency'
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Currency not found' });
        }
    } catch (error) {
        console.log("Error happened while deleting all currencies from DB!")
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
