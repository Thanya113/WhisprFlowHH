import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal, FileText } from 'lucide-react';
import { SAMPLE_VOICE_TEMPLATES } from '../data/mockPrompts';

export default function CodeInspector({ activeTemplateId }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('jsx'); // 'jsx' | 'meta'

  const activeTmpl = SAMPLE_VOICE_TEMPLATES.find(t => t.id === activeTemplateId) || SAMPLE_VOICE_TEMPLATES[0];

  const handleCopy = () => {
    const textToCopy = activeTab === 'jsx' ? activeTmpl.code : JSON.stringify({
      id: activeTmpl.id,
      prompt: activeTmpl.cleanedVoice,
      rawSpoken: activeTmpl.rawVoice,
      tags: activeTmpl.tags,
      engine: 'Wispr Flow Voice Dictation AI v2'
    }, null, 2);

    navigator.clipboard?.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([activeTmpl.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeTmpl.id}.jsx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Code Inspector Header */}
      <div style={{
        padding: '12px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        background: 'rgba(10, 13, 20, 0.6)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('jsx')}
            style={{
              background: activeTab === 'jsx' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: activeTab === 'jsx' ? '#00f2fe' : '#94a3b8',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileCode size={14} /> {activeTmpl.id}.jsx
          </button>

          <button
            onClick={() => setActiveTab('meta')}
            style={{
              background: activeTab === 'meta' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: activeTab === 'meta' ? '#00f2fe' : '#94a3b8',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={14} /> VoiceMeta.json
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            title="Copy source code"
          >
            {copied ? <Check size={14} color="#05ffa1" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            title="Download JSX file"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        background: '#07090e',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        lineHeight: 1.6
      }}>
        {activeTab === 'jsx' ? (
          <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {activeTmpl.code.split('\n').map((line, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                <span style={{ color: '#475569', userSelect: 'none', width: '28px', textAlign: 'right', flexShrink: 0 }}>
                  {idx + 1}
                </span>
                <span style={{
                  color: line.startsWith('//') ? '#64748b' : 
                         line.includes('import') || line.includes('export') || line.includes('function') || line.includes('return') ? '#c084fc' :
                         line.includes('const') || line.includes('let') || line.includes('useState') ? '#00f2fe' :
                         line.includes('style={{') ? '#38bdf8' : '#e2e8f0'
                }}>
                  {line}
                </span>
              </div>
            ))}
          </pre>
        ) : (
          <pre style={{ margin: 0, color: '#00f2fe', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify({
              id: activeTmpl.id,
              title: activeTmpl.title,
              category: activeTmpl.category,
              spokenVoicePrompt: activeTmpl.rawVoice,
              wisprFlowCleanedPrompt: activeTmpl.cleanedVoice,
              tags: activeTmpl.tags,
              generator: 'WisprFlow Studio Speech-to-Code Pipeline',
              referralVerified: 'https://ref.wisprflow.ai/hhg'
            }, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
