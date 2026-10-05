import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import AudioWaveVisualizer from './components/AudioWaveVisualizer';
import VoiceInputBar from './components/VoiceInputBar';
import ComponentSandbox from './components/ComponentSandbox';
import CodeInspector from './components/CodeInspector';
import MacroBuilder from './components/MacroBuilder';
import DevJourneyTimeline from './components/DevJourneyTimeline';
import { createSpeechRecognizer } from './utils/speechProcessor';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'macros' | 'journey'
  const [activeTemplateId, setActiveTemplateId] = useState('pricing-table');
  const [isRecording, setIsRecording] = useState(false);
  const [rawText, setRawText] = useState('Um, hey Wispr Flow, like build me a three tier pricing table with a monthly annual switch, neon cyan border on the popular plan, and interactive feature checklist.');
  const [isExecuting, setIsExecuting] = useState(false);

  const recognizerRef = useRef(null);

  // Setup Web Speech API recognition
  useEffect(() => {
    const recognizer = createSpeechRecognizer({
      onResult: ({ final, interim }) => {
        const spoken = final || interim;
        if (spoken) {
          setRawText(prev => prev ? `${prev} ${spoken}`.trim() : spoken);
        }
      },
      onEnd: () => {
        setIsRecording(false);
      },
      onError: (err) => {
        console.warn('Speech recognition warning or not available:', err);
        setIsRecording(false);
      }
    });

    recognizerRef.current = recognizer;
  }, []);

  // Hotkey listener (hold or press hotkey to toggle voice)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If F8 or Ctrl+Space is pressed, toggle recording
      if (e.key === 'F8' || (e.ctrlKey && e.code === 'Space')) {
        e.preventDefault();
        toggleRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognizerRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        // Fallback simulation mode if browser doesn't permit mic
        setIsRecording(true);
        setTimeout(() => {
          setRawText('Hey Wispr Flow, um, create an interactive task board for my voice sprint with priority badges and real-time card moves.');
          setIsRecording(false);
        }, 3000);
      }
    }
  };

  const handleExecutePrompt = (promptText) => {
    setIsExecuting(true);

    setTimeout(() => {
      setIsExecuting(false);

      // Match template based on voice prompt keywords
      const lower = (promptText || '').toLowerCase();
      if (lower.includes('kanban') || lower.includes('task') || lower.includes('sprint') || lower.includes('board')) {
        setActiveTemplateId('kanban-board');
      } else if (lower.includes('analytics') || lower.includes('telemetry') || lower.includes('chart') || lower.includes('metric')) {
        setActiveTemplateId('analytics-dashboard');
      } else if (lower.includes('audio') || lower.includes('player') || lower.includes('sound') || lower.includes('memo')) {
        setActiveTemplateId('audio-player');
      } else {
        setActiveTemplateId('pricing-table');
      }

      // Celebrate with confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f2fe', '#4facfe', '#a855f7', '#05ffa1']
      });
    }, 600);
  };

  const handleRunMacro = (macro) => {
    setRawText(macro.actionPrompt);
    handleExecutePrompt(macro.actionPrompt);
  };

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRecording={isRecording}
      />

      {/* Main Container */}
      <main className="main-content-wrap">
        {/* Audio Waveform Bar (Always accessible for voice dictation) */}
        <AudioWaveVisualizer
          isRecording={isRecording}
          onToggleRecord={toggleRecording}
        />

        {/* Tab 1: Voice Studio */}
        {activeTab === 'studio' && (
          <div className="studio-tab-content">
            {/* Realtime Wispr Flow Dictation & Prompt Transformer */}
            <VoiceInputBar
              rawText={rawText}
              setRawText={setRawText}
              onExecutePrompt={handleExecutePrompt}
              isExecuting={isExecuting}
            />

            {/* Split Screen Workspace: Sandbox on Left, Code Inspector on Right */}
            <div className="workspace-split-grid">
              <ComponentSandbox
                activeTemplateId={activeTemplateId}
                onTriggerConfetti={() => confetti({ particleCount: 50, spread: 60 })}
              />

              <CodeInspector
                activeTemplateId={activeTemplateId}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Voice Command Macros */}
        {activeTab === 'macros' && (
          <MacroBuilder onRunMacro={handleRunMacro} />
        )}

        {/* Tab 3: Dev Journey & Voice Audit Log */}
        {activeTab === 'journey' && (
          <DevJourneyTimeline />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={15} color="#00f2fe" />
          <span>
            <strong>WisprFlow Studio</strong> — Voice-Driven AI Developer Workspace
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Powered entirely by voice dictation</span>
          <a
            href="https://github.com/Thanya113/WhisprFlowHH"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00f2fe', textDecoration: 'none' }}
          >
            GitHub Repository
          </a>
        </div>
      </footer>
    </div>
  );
}
