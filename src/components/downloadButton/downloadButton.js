import React, { useState, useEffect } from 'react';

const DownloadButton = ({ fileId }) => {
    const [signedUrl, setSignedUrl] = useState('');

    useEffect(() => {
        // Fetch the signed URL when the component mounts
        fetch('http://localhost:8080' + `/files/${fileId}/signed-url`)
            .then(response => response.json())
            .then(data => {
                if (data && data.signedUrl) {
                    setSignedUrl(data.signedUrl);
                }
            })
            .catch(error => console.error('Error fetching signed URL:', error));
    }, [fileId]);

    return (
        <a className="btn btn-success" role="button" href={signedUrl} download>
            Download
        </a>
    );
};

export default DownloadButton;