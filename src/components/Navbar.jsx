import React from 'react';
import { Layers, Command, GitCommit } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isRecording }) {
  const tabs = [
    { id: 'studio', label: 'Voice Studio', icon: Layers },
    { id: 'macros', label: 'Voice Macros', icon: Command },
    { id: 'journey', label: 'Voice Activity', icon: GitCommit }
  ];

  return (
    <header className="navbar-container">
      {/* Brand logo & tagline */}
      <div className="navbar-brand-group">
        <div className="navbar-logo-wrap">
          <div className="navbar-logo-icon">
            <div className="wave-bar bar-1" />
            <div className="wave-bar bar-2" />
            <div className="wave-bar bar-3" />
            <div className="wave-bar bar-4" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 className="navbar-title gradient-text">
                WisprFlow Studio
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>v1.0</span>
            </div>
            <span className="navbar-subtitle">
              Voice-First AI Developer Workspace
            </span>
          </div>
        </div>

        {/* Live status badge */}
        <div className={`status-pill ${isRecording ? 'status-pill-recording' : 'status-pill-ready'}`}>
          <span className={`status-dot ${isRecording ? 'dot-recording' : 'dot-ready'}`} />
          <span className="status-text">
            {isRecording ? 'Listening...' : 'Voice Ready'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="navbar-nav">
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-tab-btn ${isActive ? 'nav-tab-active' : ''}`}
            >
              <TabIcon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Action: GitHub repo */}
      <div className="navbar-actions">
        <a
          href="https://github.com/Thanya113/WhisprFlowHH"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary nav-github-btn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="github-text">GitHub</span>
        </a>
      </div>
    </header>
  );
}
