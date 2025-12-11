import { useState, useEffect } from 'react';
import db from './lib/instant';
import Auth from './components/Auth';
import TemplateSidebar from './components/TemplateSidebar';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Start collapsed on mobile, expanded on desktop
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      // On desktop, ensure sidebar is visible; on mobile, keep current state
      if (window.innerWidth > 768 && sidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    // Reset labels when a new image is selected
    setLabels([]);
    setActiveLabel(null);
    // Auto-collapse sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarCollapsed(true);
    }
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
            <h1>MemeCraft Pro</h1>
            <p>Professional Meme Creation Platform</p>
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
            Community Feed
          </button>
          <button 
            className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
            onClick={switchToCreate}
          >
            Create New
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
        ) : (
          <div className="create-layout">
            {!sidebarCollapsed && (
              <div 
                className="sidebar-overlay"
                onClick={() => setSidebarCollapsed(true)}
              />
            )}
            <TemplateSidebar 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            
            <div className="main-content-area">
              {!selectedImage ? (
                <div className="no-image-selected">
                  <div className="no-image-content">
                    <h2>Select a Template</h2>
                    <p>Choose a template from the sidebar or upload your own image to get started</p>
                    <button 
                      className="open-sidebar-btn"
                      onClick={() => setSidebarCollapsed(false)}
                    >
                      Browse Templates
                    </button>
                  </div>
                </div>
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
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>MemeCraft Pro - Empowering Creative Expression Through Technology</p>
      </footer>
    </div>
  );
}

export default App;

