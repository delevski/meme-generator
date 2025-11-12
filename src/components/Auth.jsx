import { useState } from 'react';
import db from '../lib/instant';
import './Auth.css';

const Auth = () => {
  const { isLoading, user, error } = db.useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sentEmail, setSentEmail] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) return;
    
    db.auth.sendMagicCode({ email })
      .then(() => {
        setSentEmail(true);
        alert('Check your email for a 6-digit confirmation code!');
      })
      .catch((err) => {
        alert('Error sending code: ' + err.body?.message);
      });
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!email || !code) return;

    db.auth.signInWithMagicCode({ email, code })
      .catch((err) => {
        alert('Invalid code. Please try again.');
        console.error(err);
      });
  };

  const handleSignOut = () => {
    db.auth.signOut();
    setSentEmail(false);
    setEmail('');
    setCode('');
  };

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="auth-user-info">
        <div className="user-avatar">
          {user.email?.[0]?.toUpperCase() || '👤'}
        </div>
        <div className="user-details">
          <span className="user-email">{user.email}</span>
          <button className="logout-btn" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔐 {sentEmail ? 'Enter Code' : 'Sign In'}</h2>
        <p className="auth-subtitle">
          {sentEmail 
            ? 'Enter the 6-digit code sent to your email'
            : 'Enter your email to receive a login code'}
        </p>

        {!sentEmail ? (
          <form onSubmit={handleSendCode} className="auth-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            <button type="submit" className="auth-button">
              Send Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="auth-form">
            <input
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="auth-input code-input"
              maxLength="6"
              pattern="[0-9]{6}"
              required
            />
            <button type="submit" className="auth-button">
              Verify Code
            </button>
            <button 
              type="button" 
              className="auth-button-secondary"
              onClick={() => {
                setSentEmail(false);
                setCode('');
              }}
            >
              ← Change Email
            </button>
          </form>
        )}

        {error && (
          <div className="auth-error">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

