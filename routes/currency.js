const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');

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
   */
  router.get('/', (request, response) => {
    response.json(currencies)
  })
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */
  router.get('/:id', (request, response) => {
    const currencyId = parseInt(request.params.id);
    const currency = currencies.find((c) => c.id === currencyId);
  
    if (currency) {
      response.json(currency);
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  });
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  router.post('/', (request, response) => {
    const newCurrency = request.body;
  
    if (!newCurrency.currencyCode || !newCurrency.country || !newCurrency.conversionRate) {
      response.status(400).json({ error: 'Content missing' });
    } else {
      currencies.push(newCurrency);
      response.json(newCurrency);
    }
  });
  
  /**
   * TODO: PUT:id endpoint
   * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
   * with data object enclosed
   * Hint: updates the currency with the new conversion rate
   * @responds by returning the newly updated resource
   */
  router.put('/:id/:newRate', (request, response) => {
    const currencyId = parseInt(request.params.id);
    const newRate = parseFloat(request.params.newRate);
  
    const updatedCurrencies = currencies.map(currency => {
      if (currency.id === currencyId) {
        return { ...currency, conversionRate: newRate };
      }
      return currency;
    });
  
    currencies = updatedCurrencies;
  
    const currencyIndex = updatedCurrencies.findIndex(c => c.id === currencyId);

    if (currencyIndex !== -1) {
        response.json(updatedCurrencies.find(c => c.id === currencyId));
    } else {
        response.status(404).json({ error: 'Currency not found' });
    }
    });
  /**
   * TODO: DELETE:id Endpoint
   * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
   * @responds by returning a status code of 204
   */
  router.delete('/:id', (request, response) => {
    const currencyId = parseInt(request.params.id);
  
    const updatedCurrencies = currencies.filter(c => c.id !== currencyId);
  
    if (updatedCurrencies.length < currencies.length) {
      currencies = updatedCurrencies;
      response.status(204).send();
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  });

module.exports = router;
