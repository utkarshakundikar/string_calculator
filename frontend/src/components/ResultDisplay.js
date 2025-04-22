import React from 'react';
import './ResultDisplay.css';  // Importing ResultDisplay.css

function ResultDisplay({ result, error }) {
  return (
    <div className="result-container">
      {error && <div className="error">{error}</div>}
      {result && <div className="result">Result: {result}</div>}
    </div>
  );
}

export default ResultDisplay;
