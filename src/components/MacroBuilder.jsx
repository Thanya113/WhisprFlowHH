import React, { useState } from 'react';
import { Command, Mic, Play, Plus, Zap, CheckCircle2, ShieldCheck, Sparkles, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_MACROS = [
  {
    id: 'macro-1',
    trigger: 'Flow: Dark Neonify',
    description: 'Transform light UI into deep cyberpunk dark mode with cyan and purple glowing borders.',
    target: 'Styling & Tokens',
    hotkey: 'Ctrl+Shift+D',
    actionPrompt: 'Refactor current component to deep dark theme with #0a0d14 background, cyan glow borders, and vibrant typography.'
  },
  {
    id: 'macro-2',
    trigger: 'Flow: Add TypeScript Types',
    description: 'Generate comprehensive TypeScript interface definitions for props and state.',
    target: 'Type Safety',
    hotkey: 'Ctrl+Shift+T',
    actionPrompt: 'Extract all React component props into strict interface definitions with JSDoc documentation comments.'
  },
  {
    id: 'macro-3',
    trigger: 'Flow: Generate Unit Tests',
    description: 'Synthesize automated Vitest / React Testing Library unit tests covering user interactions.',
    target: 'Testing',
    hotkey: 'Ctrl+Shift+U',
    actionPrompt: 'Create Vitest test suite testing button clicks, state updates, and rendering of all elements.'
  },
  {
    id: 'macro-4',
    trigger: 'Flow: Add Confetti Burst',
    description: 'Inject celebratory canvas-confetti particle explosions on primary action triggers.',
    target: 'Interactivity',
    hotkey: 'Ctrl+Shift+C',
    actionPrompt: 'Import canvas-confetti and attach confetti explosions to purchase/submit buttons.'
  },
  {
    id: 'macro-5',
    trigger: 'Flow: Audit Accessibility',
    description: 'Inject aria-labels, role attributes, and keyboard focus outlines for WCAG AAA compliance.',
    target: 'A11y Standards',
    hotkey: 'Ctrl+Shift+A',
    actionPrompt: 'Audit all clickable elements and add aria-label, role, tabIndex, and keyboard event handlers.'
  }
];

export default function MacroBuilder({ onRunMacro }) {
  const [macros, setMacros] = useState(INITIAL_MACROS);
  const [activeExecuted, setActiveExecuted] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTrigger, setNewTrigger] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const executeMacro = (macro) => {
    setActiveExecuted(macro.id);
    if (macro.id === 'macro-4') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
    if (onRunMacro) {
      onRunMacro(macro);
    }
    setTimeout(() => {
      setActiveExecuted(null);
    }, 2200);
  };

  const handleAddMacro = (e) => {
    e.preventDefault();
    if (!newTrigger.trim() || !newDesc.trim()) return;
    setMacros([
      ...macros,
      {
        id: `macro-${Date.now()}`,
        trigger: newTrigger.startsWith('Flow:') ? newTrigger : `Flow: ${newTrigger}`,
        description: newDesc,
        target: 'Custom Voice Command',
        hotkey: 'Voice Only',
        actionPrompt: newDesc
      }
    ]);
    setNewTrigger('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Command size={20} color="#00f2fe" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Voice Command Macros</h2>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Map spoken trigger phrases to automated multi-step development pipelines
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Add Voice Macro
        </button>
      </div>

      {/* Grid of Voice Macros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {macros.map((m) => {
          const isRunning = activeExecuted === m.id;
          return (
            <div
              key={m.id}
              style={{
                background: isRunning ? 'linear-gradient(180deg, rgba(0, 242, 254, 0.12), rgba(168, 85, 247, 0.08))' : 'rgba(16, 21, 34, 0.8)',
                border: isRunning ? '1px solid #00f2fe' : '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: isRunning ? '0 0 25px rgba(0, 242, 254, 0.3)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                    {m.target}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    {m.hotkey}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Mic size={15} color="#00f2fe" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                    "{m.trigger}"
                  </h4>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  {m.description}
                </p>
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: isRunning ? '#05ffa1' : '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isRunning ? <CheckCircle2 size={14} color="#05ffa1" /> : <Sparkles size={14} />}
                  {isRunning ? 'Executed via Voice' : 'Spoken Trigger Ready'}
                </span>

                <button
                  onClick={() => executeMacro(m)}
                  className="btn-secondary"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    background: isRunning ? '#00f2fe' : 'rgba(255, 255, 255, 0.06)',
                    color: isRunning ? '#000' : '#fff'
                  }}
                >
                  <Play size={12} /> {isRunning ? 'Running...' : 'Test Trigger'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Macro Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '24px', background: '#0e131f' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Register Custom Voice Macro</h3>
            <form onSubmit={handleAddMacro} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  Spoken Voice Trigger (e.g. "Flow: Refactor to Hook")
                </label>
                <input
                  type="text"
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                  placeholder="Flow: My Custom Command"
                  required
                  style={{ width: '100%', padding: '10px 14px', background: '#161c2d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  Action Description / Prompt Instructions
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain what the AI agent should do when you speak this command..."
                  required
                  style={{ width: '100%', padding: '10px 14px', background: '#161c2d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 16px' }}
                >
                  Save Macro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
