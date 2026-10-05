import React, { useState, useEffect } from 'react';
import { Video, X, ExternalLink, Copy, Check, Clock, Play, Pause, RotateCcw, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VideoSubmissionModal({ onClose }) {
  const [copiedRepo, setCopiedRepo] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyRepoLink = () => {
    navigator.clipboard?.writeText('https://github.com/Thanya113/WhisprFlowHH').then(() => {
      setCopiedRepo(true);
      setTimeout(() => setCopiedRepo(false), 2000);
    });
  };

  const scriptPhases = [
    {
      time: '0:00 - 0:25',
      title: 'Intro & Wispr Flow Setup',
      script: 'Hi! In this video I am demonstrating how I built WhisprFlow Studio entirely using voice-driven development with Wispr Flow. Notice my Wispr Flow desktop dictation tool is active, registered through the official referral link.',
      cue: 'Show screen with Wispr Flow active and WisprFlow Studio open.'
    },
    {
      time: '0:25 - 0:55',
      title: 'Live Voice Dictation & Real-time NLP Cleaning',
      script: 'Now I will hold down the dictation hotkey and speak: "Um, hey Wispr Flow, like build me a dark cyberpunk pricing section with monthly and annual toggle, glowing neon cyan accents, and interactive feature badges." Notice how Wispr Flow removes all the hesitation words and outputs a structured prompt.',
      cue: 'Speak into microphone and show the raw vs cleaned prompt comparison.'
    },
    {
      time: '0:55 - 1:30',
      title: 'Interactive Component Sandbox & Live Execution',
      script: 'Clicking Execute Voice Flow generates and mounts the component immediately. In the sandbox, everything is interactive: the billing switch toggles, the tiers highlight, and clicking the action triggers a celebratory confetti burst. We can also inspect the generated JSX code in the Code Inspector.',
      cue: 'Toggle the monthly/annual switch in the sandbox, trigger confetti, and show the Code Inspector tab.'
    },
    {
      time: '1:30 - 1:55',
      title: 'Voice Macros & Dev Journey Audit Log',
      script: 'Next, I can trigger predefined voice macros like "Flow: Add Confetti" or "Flow: Dark Neonify". In the Dev Journey tab, you can inspect the complete chronological record of every voice prompt used to scaffold and build this entire repository.',
      cue: 'Click Voice Macros tab and then Dev Journey tab.'
    },
    {
      time: '1:55 - 2:05',
      title: 'Submission & GitHub Repository Push',
      script: 'All code has been committed with clean progressive commits and pushed to github.com/Thanya113/WhisprFlowHH, ready for shortlisting review. Thank you!',
      cue: 'Show GitHub repo tab or git terminal output.'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '780px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0d111a',
        border: '1px solid rgba(0, 242, 254, 0.3)',
        borderRadius: '18px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(0, 242, 254, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(16, 21, 34, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255, 42, 109, 0.15)', color: '#ff2a6d' }}>
              <Video size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Demo Video Teleprompter & Submission Script</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Follow this 2-minute script to demonstrate your voice development process
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Stopwatch & Action Bar */}
        <div style={{
          padding: '12px 24px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Rehearsal timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#00f2fe" />
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Rehearsal Timer:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: timerSeconds > 120 ? '#ff2a6d' : '#00f2fe' }}>
                {formatTimer(timerSeconds)}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>/ 02:00</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                style={{
                  background: isTimerRunning ? '#ff2a6d' : 'linear-gradient(135deg, #00f2fe, #4facfe)',
                  color: isTimerRunning ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>

              <button
                onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}
                title="Reset stopwatch"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Submission links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={copyRepoLink}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              {copiedRepo ? <Check size={13} color="#05ffa1" /> : <Copy size={13} />}
              <span>{copiedRepo ? 'Copied Repo Link' : 'Copy Repo URL'}</span>
            </button>

            <a
              href="https://forms.gle/Lv9wF8gYVHdEqfJW8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', textDecoration: 'none' }}
            >
              <span>Submit Form</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Body Script List */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'rgba(255, 190, 11, 0.08)', border: '1px solid rgba(255, 190, 11, 0.25)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} color="#ffbe0b" />
            <span style={{ fontSize: '0.78rem', color: '#fef3c7' }}>
              <strong>Requirement #4 Checklist:</strong> Ensure your screen recording captures you actively speaking prompts into Wispr Flow so the reviewers see the actual voice-development process!
            </span>
          </div>

          {scriptPhases.map((phase, idx) => (
            <div key={idx} style={{
              background: 'rgba(16, 21, 34, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(0, 242, 254, 0.15)',
                    color: '#00f2fe',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {phase.time}
                  </span>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>{phase.title}</h4>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#05ffa1', fontWeight: 600 }}>Step {idx + 1} of 5</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.25)', padding: '10px 12px', borderRadius: '8px' }}>
                "{phase.script}"
              </p>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} color="#a855f7" />
                <span><strong>Visual Action on Screen:</strong> {phase.cue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
