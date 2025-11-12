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
      <h2>Choose Your Meme</h2>
      
      <div className="upload-section">
        <button 
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
        >
          📤 Upload Your Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className="divider">
        <span>OR</span>
      </div>

      <div className="templates-section">
        <h3>Popular Templates</h3>
        <div className="templates-grid">
          {memeTemplates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${selectedImage === template.url ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template.url)}
            >
              <img src={template.url} alt={template.name} />
              <p>{template.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;

