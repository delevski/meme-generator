import { useState, useRef, useCallback, useMemo } from 'react';
import './TemplateSidebar.css';

const TemplateSidebar = ({ onImageSelect, selectedImage, isCollapsed, onToggleCollapse }) => {
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Memoized meme templates to prevent recreation on every render
  const memeTemplates = useMemo(() => [
    { id: 1, name: 'Drake Hotline', url: 'https://i.imgflip.com/30b1gx.jpg' },
    { id: 2, name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
    { id: 3, name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
    { id: 4, name: 'Change My Mind', url: 'https://i.imgflip.com/24y43o.jpg' },
    { id: 5, name: 'One Does Not Simply', url: 'https://i.imgflip.com/1bij.jpg' },
    { id: 6, name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg' },
  ], []);

  // Memoized file upload handler
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    
    reader.onload = (event) => {
      onImageSelect(event.target.result);
      setIsUploading(false);
    };

    reader.onerror = () => {
      setUploadError('Failed to read image file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  }, [onImageSelect]);

  // Memoized template selection handler
  const handleTemplateSelect = useCallback((templateUrl) => {
    onImageSelect(templateUrl);
  }, [onImageSelect]);

  // Memoized upload button click handler
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              aria-label="Upload image file"
            />
            {uploadError && (
              <p className="upload-error" role="alert">{uploadError}</p>
            )}
          </div>

          <div className="templates-section">
            <h3>Popular Templates</h3>
            <div className="templates-list">
              {memeTemplates.map((template) => (
                <TemplateItem
                  key={template.id}
                  template={template}
                  isSelected={selectedImage === template.url}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

// Extracted TemplateItem as a separate component for better performance
const TemplateItem = ({ template, isSelected, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = useCallback(() => {
    onSelect(template.url);
  }, [template.url, onSelect]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div
      className={`template-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="template-thumbnail">
        {!imageLoaded && !imageError && (
          <div className="image-loading">Loading...</div>
        )}
        {imageError ? (
          <div className="image-error">Failed to load</div>
        ) : (
          <img 
            src={template.url} 
            alt={template.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}
        {isSelected && (
          <div className="selected-indicator" aria-label="Selected">✓</div>
        )}
      </div>
      <p className="template-name">{template.name}</p>
    </div>
  );
};

export default TemplateSidebar;

