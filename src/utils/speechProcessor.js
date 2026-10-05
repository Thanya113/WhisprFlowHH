// Speech Processor & Wispr Flow NLP Cleaner

const FILLER_WORDS = [
  '\\bum+\\b',
  '\\buh+\\b',
  '\\blike\\b',
  '\\byou know\\b',
  '\\bbasically\\b',
  '\\bactually\\b',
  '\\bsort of\\b',
  '\\bkind of\\b',
  '\\bso yeah\\b',
  '\\bwait no\\b',
  '\\bi mean\\b',
  '\\berm+\\b',
  '\\bah+\\b'
];

export function cleanWisprSpeech(rawText) {
  if (!rawText) return '';
  let cleaned = rawText;

  // Replace filler words case-insensitively
  FILLER_WORDS.forEach(pattern => {
    const regex = new RegExp(pattern, 'gi');
    cleaned = cleaned.replace(regex, '');
  });

  // Clean repeated commas, spaces and trailing punctuation
  cleaned = cleaned
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*,+/g, ',')
    .replace(/^\s*[,.\s]+/, '')
    .trim();

  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    if (!/[.!?]$/.test(cleaned)) {
      cleaned += '.';
    }
  }

  return cleaned;
}

export function adaptTone(text, tone = 'developer') {
  const base = cleanWisprSpeech(text);
  if (!base) return '';

  switch (tone) {
    case 'developer':
      return base.replace(/\b(make|create|build)\b/i, 'Implement a responsive, fully-typed');
    case 'architect':
      return 'Architect a modular, decoupled system: ' + base;
    case 'creative':
      return 'Design a stunning cyberpunk aesthetic interface with micro-interactions: ' + base;
    case 'concise':
      return base.replace(/please|could you|would you/gi, '').replace(/\s+/g, ' ').trim();
    default:
      return base;
  }
}

export function detectSpeechSupport() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function createSpeechRecognizer({ onResult, onEnd, onError }) {
  if (typeof window === 'undefined') return null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    if (onResult) {
      onResult({ final, interim });
    }
  };

  recognition.onerror = (e) => {
    if (onError) onError(e);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}
