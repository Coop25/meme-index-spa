import React, { useState } from 'react';
import './cardtable.css'; // Import the CSS file
import EditModal from '../editModal/editModal';

const renderContent = (contentType, fileUrl) => {
  switch (true) {
    case contentType.includes('image'):
      return <img src={fileUrl} alt="Content" className="content-image" />;
    case contentType.includes('video'):
      return <video controls className="content-video">
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>;
    case contentType.includes('audio'):
      return <audio controls className="content-audio">
        <source src={fileUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>;
    default:
      return <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download</a>;
  }
};

const CardTable = ({ items }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleSave = (updatedItem) => {
    // Handle save logic here (e.g., update the item in the state or send a request to the server)
    console.log('Updated Item:', updatedItem);
  };

  return (
    <div className="card-table-container">
      <div className="card-table">
        {items.map((item, index) => (
          <div key={item.id || index} className="card" onClick={() => handleCardClick(item)}>
            {renderContent(item.contentType, item.fileUrl)}
            <div className="tags">
              {item.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <EditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          item={selectedItem}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default CardTable;