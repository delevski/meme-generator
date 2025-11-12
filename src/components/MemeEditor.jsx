import { useState, useRef } from 'react';
import DraggableLabel from './DraggableLabel';
import html2canvas from 'html2canvas';
import './MemeEditor.css';

const MemeEditor = ({ imageUrl, labels, setLabels, activeLabel, setActiveLabel }) => {
  const editorRef = useRef(null);

  const handleLabelUpdate = (id, updatedLabel) => {
    setLabels(labels.map(label => label.id === id ? updatedLabel : label));
  };

  const handleLabelDelete = (id) => {
    setLabels(labels.filter(label => label.id !== id));
    if (activeLabel === id) {
      setActiveLabel(null);
    }
  };

  const handleBackgroundClick = () => {
    setActiveLabel(null);
  };

  const handleDownload = async () => {
    if (!editorRef.current) return;

    // Temporarily hide resize handles and delete buttons for download
    const resizeHandles = editorRef.current.querySelectorAll('.resize-handle, .delete-btn');
    const activeBorders = editorRef.current.querySelectorAll('.draggable-label.active');
    
    resizeHandles.forEach(el => el.style.display = 'none');
    activeBorders.forEach(el => el.classList.remove('active'));

    try {
      const canvas = await html2canvas(editorRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `meme-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating meme:', error);
      alert('Failed to download meme. Please try again.');
    } finally {
      // Restore resize handles and delete buttons
      resizeHandles.forEach(el => el.style.display = '');
      if (activeLabel) {
        const activeElement = editorRef.current.querySelector(`[data-label-id="${activeLabel}"]`);
        if (activeElement) activeElement.classList.add('active');
      }
    }
  };

  if (!imageUrl) {
    return (
      <div className="meme-editor-placeholder">
        <p>👆 Select or upload an image to start creating your meme!</p>
      </div>
    );
  }

  return (
    <div className="meme-editor-container">
      <div 
        ref={editorRef}
        className="meme-editor" 
        onClick={handleBackgroundClick}
      >
        <img src={imageUrl} alt="Meme" draggable="false" />
        {labels.map((label) => (
          <DraggableLabel
            key={label.id}
            id={label.id}
            label={label}
            onUpdate={handleLabelUpdate}
            onDelete={handleLabelDelete}
            isActive={activeLabel === label.id}
            onSelect={setActiveLabel}
          />
        ))}
      </div>
      
      <button className="download-btn" onClick={handleDownload}>
        ⬇️ Download Meme
      </button>
    </div>
  );
};

export default MemeEditor;

