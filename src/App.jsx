import { useState } from 'react';
import ImageSelector from './components/ImageSelector';
import MemeEditor from './components/MemeEditor';
import ControlsPanel from './components/ControlsPanel';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [labels, setLabels] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    // Reset labels when a new image is selected
    setLabels([]);
    setActiveLabel(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 Meme Generator</h1>
        <p>Create epic memes in seconds!</p>
      </header>

      <main className="app-main">
        {!selectedImage ? (
          <ImageSelector 
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
          />
        ) : (
          <div className="editor-layout">
            <div className="editor-left">
              <button 
                className="change-image-btn"
                onClick={() => setSelectedImage(null)}
              >
                ← Change Image
              </button>
              <MemeEditor 
                imageUrl={selectedImage}
                labels={labels}
                setLabels={setLabels}
                activeLabel={activeLabel}
                setActiveLabel={setActiveLabel}
              />
            </div>
            
            <div className="editor-right">
              <ControlsPanel 
                labels={labels}
                setLabels={setLabels}
                activeLabel={activeLabel}
                setActiveLabel={setActiveLabel}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Made with 🔥 for meme lovers everywhere</p>
      </footer>
    </div>
  );
}

export default App;

