// utils/fileTypes.js

// Map file extensions to MIME types
export const FILE_TYPE_MAPPING = {
    pdf: 'application/pdf',
    txt: 'text/plain',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg'
  };
  
  // Function to check if a file is allowed
  export const isFileAllowed = (file, allowedTypes) => {
    // Get file extension
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // Check if extension exists in allowed types
    if (allowedTypes.includes(fileExt)) {
      return true;
    }
  
    // Check MIME type as fallback
    const mimeType = file.type;
    return allowedTypes.some(type => 
      FILE_TYPE_MAPPING[type] === mimeType
    );
  };
  
  // Function to get human-readable file types
  export const getReadableFileTypes = (allowedTypes) => {
    const typeNames = {
      pdf: 'PDF',
      txt: 'Text',
      docx: 'Word',
      png: 'PNG',
      jpg: 'JPG',
      jpeg: 'JPG'
    };
    
    return allowedTypes.map(type => typeNames[type] || type.toUpperCase());
  };