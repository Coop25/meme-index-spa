import React, { useState, useRef } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SuggestionsDropdown from '../sugestionsDropdown/suggestionsDropdown';
import Tags from '../tags/tags';
import './searchmodal.css'; // Import the CSS file

function SearchModal({ show, handleClose, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRecommendationClick = (recommendation) => {
    setSelectedTags([...selectedTags, recommendation]);
    setSearchTerm('');
    inputRef.current.focus();
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSearchClick = () => {
    handleSearch(selectedTags, navigate); // Call the handleSearch function passed as a prop
    setSelectedTags([]); // Clear the selected tags
    setSearchTerm(''); // Clear the search term
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tag Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="search-container">
          <div className="selected-tags">
          <Tags tags={selectedTags} onTagRemove={handleTagRemove} />
          </div>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-3"
            ref={inputRef}
          />
          <SuggestionsDropdown
            inputValue={searchTerm}
            onSuggestionClick={handleRecommendationClick}
            selectedTags={selectedTags}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;