import { useState } from 'react';
import db from './lib/instant';
import Auth from './components/Auth';
import ImageSelector from './components/ImageSelector';
import MemeEditor from './components/MemeEditor';
import ControlsPanel from './components/ControlsPanel';
import MemeFeed from './components/MemeFeed';
import './App.css';

function App() {
  const { user } = db.useAuth();
  const [currentView, setCurrentView] = useState('feed'); // 'feed' or 'create'
  const [selectedImage, setSelectedImage] = useState(null);
  const [labels, setLabels] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    // Reset labels when a new image is selected
    setLabels([]);
    setActiveLabel(null);
  };

  const switchToCreate = () => {
    setCurrentView('create');
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🎭 Meme Generator</h1>
            <p>Create and share epic memes!</p>
          </div>
          <div className="header-right">
            <Auth />
          </div>
        </div>
        
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentView === 'feed' ? 'active' : ''}`}
            onClick={() => setCurrentView('feed')}
          >
            📱 Feed
          </button>
          <button 
            className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
            onClick={switchToCreate}
          >
            ✨ Create Meme
          </button>
        </nav>
      </header>

      <main className="app-main">
        {!user && currentView === 'create' ? (
          <div className="auth-required">
            <h2>🔒 Sign in to create memes</h2>
            <p>Please sign in above to start creating and posting memes</p>
          </div>
        ) : currentView === 'feed' ? (
          <MemeFeed />
        ) : !selectedImage ? (
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
        <p>Made with ❤️ for meme lovers everywhere</p>
      </footer>
    </div>
  );
}

export default App;

