import React, { useState, useEffect } from 'react';
import DownloadButton from '../../components/downloadButton/downloadButton';
import './randomMeme.css';

const renderContent = (contentType, fileUrl) => {
  switch (true) {
    case contentType.includes('image'):
      return <img src={fileUrl} alt="content" className="content-image" />;
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

const RandomMeme = () => {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomMeme = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8080`+`/files/random`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMeme(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeme();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="random-meme-container">
      <button className="new-meme-button" onClick={fetchRandomMeme}>Get New Random Meme</button>
      {meme && (
        <div className="card">
          {renderContent(meme.contentType, meme.fileUrl)}
          <div className="tags">
            {meme.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
      {meme && <DownloadButton fileId={meme.id} />}
    </div>
  );
};

export default RandomMeme;