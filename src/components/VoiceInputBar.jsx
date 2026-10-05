import React, { useState, useEffect } from 'react';
import { Sparkles, Trash2, Sliders, ArrowRight, Wand2, Terminal, Lightbulb } from 'lucide-react';
import { cleanWisprSpeech, adaptTone } from '../utils/speechProcessor';
import { SAMPLE_VOICE_TEMPLATES } from '../data/mockPrompts';

export default function VoiceInputBar({ 
  rawText, 
  setRawText, 
  onExecutePrompt, 
  isExecuting 
}) {
  const [tone, setTone] = useState('developer');
  const [cleanedText, setCleanedText] = useState('');
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' | 'templates'

  useEffect(() => {
    const cleaned = adaptTone(rawText, tone);
    setCleanedText(cleaned);
  }, [rawText, tone]);

  const handleSelectTemplate = (template) => {
    setRawText(template.rawVoice);
  };

  const handleClear = () => {
    setRawText('');
    setCleanedText('');
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header controls & tone selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#00f2fe" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
            Wispr Flow Intelligence Engine
          </h3>
          <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>Real-time NLP</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
            <Sliders size={14} />
            <span>Tone:</span>
          </div>
          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
            {[
              { id: 'developer', label: 'Developer' },
              { id: 'creative', label: 'Creative UI' },
              { id: 'architect', label: 'Architect' },
              { id: 'concise', label: 'Concise' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                style={{
                  background: tone === t.id ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'transparent',
                  color: tone === t.id ? '#090d16' : '#94a3b8',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {rawText && (
            <button
              onClick={handleClear}
              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
              title="Clear input"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Quick sample voice prompt pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
          <Lightbulb size={13} color="#ffbe0b" /> Quick Prompts:
        </span>
        {SAMPLE_VOICE_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => handleSelectTemplate(tmpl)}
            style={{
              whiteSpace: 'nowrap',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#00f2fe'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#cbd5e1'; }}
          >
            {tmpl.title}
          </button>
        ))}
      </div>

      {/* Side-by-side: Raw Voice Input vs Wispr Flow Cleaned Prompt */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
        {/* Raw Voice Panel */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🎙️ Raw Voice Dictation (with filler words)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Microphone Feed</span>
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Speak or paste voice dictation here (e.g. 'Um, hey Wispr Flow, like build me a dark pricing card with neon glow...')"
            rows={3}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#e2e8f0',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.5
            }}
          />
        </div>

        {/* Cleaned Wispr Flow Prompt */}
        <div style={{
          background: 'rgba(0, 242, 254, 0.04)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#00f2fe', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wand2 size={13} /> Wispr Flow Optimized Prompt
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              Cleaned & Formatted
            </span>
          </div>
          <div style={{
            minHeight: '72px',
            color: '#f8fafc',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            overflowY: 'auto'
          }}>
            {cleanedText || <span style={{ color: '#64748b', fontStyle: 'italic' }}>Cleaned, formatted prompt will appear here as you speak...</span>}
          </div>
        </div>
      </div>

      {/* Execution Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
          <Terminal size={14} color="#00f2fe" />
          <span>Wispr Flow referral verification: <strong style={{ color: '#05ffa1' }}>Active (hhg)</strong></span>
        </div>

        <button
          onClick={() => onExecutePrompt(cleanedText || rawText)}
          disabled={!rawText.trim() || isExecuting}
          className="btn-primary"
          style={{
            opacity: (!rawText.trim() || isExecuting) ? 0.5 : 1,
            cursor: (!rawText.trim() || isExecuting) ? 'not-allowed' : 'pointer'
          }}
        >
          {isExecuting ? (
            <>
              <div className="animate-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000' }} />
              <span>Synthesizing Voice Code...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Execute Voice Flow</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
