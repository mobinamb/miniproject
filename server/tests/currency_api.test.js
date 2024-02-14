/**
 * Necessary imports, make sure you have these packages installed in your server directory
 */
const supertest = require('supertest')
const sequelize = require('../database') // Provide a path to your config.js or database.js file, wherever you export that sequelize
const helper = require('./test_helper')
const server = require('../server') // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Setup currencies table (if not already setup)
  await helper.init()

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
    const response = await api.get('/api/currencies')
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
      .get(`/api/currencies/${getId}`)
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

    // Send a POST request with the new currency data
    const response = await api.post('/api/currencies')
      .send(newCurrency)
      .expect(201); // Check for successful creation

    // Assert that the new currency is in the database
    const currencies = await helper.currenciesInDb();
    expect(currencies.length).toBe(3); // Should have 3 currencies now
    expect(currencies).toContainEqual(newCurrency); // Check if the new currency is present
  });
});

describe('PUT tests', () => {
  test('updating a currency', async () => {
    const currencyToUpdate = await helper.currenciesInDb()[0]; // Get the first currency
    currencyToUpdate.conversionRate = 1.1; // Modify the conversion rate

    // Send a PUT request with the updated currency data
    const response = await api.put(`/api/currencies/${currencyToUpdate.id}`)
      .send(currencyToUpdate)
      .expect(200); // Check for successful update

    // Assert that the currency is updated in the database
    const updatedCurrency = await helper.currenciesInDb()[0]; // Get the first currency again
    expect(updatedCurrency.conversionRate).toBe(1.1); // Check if the conversion rate is updated
  });
});

describe('DELETE tests', () => {
  test('deleting a currency', async () => {
    const currencyToDelete = await helper.currenciesInDb()[0]; // Get the first currency

    // Send a DELETE request for the specified currency
    const response = await api.delete(`/api/currencies/${currencyToDelete.id}`)
      .expect(204); // Check for successful deletion (no content)

    // Assert that the currency is deleted from the database
    const currencies = await helper.currenciesInDb();
    expect(currencies.length).toBe(1); // Should have 1 currency remaining
    expect(currencies).not.toContainEqual(currencyToDelete); // Check if the deleted currency is absent
  });
});


afterAll(async () => {
  // Closes connection after all tests run
  server.close()
  await sequelize.close()
})

