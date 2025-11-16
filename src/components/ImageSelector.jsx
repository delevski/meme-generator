import { useRef } from 'react';
import './ImageSelector.css';

const ImageSelector = ({ onImageSelect, selectedImage }) => {
  const fileInputRef = useRef(null);

  // Popular meme templates (using placeholder URLs - in production, these would be actual meme images)
  const memeTemplates = [
    {
      id: 1,
      name: 'Drake Hotline',
      url: 'https://i.imgflip.com/30b1gx.jpg',
    },
    {
      id: 2,
      name: 'Distracted Boyfriend',
      url: 'https://i.imgflip.com/1ur9b0.jpg',
    },
    {
      id: 3,
      name: 'Two Buttons',
      url: 'https://i.imgflip.com/1g8my4.jpg',
    },
    {
      id: 4,
      name: 'Change My Mind',
      url: 'https://i.imgflip.com/24y43o.jpg',
    },
    {
      id: 5,
      name: 'One Does Not Simply',
      url: 'https://i.imgflip.com/1bij.jpg',
    },
    {
      id: 6,
      name: 'Expanding Brain',
      url: 'https://i.imgflip.com/1jwhww.jpg',
    },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelect(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (templateUrl) => {
    onImageSelect(templateUrl);
  };

  return (
    <div className="image-selector">
      <div className="sidebar-header">
        <h2>Templates</h2>
        <p className="sidebar-subtitle">Choose a meme template</p>
      </div>
      
      <div className="upload-section">
        <button 
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
          title="Upload your own image"
        >
          <span className="upload-icon">📤</span>
          <span className="upload-text">Upload Image</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className="templates-list">
        {memeTemplates.map((template) => (
          <div
            key={template.id}
            className={`template-item ${selectedImage === template.url ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template.url)}
            title={template.name}
          >
            <div className="template-image-wrapper">
              <img src={template.url} alt={template.name} />
            </div>
            <div className="template-info">
              <span className="template-name">{template.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;

