/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
/**
 * Import all the related component(s) here:
 * 
 * 
 */
import Conversion from '../components/Conversion';
import React from 'react';

/**
 * we will test the conversion section that contains: currency code & amount input fields, 
 *   Convert button and converted amount text. 
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */


test('Testing conversion section', () => {

    render(<Conversion />);

    // convertCurrency is a mock function now
    const convertCurrency = jest.fn();
    const user = userEvent.setup();

    userEvent.type(screen.getByLabelText('Initial Currency Code:'), 'USD');
    userEvent.type(screen.getByLabelText('Final Currency Code:'), 'CAD');
    userEvent.type(screen.getByLabelText('Amount:'), '100');

    userEvent.click(screen.getByText('Convert'));

    expect(screen.getByText(/Converted Amount:/i)).toBeInTheDocument();

});