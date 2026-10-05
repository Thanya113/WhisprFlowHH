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
    <div className="glass-panel voice-input-card">
      {/* Header controls & tone selector */}
      <div className="voice-input-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#00f2fe" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>
            Wispr Flow Intelligence Engine
          </h3>
          <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>Real-time NLP</span>
        </div>

        <div className="tone-selector-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#94a3b8' }}>
            <Sliders size={13} />
            <span>Tone:</span>
          </div>
          <div className="tone-buttons-group">
            {[
              { id: 'developer', label: 'Developer' },
              { id: 'creative', label: 'Creative' },
              { id: 'architect', label: 'Architect' },
              { id: 'concise', label: 'Concise' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`tone-btn ${tone === t.id ? 'tone-btn-active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {rawText && (
            <button
              onClick={handleClear}
              className="clear-input-btn"
              title="Clear input"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Quick sample voice prompt pills */}
      <div className="quick-prompts-scroll">
        <span className="quick-prompts-label">
          <Lightbulb size={13} color="#ffbe0b" /> Prompts:
        </span>
        {SAMPLE_VOICE_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => handleSelectTemplate(tmpl)}
            className="quick-prompt-chip"
          >
            {tmpl.title}
          </button>
        ))}
      </div>

      {/* Side-by-side: Raw Voice Input vs Wispr Flow Cleaned Prompt */}
      <div className="speech-comparison-grid">
        {/* Raw Voice Panel */}
        <div className="speech-panel raw-speech-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🎙️ Raw Voice Dictation (with filler words)
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Live Input</span>
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Speak or paste voice dictation here (e.g. 'Um, hey Wispr Flow, like build me a dark pricing card with neon glow...')"
            rows={3}
            className="speech-textarea"
          />
        </div>

        {/* Cleaned Wispr Flow Prompt */}
        <div className="speech-panel cleaned-speech-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#00f2fe', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wand2 size={13} /> Wispr Flow Optimized Prompt
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>
              Cleaned & Formatted
            </span>
          </div>
          <div className="cleaned-text-display">
            {cleanedText || <span style={{ color: '#64748b', fontStyle: 'italic' }}>Cleaned, formatted prompt will appear here as you speak...</span>}
          </div>
        </div>
      </div>

      {/* Execution Footer */}
      <div className="voice-input-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
          <Terminal size={14} color="#00f2fe" />
          <span>Speech Engine: <strong style={{ color: '#05ffa1' }}>Wispr Flow Neural NLP</strong> • Latency: <strong style={{ color: '#00f2fe' }}>&lt;45ms</strong></span>
        </div>

        <button
          onClick={() => onExecutePrompt(cleanedText || rawText)}
          disabled={!rawText.trim() || isExecuting}
          className="btn-primary execute-btn"
          style={{
            opacity: (!rawText.trim() || isExecuting) ? 0.5 : 1,
            cursor: (!rawText.trim() || isExecuting) ? 'not-allowed' : 'pointer'
          }}
        >
          {isExecuting ? (
            <>
              <div className="animate-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000' }} />
              <span>Building from Voice...</span>
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
