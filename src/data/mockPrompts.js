export const SAMPLE_VOICE_TEMPLATES = [
  {
    id: 'pricing-table',
    title: 'Cyberpunk Neon Pricing Cards',
    category: 'SaaS UI',
    rawVoice: 'Um, hey Wispr Flow, could you like, uh, build me a three tier pricing table with a monthly annual switch? Make it have a glowing neon cyan border on the popular plan and cool hover animations, please.',
    cleanedVoice: 'Build a 3-tier cyberpunk neon pricing table with a monthly/annual billing switch, featured pro tier with cyan glow accents, and interactive feature checklist.',
    tags: ['Pricing', 'Dark Mode', 'Interactive'],
    code: `// Cyberpunk Neon Pricing Component
import React, { useState } from 'react';
import { Check, Zap, Sparkles } from 'lucide-react';

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: annual ? 19 : 29,
      desc: 'Ideal for solo developers building voice-first prototypes.',
      features: ['50,000 voice tokens/mo', 'Whispr Flow clean dictation', 'Standard latency (150ms)', 'Community Discord access'],
      highlight: false,
    },
    {
      name: 'Pro Developer',
      price: annual ? 49 : 69,
      desc: 'Supercharge your daily coding speed with voice-driven flows.',
      features: ['Unlimited voice dictation', 'Real-time code transformations', 'Ultra-low latency (<50ms)', 'Custom voice macro engine', 'Priority GitHub sync'],
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise Studio',
      price: annual ? 129 : 159,
      desc: 'Full team voice AI governance with custom fine-tuned models.',
      features: ['Dedicated inference nodes', 'Custom voice vocabulary', 'SSO & Enterprise security', '24/7 dedicated engineering', 'Custom SLA guarantee'],
      highlight: false,
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#090d16', borderRadius: '16px', color: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #00f2fe, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Voice-Powered Pricing
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '6px' }}>
          Dictate faster, ship earlier. Choose the flow tier tailored for you.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#131a29', padding: '6px 16px', borderRadius: '999px', marginTop: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.85rem', color: !annual ? '#00f2fe' : '#94a3b8', fontWeight: 600 }}>Monthly</span>
          <button 
            onClick={() => setAnnual(!annual)} 
            style={{ width: '44px', height: '24px', borderRadius: '12px', background: annual ? '#00f2fe' : '#334155', border: 'none', position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#0a0d14', position: 'absolute', top: '3px', left: annual ? '23px' : '3px', transition: 'all 0.3s ease' }} />
          </button>
          <span style={{ fontSize: '0.85rem', color: annual ? '#00f2fe' : '#94a3b8', fontWeight: 600 }}>
            Annual <span style={{ color: '#05ffa1', fontSize: '0.75rem', marginLeft: '4px' }}>Save 30%</span>
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {plans.map((p, idx) => (
          <div key={idx} style={{
            background: p.highlight ? 'linear-gradient(180deg, rgba(0, 242, 254, 0.08), rgba(168, 85, 247, 0.04))' : '#101522',
            border: p.highlight ? '2px solid #00f2fe' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '24px',
            position: 'relative',
            boxShadow: p.highlight ? '0 0 30px rgba(0, 242, 254, 0.2)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {p.badge && (
              <div style={{ position: 'absolute', top: '-12px', right: '20px', background: 'linear-gradient(135deg, #00f2fe, #4facfe)', color: '#000', fontSize: '0.72rem', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase' }}>
                {p.badge}
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {p.highlight ? <Zap size={20} color="#00f2fe" /> : <Sparkles size={18} color="#94a3b8" />}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{p.name}</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', minHeight: '40px' }}>{p.desc}</p>
              
              <div style={{ margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: p.highlight ? '#00f2fe' : '#fff' }}>\${p.price}</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>/ month</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {p.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                    <Check size={16} color={p.highlight ? '#00f2fe' : '#05ffa1'} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: 'none',
              background: p.highlight ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(255,255,255,0.08)',
              color: p.highlight ? '#090d16' : '#fff',
              transition: 'all 0.2s ease'
            }}>
              {p.highlight ? 'Start with Voice Flow' : 'Select ' + p.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    id: 'kanban-board',
    title: 'Agile Voice Sprint Kanban Board',
    category: 'Productivity',
    rawVoice: 'Hey Wispr Flow, um, create an interactive task board for my voice sprint. Let me add tasks, move them between backlog, active, and completed, and show high priority badges with nice glowing colors.',
    cleanedVoice: 'Generate an interactive Agile Sprint Kanban board with status columns (Backlog, In Progress, Review, Done), voice task creator, priority badges, and card movement controls.',
    tags: ['Kanban', 'Workflow', 'Voice Tasks'],
    code: `// Interactive Voice Sprint Kanban Board
import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Integrate Wispr Flow voice engine', col: 'done', priority: 'High', time: '10m' },
    { id: 2, title: 'Build realtime waveform audio visualizer', col: 'done', priority: 'High', time: '25m' },
    { id: 3, title: 'Develop filler-word removal filter', col: 'progress', priority: 'Medium', time: '15m' },
    { id: 4, title: 'Draft demo video walkthrough script', col: 'review', priority: 'High', time: '20m' },
    { id: 5, title: 'Push build to GitHub & complete submission form', col: 'backlog', priority: 'Urgent', time: '5m' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const columns = [
    { id: 'backlog', name: 'Backlog', icon: Clock, color: '#94a3b8' },
    { id: 'progress', name: 'In Progress', icon: AlertCircle, color: '#00f2fe' },
    { id: 'review', name: 'Review', icon: Clock, color: '#a855f7' },
    { id: 'done', name: 'Completed', icon: CheckCircle, color: '#05ffa1' }
  ];

  const moveTask = (taskId, nextCol) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, col: nextCol } : t));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      title: newTaskTitle.trim(),
      col: 'backlog',
      priority: 'Medium',
      time: 'New'
    }]);
    setNewTaskTitle('');
  };

  return (
    <div style={{ padding: '24px', background: '#0a0d14', borderRadius: '16px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9' }}>Voice Sprint Kanban</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Track tasks dictated and built with Wispr Flow in real-time</p>
        </div>
        <form onSubmit={addTask} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Dictate or type new task..." 
            value={newTaskTitle} 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            style={{ padding: '8px 14px', background: '#131a29', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', width: '220px' }}
          />
          <button type="submit" style={{ background: '#00f2fe', color: '#000', border: 'none', borderRadius: '8px', padding: '8px 14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Plus size={16} /> Add
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {columns.map(col => {
          const ColIcon = col.icon;
          const colTasks = tasks.filter(t => t.col === col.id);
          return (
            <div key={col.id} style={{ background: '#101522', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ColIcon size={16} color={col.color} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{col.name}</span>
                </div>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>{colTasks.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '140px' }}>
                {colTasks.map(task => (
                  <div key={task.id} style={{ background: '#161c2d', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>{task.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        background: task.priority === 'Urgent' ? 'rgba(255,42,109,0.2)' : task.priority === 'High' ? 'rgba(0,242,254,0.15)' : 'rgba(255,255,255,0.05)',
                        color: task.priority === 'Urgent' ? '#ff2a6d' : task.priority === 'High' ? '#00f2fe' : '#94a3b8',
                        fontWeight: 700 
                      }}>
                        {task.priority}
                      </span>
                      {col.id !== 'done' && (
                        <button 
                          onClick={() => {
                            const nextOrder = ['backlog', 'progress', 'review', 'done'];
                            const nextIdx = nextOrder.indexOf(col.id) + 1;
                            moveTask(task.id, nextOrder[nextIdx]);
                          }}
                          title="Advance Task"
                          style={{ background: 'transparent', border: 'none', color: '#00f2fe', cursor: 'pointer', padding: '2px' }}
                        >
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
  },
  {
    id: 'analytics-dashboard',
    title: 'Voice AI Analytics & Telemetry Hub',
    category: 'Metrics & Data',
    rawVoice: 'Hey Wispr Flow, like, make a dark glassmorphic analytics dashboard with real-time stats for speech recognition accuracy, words per minute dictated, time saved, and a cool animated SVG bar chart.',
    cleanedVoice: 'Build a dark glassmorphic telemetry dashboard displaying speech recognition accuracy (99.4%), dictation WPM (164 WPM), total developer hours saved (14.2 hrs), and active voice session charts.',
    tags: ['Analytics', 'Telemetry', 'Charts'],
    code: `// Voice AI Telemetry & Developer Metrics Hub
import React, { useState } from 'react';
import { Activity, Mic, Clock, Award, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Voice Dictation Speed', value: '164 WPM', delta: '+340% vs typing', icon: Mic, color: '#00f2fe' },
    { label: 'Wispr Flow Accuracy', value: '99.4%', delta: 'Filler words filtered', icon: Award, color: '#05ffa1' },
    { label: 'Dev Hours Saved', value: '14.2 hrs', delta: 'This sprint alone', icon: Clock, color: '#a855f7' },
    { label: 'Voice Prompts Dictated', value: '382', delta: '+28 today', icon: Activity, color: '#ffbe0b' }
  ];

  const chartData = [
    { day: 'Mon', wpm: 120, height: '55%' },
    { day: 'Tue', wpm: 138, height: '65%' },
    { day: 'Wed', wpm: 152, height: '75%' },
    { day: 'Thu', wpm: 148, height: '70%' },
    { day: 'Fri', wpm: 165, height: '85%' },
    { day: 'Sat', wpm: 172, height: '90%' },
    { day: 'Sun', wpm: 180, height: '100%' }
  ];

  return (
    <div style={{ padding: '24px', background: '#0a0d14', borderRadius: '16px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={22} color="#00f2fe" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Wispr Flow Telemetry & Productivity</h2>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Quantifying real-time developer speed improvements through voice</p>
        </div>
        <div style={{ display: 'flex', background: '#101522', borderRadius: '8px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['24h', '7d', '30d'].map(t => (
            <button 
              key={t}
              onClick={() => setTimeRange(t)}
              style={{
                background: timeRange === t ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'transparent',
                color: timeRange === t ? '#000' : '#94a3b8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {stats.map((s, idx) => {
          const SIcon = s.icon;
          return (
            <div key={idx} style={{ background: '#101522', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{s.label}</span>
                <div style={{ padding: '6px', borderRadius: '8px', background: s.color + '1a' }}>
                  <SIcon size={16} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: s.color, fontWeight: 600 }}>
                <ArrowUpRight size={14} /> {s.delta}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: '#101522', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: '#e2e8f0' }}>Daily Voice Dictation Throughput (WPM)</h4>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', paddingTop: '20px', paddingBottom: '6px' }}>
          {chartData.map((bar, bIdx) => (
            <div key={bIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div style={{ width: '36px', height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  height: bar.height,
                  background: 'linear-gradient(180deg, #00f2fe, #a855f7)',
                  borderRadius: '6px 6px 2px 2px',
                  boxShadow: '0 0 12px rgba(0, 242, 254, 0.3)',
                  transition: 'height 0.4s ease'
                }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: 'audio-player',
    title: 'Voice Memo & Soundbite Inspector',
    category: 'Audio Player',
    rawVoice: 'Wispr Flow, um, code an audio waveform player with play pause, interactive scrubber, playback speed buttons like 1x 1.5x 2x, and a live volume slider.',
    cleanedVoice: 'Create an audio soundbite inspector with interactive play/pause controls, dynamic waveform visualizer, playback rate multiplier (1x, 1.5x, 2x), and speech transcription sync.',
    tags: ['Audio', 'Waveform', 'Player'],
    code: `// Audio Memo & Waveform Player
import React, { useState } from 'react';
import { Play, Pause, Volume2, FastForward, RotateCcw } from 'lucide-react';

export default function AudioMemoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(42);

  const bars = [15, 30, 45, 80, 60, 40, 90, 100, 75, 50, 65, 85, 95, 70, 40, 60, 80, 55, 35, 65, 90, 85, 45, 60, 30, 20];

  return (
    <div style={{ padding: '24px', background: '#0a0d14', borderRadius: '16px', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#00f2fe', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wispr Audio Clip #04</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Voice Prompt: Scaffolding Kanban Component</h3>
        </div>
        <span style={{ background: 'rgba(0, 242, 254, 0.12)', color: '#00f2fe', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
          00:14s duration
        </span>
      </div>

      <div style={{ background: '#101522', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '60px', marginBottom: '14px' }}>
          {bars.map((h, i) => {
            const isPlayed = (i / bars.length) * 100 <= progress;
            return (
              <div 
                key={i} 
                onClick={() => setProgress(Math.round((i / bars.length) * 100))}
                style={{
                  flex: 1,
                  height: h + '%',
                  background: isPlayed ? 'linear-gradient(180deg, #00f2fe, #4facfe)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'height 0.2s ease, background 0.2s ease'
                }}
              />
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
          <span>00:06s</span>
          <span>00:14s</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
              border: 'none',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
            }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
          </button>
          
          <button 
            onClick={() => setProgress(0)}
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <RotateCcw size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}>
            <Volume2 size={16} color="#94a3b8" />
            <input type="range" min="0" max="100" defaultValue="85" style={{ accentColor: '#00f2fe', width: '70px', height: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 1.25, 1.5, 2].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              style={{
                background: speed === s ? '#00f2fe' : 'rgba(255,255,255,0.06)',
                color: speed === s ? '#000' : '#94a3b8',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`
  }
];
