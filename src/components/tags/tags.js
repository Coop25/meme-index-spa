import React from 'react';
import { Button } from 'react-bootstrap';
import './tags.css';

const Tags = ({ tags, onTagRemove }) => {
  return (
    <div className="selected-tags">
      {tags.map((tag, index) => (
        <Button
          key={index}
          variant="outline-dark"
          onClick={() => onTagRemove(tag)}
          className="unselectable"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

export default Tags;