import { useState, useRef } from 'react';
import DraggableLabel from './DraggableLabel';
import html2canvas from 'html2canvas';
import db from '../lib/instant';
import './MemeEditor.css';

const MemeEditor = ({ imageUrl, labels, setLabels, activeLabel, setActiveLabel }) => {
  const editorRef = useRef(null);
  const { user } = db.useAuth();
  const [isPosting, setIsPosting] = useState(false);

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

  const captureMemeAsDataUrl = async () => {
    if (!editorRef.current) return null;

    // Temporarily hide resize handles and delete buttons
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

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error generating meme:', error);
      return null;
    } finally {
      // Restore resize handles and delete buttons
      resizeHandles.forEach(el => el.style.display = '');
      if (activeLabel) {
        const activeElement = editorRef.current.querySelector(`[data-label-id="${activeLabel}"]`);
        if (activeElement) activeElement.classList.add('active');
      }
    }
  };

  const handleDownload = async () => {
    const dataUrl = await captureMemeAsDataUrl();
    if (!dataUrl) {
      alert('Failed to download meme. Please try again.');
      return;
    }

    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handlePostToFeed = async () => {
    if (!user) {
      alert('Please sign in to post memes!');
      return;
    }

    if (labels.length === 0) {
      alert('Add some text labels to your meme first!');
      return;
    }

    setIsPosting(true);

    try {
      const dataUrl = await captureMemeAsDataUrl();
      if (!dataUrl) {
        throw new Error('Failed to capture meme');
      }

      // Post to InstantDB
      await db.transact([
        db.tx.memes[db.id()].update({
          imageUrl: dataUrl,
          userId: user.id,
          userEmail: user.email,
          labels: labels,
          createdAt: Date.now(),
          votesCount: 0,
        }),
      ]);

      alert('🎉 Meme posted successfully!');
    } catch (error) {
      console.error('Error posting meme:', error);
      alert('Failed to post meme. Please try again.');
    } finally {
      setIsPosting(false);
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
      
      <div className="meme-actions">
        {user && (
          <button 
            className="post-btn" 
            onClick={handlePostToFeed}
            disabled={isPosting}
          >
            {isPosting ? '⏳ Posting...' : '📤 Post to Feed'}
          </button>
        )}
        <button className="download-btn" onClick={handleDownload}>
          ⬇️ Download Meme
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;

