import { useState } from 'react';
import db from '../lib/instant';
import { id, tx } from '@instantdb/react';
import MemeCard from './MemeCard';
import { mockMemes, mockVotes } from '../lib/mockData';
import './MemeFeed.css';

const MemeFeed = () => {
  const { user } = db.useAuth();
  const [sortBy, setSortBy] = useState('popular');

  // Query memes and votes
  const { isLoading, error, data } = db.useQuery({
    memes: {},
    votes: {},
  });

  // Use mock data if no real data exists, or combine both
  const realMemes = data?.memes || [];
  const realVotes = data?.votes || [];
  
  // Combine real and mock data (mock data shows even if there's real data for demo purposes)
  const memes = [...mockMemes, ...realMemes];
  const votes = [...mockVotes, ...realVotes];

  if (isLoading && memes.length === 0) {
    return (
      <div className="feed-loading">
        <div className="spinner"></div>
        <p>Loading memes...</p>
      </div>
    );
  }

  if (error && memes.length === 0) {
    return (
      <div className="feed-error">
        <p>Error loading memes: {error.message}</p>
      </div>
    );
  }

  // Calculate vote counts for each meme
  const memesWithVotes = memes.map(meme => {
    const memeVotes = votes.filter(v => v.memeId === meme.id);
    const votesCount = memeVotes.reduce((sum, v) => sum + (v.value || 0), 0);
    return { ...meme, votesCount };
  });

  // Sort memes
  const sortedMemes = [...memesWithVotes].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.createdAt - a.createdAt;
    } else if (sortBy === 'popular') {
      return b.votesCount - a.votesCount;
    }
    return 0;
  });

  const handleVote = async (memeId, value) => {
    if (!user) return;

    // Find existing vote
    const existingVote = votes.find(v => v.memeId === memeId && v.userId === user.id);

    if (existingVote) {
      if (value === 0) {
        // Remove vote
        await db.transact([
          tx.votes[existingVote.id].delete(),
        ]);
      } else {
        // Update vote
        await db.transact([
          tx.votes[existingVote.id].update({ value }),
        ]);
      }
    } else if (value !== 0) {
      // Create new vote
      await db.transact([
        tx.votes[id()].update({
          memeId,
          userId: user.id,
          value,
          createdAt: Date.now(),
        }),
      ]);
    }
  };

  const getUserVote = (memeId) => {
    if (!user) return null;
    return votes.find(v => v.memeId === memeId && v.userId === user.id);
  };

  return (
    <div className="meme-feed">
      <div className="feed-header">
        <div className="feed-header-content">
          <div>
            <h2>Community Memes</h2>
            <p className="feed-subtitle">Discover and share the best memes</p>
          </div>
          <div className="feed-stats">
            <div className="stat-item">
              <span className="stat-number">{sortedMemes.length}</span>
              <span className="stat-label">Total Memes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{votes.length}</span>
              <span className="stat-label">Total Votes</span>
            </div>
          </div>
        </div>
        <div className="feed-controls">
          <label>Sort by</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {sortedMemes.length === 0 ? (
        <div className="empty-feed">
          <p>No memes yet! Be the first to post one!</p>
        </div>
      ) : (
        <div className="memes-grid">
          {sortedMemes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              userVote={getUserVote(meme.id)}
              onVote={handleVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemeFeed;

