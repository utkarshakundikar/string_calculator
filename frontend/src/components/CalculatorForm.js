// export default CalculatorForm;

import React, { useState } from 'react';
import './CalculatorForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function CalculatorForm({ setResult, setError }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input) {
      setError('Please enter a valid string');
      setResult(null);
      return;
    }

    // Regular expression to validate comma-separated numbers (allowing negative numbers)
    const isValid = /^-?\d+(,\s*-?\d+)*$/.test(input.trim());
    
    if (!isValid) {
      setError('Please check the input value. Only comma-separated numbers are allowed.');
      setResult(null);
      return;
    }

    fetch('http://localhost:5000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setResult(data.result);
          setError('');
        } else {
          setError(data.error || 'Something went wrong!');
        }
      })
      .catch(() => {
        setError('Error connecting to the server.');
        setResult(null);
      });
  };

  return (
    <form className="calculator-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter a comma-separated list of numbers"
          className="input_container"
        />
        <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
        <span className="tooltiptext">
          Input must be a comma-separated list of numbers (e.g., 1,2,3)
        </span>
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}

export default CalculatorForm;

