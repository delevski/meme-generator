import { useState } from 'react';
import './ControlsPanel.css';

const ControlsPanel = ({ labels, setLabels, activeLabel, setActiveLabel }) => {
  const [selectedColor, setSelectedColor] = useState('#FFFF00');
  const [fontSize, setFontSize] = useState(32);

  const colors = [
    '#FFFF00', // Yellow
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FF6B35', // Coral
    '#FF0000', // Red
    '#DC143C', // Crimson
    '#8B0000', // Dark Red
    '#00FF00', // Green
    '#00FF88', // Spring Green
    '#000000', // Black
  ];

  const addNewLabel = () => {
    const newLabel = {
      id: Date.now(),
      text: '',
      x: 100,
      y: 100,
      width: 200,
      height: 60,
      color: selectedColor,
      fontSize: fontSize,
    };
    setLabels([...labels, newLabel]);
    setActiveLabel(newLabel.id);
  };

  const updateActiveLabel = (updates) => {
    if (!activeLabel) return;
    setLabels(labels.map(label => 
      label.id === activeLabel ? { ...label, ...updates } : label
    ));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (activeLabel) {
      updateActiveLabel({ color });
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    if (activeLabel) {
      updateActiveLabel({ fontSize: newSize });
    }
  };

  const activeLabeData = labels.find(l => l.id === activeLabel);

  return (
    <div className="controls-panel">
      <div className="sidebar-header">
        <h2>Controls</h2>
        <p className="sidebar-subtitle">Customize your meme</p>
      </div>

      <div className="control-section">
        <button className="add-label-btn" onClick={addNewLabel}>
          ➕ Add Label
        </button>
      </div>

      {activeLabel && activeLabeData && (
        <>
          <div className="control-section">
            <h3>Label Color</h3>
            <div className="color-picker">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-swatch ${activeLabeData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  title={color}
                />
              ))}
            </div>
            <input
              type="color"
              value={activeLabeData.color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="custom-color-input"
            />
          </div>

          <div className="control-section">
            <h3>Font Size: {activeLabeData.fontSize}px</h3>
            <input
              type="range"
              min="16"
              max="72"
              value={activeLabeData.fontSize}
              onChange={handleFontSizeChange}
              className="font-size-slider"
            />
          </div>
        </>
      )}

      {!activeLabel && (
        <div className="no-selection-message">
          <p>Click a label to edit its properties</p>
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;

