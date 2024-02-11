const convertCurrency = require('../utils/currency_utils') // Update this

/**
 * The tests below will be based on the following conversion amounts,
 * where $1 CDN (Canadian dollar) is equivalent to $0.75 USD (US dollar), 
 * and $0.58 GBP (British pounds). For ease of tests,
 * we have avoided putting any extraneous key-value pairs in the currency
 * objects, as we only need the conversion rate. 
 */

const cdnCurrency = {
  conversionRate: 1 
}

const usdCurrency = {
  conversionRate: 0.75
}

const gbpCurrency = {
  conversionRate: 0.58
}

/**
 * Tests follow the format of 
 * test('description', () => { ...your code here... })
 * Please read here: https://jestjs.io/docs/getting-started
 * for more information on using jest to perform testing
 */

/**
 * Test 1: Completed
 * This test performs a currency conversion, where it's really just the same currency
 * Therefore, we should return the same amount
 */
test('same currency conversion', () => {
  const result = convertCurrency(cdnCurrency, cdnCurrency, 100)
  expect(result).toBe(100)
})

/**
 * Test 2: TODO
 * Write a test that performs a currency conversion from CDN to GBP, for $100 CDN
 * Hint: the result should be $58 GBP according to our provided currencies.
 */
test('CDN to GBP conversion', () => {
  const result = convertCurrency(cdnCurrency, gbpCurrency, 100)
  expect(result).toBe(57.99999999999999)
})

/**
 * Test 3: TODO
 * Write a test that performs a currency conversion from CDN to USD, for $75 CDN
 */
test('CDN to USD conversion', () => {
  const result = convertCurrency(cdnCurrency, usdCurrency, 75)
  expect(result).toBe(56.25)
})

/**
 * Test 4: TODO
 * Write a test that performs a currency conversion from USD to GBP, for $200 USD
 */
test('USD to GBP conversion', () => {
  const result = convertCurrency(usdCurrency, gbpCurrency, 200)
  expect(result).toBe(154.66666666666666)
})

/**
 * Test 5: TODO
 * Write a test that performs a currency conversion from GBP to CDN, for $50 GBP
 */
test('CDN to USD conversion', () => {
  const result = convertCurrency(cdnCurrency, usdCurrency, 50)
  expect(result).toBe(37.5)
})