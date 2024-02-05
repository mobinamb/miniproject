import React from 'react';
import '../index.css';
import Login from './Login'; // Adjusted import path
import Conversion from './Conversion';
import AddCurrency from './AddCurrency';
import UpdateCurrency from './UpdateCurrency';
import DeleteCurrency from './DeleteCurrency';

function App() {
  return (
    <div className="App">
      <Login />
      <Conversion />
      <AddCurrency />
      <UpdateCurrency />
      <DeleteCurrency />
    </div>
  );
}

export default App;
