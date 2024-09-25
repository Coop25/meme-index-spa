import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './suggestionsDropdown.css';

const SuggestionsDropdown = ({ inputValue, onSuggestionClick }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.trim() !== '') {
      // Fetch suggestions based on the input value
      fetch(`/tags/autocomplete?query=${inputValue}`)
        .then(response => response.json())
        .then(data => setSuggestions(data))
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <Dropdown show={suggestions.length > 0}>
      <Dropdown.Menu className="w-100">
        {suggestions.map((suggestion, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SuggestionsDropdown;