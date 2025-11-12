import { useState, useRef } from 'react';
import './TemplateSidebar.css';

const TemplateSidebar = ({ onImageSelect, selectedImage, isCollapsed, onToggleCollapse }) => {
  const fileInputRef = useRef(null);

  // Popular meme templates
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
    <aside className={`template-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>Templates</h2>
        <button 
          className="collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-content">
          <div className="upload-section">
            <button 
              className="upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div className="templates-section">
            <h3>Popular Templates</h3>
            <div className="templates-list">
              {memeTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`template-item ${selectedImage === template.url ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(template.url)}
                >
                  <div className="template-thumbnail">
                    <img src={template.url} alt={template.name} />
                    {selectedImage === template.url && (
                      <div className="selected-indicator">✓</div>
                    )}
                  </div>
                  <p className="template-name">{template.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default TemplateSidebar;

