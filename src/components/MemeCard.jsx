import { useState } from 'react';
import db from '../lib/instant';
import './MemeCard.css';

const MemeCard = ({ meme, userVote, onVote }) => {
  const { user } = db.useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleVote = async (value) => {
    if (!user) {
      alert('Please sign in to vote!');
      return;
    }

    await onVote(meme.id, value);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this meme?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await db.transact([
        db.tx.memes[meme.id].delete(),
      ]);
    } catch (error) {
      console.error('Error deleting meme:', error);
      alert('Failed to delete meme');
      setIsDeleting(false);
    }
  };

  const voteCount = meme.votesCount || 0;
  const userVoteValue = userVote?.value || 0;
  const isOwner = user && meme.userId === user.id;

  return (
    <div className="meme-card">
      <div className="meme-image-container">
        <img src={meme.imageUrl} alt="Meme" />
        {isOwner && (
          <button 
            className="delete-meme-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '...' : '🗑️'}
          </button>
        )}
      </div>
      
      <div className="meme-info">
        <div className="meme-creator">
          <span className="creator-avatar">
            {meme.userEmail?.[0]?.toUpperCase() || '👤'}
          </span>
          <span className="creator-name">{meme.userEmail || 'Anonymous'}</span>
        </div>
        
        <div className="meme-voting">
          <button 
            className={`vote-btn upvote ${userVoteValue === 1 ? 'active' : ''}`}
            onClick={() => handleVote(userVoteValue === 1 ? 0 : 1)}
            disabled={!user}
            title="Upvote"
          >
            ▲
          </button>
          <span className={`vote-count ${voteCount > 0 ? 'positive' : voteCount < 0 ? 'negative' : ''}`}>
            {voteCount}
          </span>
          <button 
            className={`vote-btn downvote ${userVoteValue === -1 ? 'active' : ''}`}
            onClick={() => handleVote(userVoteValue === -1 ? 0 : -1)}
            disabled={!user}
            title="Downvote"
          >
            ▼
          </button>
        </div>
      </div>
      
      <div className="meme-date">
        {new Date(meme.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
};

export default MemeCard;

