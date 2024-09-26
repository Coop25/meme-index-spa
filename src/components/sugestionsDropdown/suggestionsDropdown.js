import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './suggestionsDropdown.css';

const SuggestionsDropdown = ({ inputValue, onSuggestionClick, selectedTags }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.trim() !== '') {
      // Fetch suggestions based on the input value
      fetch(`${window.location.protocol}//${window.location.hostname}:8080`+`/tags/autocomplete?query=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          // Filter out selected tags from the suggestions
          const filteredSuggestions = data.filter(suggestion => !selectedTags.includes(suggestion));
          setSuggestions(filteredSuggestions);
        })
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);
    }
  }, [inputValue, selectedTags]);

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