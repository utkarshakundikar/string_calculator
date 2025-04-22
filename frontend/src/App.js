import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import './App.css';  // Importing App.css

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  return (
    <div className="App">
      <div className="container">
      <h1 className="rainbow-text">String Calculator</h1>
        <CalculatorForm setResult={setResult} setError={setError} />
        <ResultDisplay result={result} error={error} />
      </div>
    </div>
  );
}

export default App;
