import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DownloadButton from '../downloadButton/downloadButton';
import SuggestionsDropdown from '../sugestionsDropdown/suggestionsDropdown';
import Tags from '../tags/tags';
import './editModal.css'; // Import the CSS file

const EditModal = ({ show, handleClose, item, handleSave }) => {
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (item) {
            setDescription(item.description || '');
            setTags(item.tags || []);
        }
    }, [item]);

    useEffect(() => {
        if (!show) {
            setDescription('');
            setTags([]);
            setTagInput('');
        }
    }, [show, item]);

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

    const handleSaveChanges = async () => {
        const updatedItem = { ...item, description, tags };

        try {
            const response = await fetch(`/files/${item.id}/tags`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tags }),
            });

            if (!response.ok) {
                throw new Error('Failed to update tags');
            }

            // Call the handleSave function passed as a prop
            handleSave(updatedItem);
            handleClose();
        } catch (error) {
            console.error('Error updating tags:', error);
            // Optionally, handle the error (e.g., show a notification to the user)
        }
    };

    

    const handleSuggestionClick = (suggestion) => {
        if (!tags.includes(suggestion)) {
            setTags([...tags, suggestion]);
            setTagInput('');
        }
    };

    const renderContent = (contentType, fileUrl) => {
        switch (true) {
            case contentType.includes('image'):
                return <img src={fileUrl} alt="Content" style={{ width: '100%', height: 'auto', maxHeight: '600px' }} />;
            case contentType.includes('video'):
                return <video controls style={{ width: '100%', maxHeight: '600px' }}>
                    <source src={fileUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>;
            case contentType.includes('audio'):
                return <audio controls style={{ width: '100%' }}>
                    <source src={fileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>;
            default:
                return <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download</a>;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="edit-modal" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex">
                    <div className="flex-grow-1 content-section">
                        {item && renderContent(item.contentType, item.fileUrl)}
                    </div>
                    <div className="ml-3 text-section">
                        <Form>
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
                                />
                                <SuggestionsDropdown
                                    inputValue={tagInput}
                                    onSuggestionClick={handleSuggestionClick}
                                />
                                <Tags tags={tags} onTagRemove={handleTagRemove} />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {item && <DownloadButton fileId={item.id} />}
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;