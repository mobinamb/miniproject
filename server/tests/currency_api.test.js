/**
 * Necessary imports, make sure you have these packages installed in your server directory
 */
const supertest = require('supertest')
const {sequelize, initConnection} = require('../database') // Provide a path to your config.js or database.js file, wherever you export that sequelize
const helper = require('./test_helper')
const server = require('../server') // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Setup currencies table (if not already setup)
  await helper.init() // Pass the instance to init

  // Clear data and load new entries for tests
  await helper.clearData()
  await helper.load()
})

describe('GET tests', () => {
  /**
   * Completed:
   * This is an example test, where we are checking if we have 2 blogs in the database as expected
   * we added the two blogs in the 'beforeEach' setup phase
   */
  test('we have 2 currencies at the start', async () => {
    const response = await api.get('/api/currency')
    expect(response.body).toHaveLength(2)
  })

  /**
   * Completed:
   * This is another example test, where we are checking if we are able to get a particular currency as expected.
   * Our test will get the first currency, the Canadian one that we added.
   * You can confirm the identiy of the currency based on the conversionRate and the currencyCode
   * We are restricting it to these two, rather than a complete equals, since the table provides other extraneous values
   * such as time of last update and so on
   */
  test('getting a specific currency', async () => {
    const canadianCurrency = helper.initialCurrencies[0]
    const getId = canadianCurrency.id

    // Verify that we get the same currency
    const response = await api
      .get(`/api/currency/${getId}`)
      .expect(200)

    // As stated above, we will compare the conversionRate and currencyCode
    const currencyReceived = response.body
    expect(canadianCurrency.conversionRate).toEqual(currencyReceived.conversionRate)
    expect(canadianCurrency.currencyCode).toEqual(currencyReceived.currencyCode)
  })
})

/**
 * The tests for POST, PUT, and DELETE are left un-implemented, and you will have to complete them
 * All the helper functions have been provided, and the examples as well are sufficient
 * You will need to do some reading on supertest documentation as well
 * 
 * IMPORTANT: You are only working with currencies, we removed the countries connection to make it a bit simpler
 */
describe('POST tests', () => {
  test('adding a currency', async () => {
    const newCurrency = {
      currencyCode: 'EUR',
      conversionRate: 0.85
    };

    const response = await api.post('/api/currency')
      .send(newCurrency)
      //.expect(201);

    const createdCurrency = response.body;

    // Verify that the currency was added to the database
    const currenciesInDb = await helper.currenciesInDb();
    expect(currenciesInDb).toHaveLength(3); // Expect 3 currencies now
    const currenciesAfterPost=currenciesInDb.find(currency => currency.id === createdCurrency.id);
   
    expect(currenciesAfterPost.currencyCode).toEqual(createdCurrency.currencyCode);
    expect(currenciesAfterPost.conversionRate).toEqual(createdCurrency.conversionRate);
    //expect(currenciesAfterPost).toEqual(createdCurrency);

  });
});


describe('PUT tests', () => {
  test('updating a currency', async () => {
    const initialCurrencies = await helper.currenciesInDb();
    const currencyToUpdate = initialCurrencies[0];
    const newConversionRate = 1.10;

    const response = await api.put(`/api/currency/${currencyToUpdate.currencyCode}`)
      .send({ newConversionRate })
      .expect(200);

    const updatedCurrency = response.body;

    // Verify that the currency was updated in the database
    const currenciesAfterPut = await helper.currenciesInDb();
    expect(currenciesAfterPut).toHaveLength(2); // Expect the same number of currencies
    const updatedCurrencyInDb = currenciesAfterPut.find(currency => currency.id === updatedCurrency.id);

    // Compare only specific properties using toEqual with a partial object
    expect(updatedCurrencyInDb.id).toEqual(updatedCurrency.id);
    expect(updatedCurrencyInDb.currencyCode).toEqual(updatedCurrency.currencyCode);
    expect(updatedCurrencyInDb.conversionRate).toEqual(updatedCurrency.conversionRate);
  });
});


describe('DELETE tests', () => {
  test('deleting a currency', async () => {
    const codeToDelete = 'USD';
    const initialCurrencies = await helper.currenciesInDb();
    const initialCount = initialCurrencies.length;

    // Send a DELETE request to remove the currency
    await api.delete(`/api/currency/${codeToDelete}`)
      .expect(204); // Check for successful deletion

    // Assert that the currency has been deleted
    const currenciesAfterDelete = await helper.currenciesInDb();
    expect(currenciesAfterDelete.length).toBe(initialCount - 1);
    expect(currenciesAfterDelete.find(currency => currency.currencyCode === codeToDelete)).toBeUndefined();
  });
});


afterAll(async () => {
  // Closes connection after all tests run
  server.close()
  await sequelize.close()
})

