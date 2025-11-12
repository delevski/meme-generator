import { useState, useRef, useEffect } from 'react';
import './DraggableLabel.css';

const DraggableLabel = ({ 
  id, 
  label, 
  onUpdate, 
  onDelete, 
  isActive, 
  onSelect 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);
  const labelRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartData = useRef({ width: 0, height: 0, x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    e.stopPropagation();
    onSelect(id);
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - label.x,
      y: e.clientY - label.y,
    };
  };

  const handleResizeStart = (e, corner) => {
    e.stopPropagation();
    onSelect(id);
    setIsResizing(true);
    setResizeCorner(corner);
    resizeStartData.current = {
      width: label.width,
      height: label.height,
      x: e.clientX,
      y: e.clientY,
      startX: label.x,
      startY: label.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;
        onUpdate(id, { ...label, x: newX, y: newY });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartData.current.x;
        const deltaY = e.clientY - resizeStartData.current.y;
        
        let newWidth = label.width;
        let newHeight = label.height;
        let newX = label.x;
        let newY = label.y;

        if (resizeCorner.includes('e')) {
          newWidth = Math.max(100, resizeStartData.current.width + deltaX);
        }
        if (resizeCorner.includes('s')) {
          newHeight = Math.max(50, resizeStartData.current.height + deltaY);
        }
        if (resizeCorner.includes('w')) {
          newWidth = Math.max(100, resizeStartData.current.width - deltaX);
          newX = resizeStartData.current.startX + deltaX;
        }
        if (resizeCorner.includes('n')) {
          newHeight = Math.max(50, resizeStartData.current.height - deltaY);
          newY = resizeStartData.current.startY + deltaY;
        }

        onUpdate(id, { ...label, width: newWidth, height: newHeight, x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeCorner(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, id, label, onUpdate, resizeCorner]);

  const handleTextChange = (e) => {
    onUpdate(id, { ...label, text: e.target.value });
  };

  return (
    <div
      ref={labelRef}
      className={`draggable-label ${isActive ? 'active' : ''}`}
      style={{
        left: `${label.x}px`,
        top: `${label.y}px`,
        width: `${label.width}px`,
        height: `${label.height}px`,
        color: label.color,
        fontSize: `${label.fontSize}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <input
        type="text"
        value={label.text}
        onChange={handleTextChange}
        placeholder="Enter text..."
        style={{ color: label.color, fontSize: `${label.fontSize}px` }}
        onClick={(e) => e.stopPropagation()}
      />
      
      {isActive && (
        <>
          <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className="resize-handle se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
          
          <button 
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default DraggableLabel;

