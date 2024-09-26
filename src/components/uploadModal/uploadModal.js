import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SuggestionsDropdown from '../sugestionsDropdown/suggestionsDropdown';
import Tags from '../tags/tags';

const UploadModal = ({ show, handleClose, handleUpload }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  
  useEffect(() => {
    if (!show) {
      // Reset state when modal is closed
      setFile(null);
      setPreviewUrl(null);
      setTags([]);
      setTagInput('');
    }
  }, [show]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', tags.join(','));

    handleUpload(formData);
    handleClose();
  };

  const handleSuggestionClick = (suggestion) => {
    setTags([...tags, suggestion]);
    setTagInput('');
  };

  const renderPreview = () => {
    if (!file) return null;

    const fileType = file.type.split('/')[0];

    switch (fileType) {
      case 'image':
        return <img src={previewUrl} alt="Preview" style={{ width: '100%', height: 'auto', maxHeight: '300px' }} />;
      case 'video':
        return <video src={previewUrl} controls style={{ width: '100%', maxHeight: '300px' }} />;
      case 'audio':
        return <audio src={previewUrl} controls style={{ width: '100%' }} />;
      default:
        return <p>No preview available for this file type.</p>;
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderPreview()}
        <Form>
          <Form.Group controlId="formFile">
            <Form.Label>Choose file to upload</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group controlId="formTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd();
                  }
              }}
              autoComplete="off" // Disable browser autocomplete
            />
            <SuggestionsDropdown
              inputValue={tagInput}
              onSuggestionClick={handleSuggestionClick}
              selectedTags={tags}
            />
            <div className="mt-3">
              <Tags tags={tags} onTagRemove={handleTagRemove} />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;