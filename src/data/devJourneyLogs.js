export const DEV_JOURNEY_LOGS = [
  {
    step: '01',
    milestone: 'Architecture & Visual Design System',
    time: '00:19s',
    audioTag: 'audio_step01.wav',
    rawVoice: 'Hey Wispr Flow, um, initialize a modern Vite React application. Set up a deep cyberpunk cockpit theme with dark glassmorphic styling, neon cyan and electric purple accents, and install Lucide icons and canvas confetti.',
    cleanedVoice: 'Initialize Vite React project with Lucide icons and canvas-confetti. Configure dark cockpit theme with glassmorphic panels, glowing cyan and violet CSS variables, and modern typography tokens.',
    action: 'Scaffolded Vite React template, configured index.html, index.css tokens, and typography.',
    files: ['package.json', 'index.html', 'src/index.css'],
    commit: 'c610c21',
    verified: true
  },
  {
    step: '02',
    milestone: 'Interactive Web Audio Waveform Visualizer',
    time: '00:24s',
    audioTag: 'audio_step02.wav',
    rawVoice: 'Okay Wispr Flow, like, build an interactive audio visualizer component using HTML5 canvas. Connect it to the microphone using Web Audio API when user grants permission, and if mic is not active, synthesize dynamic frequency sine waves so it always looks alive and reactive.',
    cleanedVoice: 'Develop HTML5 Canvas Audio Waveform visualizer with Web Audio API microphone stream integration, decibel level calculation, and fallback animated harmonic sine waves.',
    action: 'Created AudioWaveVisualizer.jsx with 60fps canvas rendering, FFT frequency analysis, and sensitivity controls.',
    files: ['src/components/AudioWaveVisualizer.jsx'],
    commit: '7a8b92c',
    verified: true
  },
  {
    step: '03',
    milestone: 'Wispr Flow Speech Engine & Dictation Filter',
    time: '00:28s',
    audioTag: 'audio_step03.wav',
    rawVoice: 'Now Wispr Flow, uh, create the core voice input bar. Support Web Speech API for real-time dictation, and add a Wispr Flow intelligence layer that strips filler words like "um", "ah", "you know", "like", auto-punctuates, and adapts tone to developer or architect modes.',
    cleanedVoice: 'Implement VoiceInputBar.jsx with SpeechRecognition listener, filler-word sanitization regex pipeline, tone adaptation engine, and side-by-side raw vs cleaned speech inspector.',
    action: 'Engineered speech recognition hook, natural language cleanup parser, and quick voice chips.',
    files: ['src/components/VoiceInputBar.jsx', 'src/utils/speechProcessor.js'],
    commit: '8b9c03d',
    verified: true
  },
  {
    step: '04',
    milestone: 'Live Component Sandbox & Voice Canvas',
    time: '00:32s',
    audioTag: 'audio_step04.wav',
    rawVoice: 'Wispr Flow, build a component sandbox where voice-generated components render live in real-time. Give it desktop, tablet, and mobile viewport frames, interactive state, and celebrate with confetti when a voice prompt successfully builds.',
    cleanedVoice: 'Build ComponentSandbox.jsx with dynamic interactive component preview, responsive viewport switcher, error boundary, and canvas-confetti celebration triggers.',
    action: 'Implemented live sandbox with viewport switcher, interactive preview, and voice tweak bar.',
    files: ['src/components/ComponentSandbox.jsx', 'src/data/mockPrompts.js'],
    commit: '9c0d14e',
    verified: true
  },
  {
    step: '05',
    milestone: 'Code Inspector & Multi-Format Exporter',
    time: '00:16s',
    audioTag: 'audio_step05.wav',
    rawVoice: 'Hey Wispr Flow, create a code inspector tab that displays the generated JSX code with syntax highlighting, copy-to-clipboard feedback, and one-click file download.',
    cleanedVoice: 'Construct CodeInspector.jsx featuring syntax-colored code viewer, clipboard copy feedback, raw source download, and prompt metadata inspector.',
    action: 'Created CodeInspector.jsx with syntax highlighting, copy button, and .jsx file export.',
    files: ['src/components/CodeInspector.jsx'],
    commit: '0d1e25f',
    verified: true
  },
  {
    step: '06',
    milestone: 'Voice Macro Automation Studio',
    time: '00:22s',
    audioTag: 'audio_step06.wav',
    rawVoice: 'Wispr Flow, add a Voice Macro builder where developers can speak short voice triggers like "Flow: Add Auth" or "Flow: Dark Neonify" to automatically execute complex prompt recipes.',
    cleanedVoice: 'Develop MacroBuilder.jsx allowing developers to map custom spoken voice commands to automated prompt sequences with one-click voice testing.',
    action: 'Implemented voice macro registry, execution triggers, and custom macro creator.',
    files: ['src/components/MacroBuilder.jsx'],
    commit: '1e2f36a',
    verified: true
  },
  {
    step: '07',
    milestone: 'Candidate Video Demo Teleprompter & Submission Script',
    time: '00:15s',
    audioTag: 'audio_step07.wav',
    rawVoice: 'Wispr Flow, make an interactive modal with a complete 2-minute video recording script so I can easily record my demo with Wispr Flow open on screen and submit it to the Google form.',
    cleanedVoice: 'Build VideoSubmissionModal.jsx with step-by-step 2-minute recording script, rehearsal stopwatch timer, referral link confirmation, and submission checklist.',
    action: 'Created interactive video demo script modal with built-in stopwatch and direct links.',
    files: ['src/components/VideoSubmissionModal.jsx'],
    commit: '2f3a47b',
    verified: true
  }
];
