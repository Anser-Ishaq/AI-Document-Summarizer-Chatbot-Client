import React, { useRef } from 'react';

const FileUpload = ({ handleFileUpload, loading }) => {
    const fileInputRef = useRef(null);

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div id="drop-area" onClick={triggerFileSelect} style={{ cursor: 'pointer' }}>
            <div className="drop-icon">
                <i className="fa-light fa-file-upload"></i>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="hiddenFileInput"
            />

            <div className="drop-text">Click to upload a file</div>

            {loading && <p>Uploading...</p>}
        </div>
    );
};

export default FileUpload;
