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
  
    // Allow custom delimiter syntax or numbers separated by commas/newlines
    const isValid = input.startsWith("//") || /^[-\d\s,\\n]+$/.test(input.trim());
  
    if (!isValid) {
      setError('Please check the input value. Only numbers separated by commas, newlines, or a valid custom delimiter are allowed.');
      setResult(null);
      return;
    }
  
    // Normalize \n to actual newline for processing
    const normalizedInput = input.replace(/\\n/g, '\n'); // Replace \n with actual newline
  
    fetch('http://localhost:5000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: normalizedInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== undefined) {
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
          placeholder="Enter numbers (e.g. 1,2,3 or //;\n1;2)"
          className="input_container"
        />
        <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
        <span className="tooltiptext">
          Use comma, newline or custom delimiter (e.g. //;\n1;2) to separate numbers.
        </span>
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}

export default CalculatorForm;
