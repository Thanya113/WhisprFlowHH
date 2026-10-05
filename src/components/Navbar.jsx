import { Sparkles, Video, Radio, Layers, Command, GitCommit, ExternalLink, ShieldCheck, Code2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenVideoModal, isRecording }) {
  const tabs = [
    { id: 'studio', label: 'Voice Studio', icon: Layers },
    { id: 'macros', label: 'Voice Macros', icon: Command },
    { id: 'journey', label: 'Dev Journey', icon: GitCommit }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(7, 9, 14, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '14px'
    }}>
      {/* Brand logo & tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f2fe, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '3px', height: '14px', background: '#07090e', borderRadius: '2px', animation: 'wave-bounce 1.2s infinite ease-in-out' }} />
              <div style={{ width: '3px', height: '22px', background: '#07090e', borderRadius: '2px', animation: 'wave-bounce 0.8s infinite ease-in-out' }} />
              <div style={{ width: '3px', height: '28px', background: '#07090e', borderRadius: '2px', animation: 'wave-bounce 1s infinite ease-in-out' }} />
              <div style={{ width: '3px', height: '16px', background: '#07090e', borderRadius: '2px', animation: 'wave-bounce 0.9s infinite ease-in-out' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }} className="gradient-text">
                WisprFlow Studio
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>v1.0</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Voice-Driven AI Developer Cockpit
            </span>
          </div>
        </div>

        {/* Live status badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: isRecording ? 'rgba(255, 42, 109, 0.12)' : 'rgba(5, 255, 161, 0.1)',
          padding: '4px 10px',
          borderRadius: '999px',
          border: isRecording ? '1px solid rgba(255, 42, 109, 0.3)' : '1px solid rgba(5, 255, 161, 0.25)'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: isRecording ? '#ff2a6d' : '#05ffa1',
            boxShadow: isRecording ? '0 0 8px #ff2a6d' : '0 0 8px #05ffa1'
          }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isRecording ? '#ff2a6d' : '#05ffa1' }}>
            {isRecording ? 'Wispr Flow Dictating' : 'Voice Engine Ready'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isActive ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'transparent',
                color: isActive ? '#07090e' : '#94a3b8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <TabIcon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Referral confirmation badge */}
        <a
          href="https://ref.wisprflow.ai/hhg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '5px 10px',
            borderRadius: '8px',
            color: '#c084fc',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
          title="Account registered via official referral link: https://ref.wisprflow.ai/hhg"
        >
          <ShieldCheck size={14} color="#c084fc" />
          <span>Referral: <strong>hhg</strong></span>
        </a>

        {/* Video teleprompter modal button */}
        <button
          onClick={onOpenVideoModal}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 42, 109, 0.12)', borderColor: 'rgba(255, 42, 109, 0.3)', color: '#ff2a6d' }}
        >
          <Video size={14} />
          <span>Demo Video Script</span>
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com/Thanya113/WhisprFlowHH"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.8rem', textDecoration: 'none' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
