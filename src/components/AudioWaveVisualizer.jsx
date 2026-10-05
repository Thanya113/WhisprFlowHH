import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, Radio } from 'lucide-react';

export default function AudioWaveVisualizer({ isRecording, onToggleRecord }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [dbLevel, setDbLevel] = useState(0);

  // Initialize or teardown mic audio stream
  useEffect(() => {
    let stream = null;

    if (isRecording) {
      navigator.mediaDevices?.getUserMedia({ audio: true })
        .then((s) => {
          stream = s;
          setHasMicAccess(true);
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            audioContextRef.current = ctx;
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 128;
            analyser.smoothingTimeConstant = 0.8;
            analyserRef.current = analyser;

            const source = ctx.createMediaStreamSource(stream);
            sourceRef.current = source;
            source.connect(analyser);
          }
        })
        .catch(() => {
          setHasMicAccess(false);
        });
    } else {
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      setHasMicAccess(false);
      setDbLevel(0);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (isRecording && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average amplitude
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        setDbLevel(Math.min(100, Math.round((avg / 255) * 100)));

        // Draw frequency bars
        const barWidth = (width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.85;
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#00f2fe');
          gradient.addColorStop(0.5, '#4facfe');
          gradient.addColorStop(1, '#a855f7');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, height - barHeight, Math.max(3, barWidth - 2), barHeight, [4, 4, 0, 0]);
          ctx.fill();

          x += barWidth + 2;
        }
      } else {
        // Idle or simulated aesthetic sine wave
        phase += 0.04;
        const waves = [
          { color: 'rgba(0, 242, 254, 0.4)', amp: isRecording ? 30 : 15, freq: 0.015, speed: phase },
          { color: 'rgba(168, 85, 247, 0.35)', amp: isRecording ? 25 : 12, freq: 0.02, speed: phase * 1.3 },
          { color: 'rgba(79, 172, 254, 0.5)', amp: isRecording ? 35 : 18, freq: 0.01, speed: phase * 0.7 }
        ];

        waves.forEach(w => {
          ctx.beginPath();
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 2.5;

          for (let x = 0; x < width; x += 4) {
            const y = height / 2 + Math.sin(x * w.freq + w.speed) * w.amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  return (
    <div style={{
      background: 'rgba(10, 13, 20, 0.85)',
      borderRadius: '16px',
      border: isRecording ? '1px solid rgba(255, 42, 109, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '14px',
      boxShadow: isRecording ? '0 0 25px rgba(255, 42, 109, 0.2)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
        <button
          onClick={onToggleRecord}
          className={isRecording ? 'btn-recording' : 'btn-primary'}
          style={{
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            cursor: 'pointer',
            flexShrink: 0
          }}
          title={isRecording ? 'Click to Stop Dictating' : 'Click to Speak with Wispr Flow'}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isRecording ? '#ff2a6d' : '#05ffa1',
              boxShadow: isRecording ? '0 0 8px #ff2a6d' : '0 0 8px #05ffa1'
            }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              {isRecording ? 'Listening via Wispr Flow' : 'Voice Engine Standby'}
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            {isRecording ? 'Speak natural instructions freely' : 'Hold Fn / Spacebar or click mic'}
          </span>
        </div>
      </div>

      {/* Canvas waveform display */}
      <div style={{ flex: '2 1 240px', position: 'relative', height: '54px', display: 'flex', alignItems: 'center', minWidth: '180px' }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={54}
          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        />
        {isRecording && (
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '8px',
            background: 'rgba(0,0,0,0.6)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            color: '#00f2fe',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Radio size={12} className="animate-pulse-dot" />
            {dbLevel > 0 ? `${dbLevel} dB` : 'Speech Active'}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.75rem', flexShrink: 0 }}>
        <Volume2 size={15} color={isRecording ? '#00f2fe' : '#64748b'} />
        <span style={{ fontFamily: 'var(--font-mono)' }}>{hasMicAccess ? 'Live Mic' : 'Synth Stream'}</span>
      </div>
    </div>
  );
}
