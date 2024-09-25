import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyModal from './components/searchModal/searchmodal';
import UploadModal from './components/uploadModal/uploadModal';
import RandomMeme from './pages/random/RandomMeme';
import MemeTable from './pages/memeTable/memeTable';
import './dark-theme.css'; // Import the dark theme CSS

function App() {
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false); // State for upload modal
  const [selectedTags, setSelectedTags] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpload = () => setShowUpload(false); // Close upload modal
  const handleShowUpload = () => setShowUpload(true); // Show upload modal

  const handleSearch = (incomingTags, navigate) => {
    console.log('Selected Tags:', incomingTags);
    setSelectedTags(incomingTags); // Update selectedTags state
    handleClose(); // Close the modal
    navigate('/search'); // Navigate to the search route
  };


  const handleUpload = (formData) => {
    fetch(`${window.location.protocol}//${window.location.hostname}:8080`+'/files/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        handleCloseUpload();
      })
      .catch((error) => {
        console.error('Error:', error);
        handleCloseUpload();
      });
  };

  const handleHomeClick = () => {
    setSelectedTags([]); // Clear the selected tags
    setResetKey(prevKey => prevKey + 1); // Update the reset key to force re-mount
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleHomeClick}>List Memes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/random">Random</Nav.Link>
            </Nav>
            <Button variant="primary" onClick={handleShow} className="mr-2">
              Open Search Box
            </Button>

            <Button variant="secondary" onClick={handleShowUpload} className="mr-2">
              Upload File
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MyModal show={show} handleClose={handleClose} handleSearch={handleSearch} />
      <UploadModal show={showUpload} handleClose={handleCloseUpload} handleUpload={handleUpload} />

      {/* <CardTable selectedTags={selectedTags} /> */}

      <Routes>
        <Route path="/" element={<MemeTable key={resetKey} selectedTags={[]} />} />
        <Route path="/random" element={<RandomMeme />} />
        <Route path="/search" element={<MemeTable key={resetKey} selectedTags={selectedTags} />} />
      </Routes>
    </Router>
  );
}

export default App;