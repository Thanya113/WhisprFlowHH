import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, Sparkles, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

// Import interactive subcomponents
import { Check, Zap, Plus, CheckCircle, Clock, AlertCircle, ArrowRight, Activity, Mic, Award, TrendingUp, Play, Pause, Volume2, RotateCcw } from 'lucide-react';

/* 1. Interactive Pricing Component */
function InteractivePricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Flow',
      price: annual ? 19 : 29,
      desc: 'Ideal for solo developers building voice-first prototypes.',
      features: ['50,000 voice tokens/mo', 'Wispr Flow clean dictation', 'Standard latency (150ms)', 'Community Discord access'],
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
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #00f2fe, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Voice-Powered Pricing
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>
          Dictate faster, ship earlier. Choose the flow tier tailored for you.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#131a29', padding: '6px 16px', borderRadius: '999px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        {plans.map((p, idx) => (
          <div key={idx} style={{
            background: p.highlight ? 'linear-gradient(180deg, rgba(0, 242, 254, 0.08), rgba(168, 85, 247, 0.04))' : '#101522',
            border: p.highlight ? '2px solid #00f2fe' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '22px',
            position: 'relative',
            boxShadow: p.highlight ? '0 0 30px rgba(0, 242, 254, 0.2)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {p.badge && (
              <div style={{ position: 'absolute', top: '-11px', right: '16px', background: 'linear-gradient(135deg, #00f2fe, #4facfe)', color: '#000', fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                {p.badge}
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {p.highlight ? <Zap size={18} color="#00f2fe" /> : <Sparkles size={16} color="#94a3b8" />}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{p.name}</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', minHeight: '36px' }}>{p.desc}</p>
              
              <div style={{ margin: '16px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: p.highlight ? '#00f2fe' : '#fff' }}>${p.price}</span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/ month</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {p.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    <Check size={14} color={p.highlight ? '#00f2fe' : '#05ffa1'} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
              }}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                border: 'none',
                background: p.highlight ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(255,255,255,0.08)',
                color: p.highlight ? '#090d16' : '#fff',
                transition: 'all 0.2s ease'
              }}
            >
              {p.highlight ? 'Select Pro Flow' : 'Select ' + p.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Interactive Kanban Component */
function InteractiveKanban() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Connect Wispr Flow microphone hook', col: 'done', priority: 'High' },
    { id: 2, title: 'Real-time waveform FFT visualizer', col: 'done', priority: 'High' },
    { id: 3, title: 'Speech NLP filler-word stripper', col: 'progress', priority: 'Medium' },
    { id: 4, title: 'Demo video recording rehearsal', col: 'review', priority: 'High' },
    { id: 5, title: 'Push to GitHub & submit form', col: 'backlog', priority: 'Urgent' }
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
    if (nextCol === 'done') {
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      title: newTaskTitle.trim(),
      col: 'backlog',
      priority: 'Medium'
    }]);
    setNewTaskTitle('');
  };

  return (
    <div style={{ padding: '20px', background: '#0a0d14', borderRadius: '16px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Voice Sprint Kanban</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Move tasks or dictate new sprint items</p>
        </div>
        <form onSubmit={addTask} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Dictate or type new task..." 
            value={newTaskTitle} 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            style={{ padding: '7px 12px', background: '#131a29', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', width: '200px' }}
          />
          <button type="submit" style={{ background: '#00f2fe', color: '#000', border: 'none', borderRadius: '8px', padding: '7px 12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
            <Plus size={15} /> Add
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {columns.map(col => {
          const ColIcon = col.icon;
          const colTasks = tasks.filter(t => t.col === col.id);
          return (
            <div key={col.id} style={{ background: '#101522', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ColIcon size={14} color={col.color} />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{col.name}</span>
                </div>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 600 }}>{colTasks.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '120px' }}>
                {colTasks.map(task => (
                  <div key={task.id} style={{ background: '#161c2d', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>{task.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '0.68rem', 
                        padding: '2px 5px', 
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
                          <ArrowRight size={13} />
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
}

/* 3. Interactive Analytics Component */
function InteractiveAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Voice Dictation Speed', value: '164 WPM', delta: '+340% vs typing', icon: Mic, color: '#00f2fe' },
    { label: 'Wispr Flow Accuracy', value: '99.4%', delta: 'Filler words filtered', icon: Award, color: '#05ffa1' },
    { label: 'Dev Hours Saved', value: '14.2 hrs', delta: 'This sprint alone', icon: Clock, color: '#a855f7' },
    { label: 'Voice Prompts Dictated', value: '382', delta: '+28 today', icon: Activity, color: '#ffbe0b' }
  ];

  const chartData = [
    { day: 'Mon', height: '55%' },
    { day: 'Tue', height: '65%' },
    { day: 'Wed', height: '75%' },
    { day: 'Thu', height: '70%' },
    { day: 'Fri', height: '85%' },
    { day: 'Sat', height: '90%' },
    { day: 'Sun', height: '100%' }
  ];

  return (
    <div style={{ padding: '20px', background: '#0a0d14', borderRadius: '16px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#00f2fe" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Wispr Flow Telemetry & Productivity</h2>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Quantifying real-time developer speed improvements through voice</p>
        </div>
        <div style={{ display: 'flex', background: '#101522', borderRadius: '8px', padding: '2px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['24h', '7d', '30d'].map(t => (
            <button 
              key={t}
              onClick={() => setTimeRange(t)}
              style={{
                background: timeRange === t ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'transparent',
                color: timeRange === t ? '#000' : '#94a3b8',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '18px' }}>
        {stats.map((s, idx) => {
          const SIcon = s.icon;
          return (
            <div key={idx} style={{ background: '#101522', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{s.label}</span>
                <div style={{ padding: '5px', borderRadius: '6px', background: s.color + '1a' }}>
                  <SIcon size={14} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '2px' }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: s.color, fontWeight: 600 }}>
                {s.delta}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: '#101522', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', color: '#e2e8f0' }}>Daily Voice Dictation Throughput (WPM)</h4>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '110px', paddingTop: '10px' }}>
          {chartData.map((bar, bIdx) => (
            <div key={bIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
              <div style={{ width: '28px', height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  height: bar.height,
                  background: 'linear-gradient(180deg, #00f2fe, #a855f7)',
                  borderRadius: '4px 4px 1px 1px',
                  boxShadow: '0 0 10px rgba(0, 242, 254, 0.3)',
                  transition: 'height 0.4s ease'
                }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 4. Interactive Audio Memo Player */
function InteractiveAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(42);

  const bars = [15, 30, 45, 80, 60, 40, 90, 100, 75, 50, 65, 85, 95, 70, 40, 60, 80, 55, 35, 65, 90, 85, 45, 60, 30, 20];

  return (
    <div style={{ padding: '20px', background: '#0a0d14', borderRadius: '16px', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#00f2fe', fontWeight: 700, textTransform: 'uppercase' }}>Wispr Audio Clip #04</span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Voice Prompt: Scaffolding Kanban Component</h3>
        </div>
        <span style={{ background: 'rgba(0, 242, 254, 0.12)', color: '#00f2fe', padding: '3px 8px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
          00:14s duration
        </span>
      </div>

      <div style={{ background: '#101522', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '50px', marginBottom: '10px' }}>
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
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'height 0.2s ease, background 0.2s ease'
                }}
              />
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
          <span>00:06s</span>
          <span>00:14s</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
              border: 'none',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(0, 242, 254, 0.4)'
            }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
          </button>
          
          <button 
            onClick={() => setProgress(0)}
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <RotateCcw size={14} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '8px' }}>
            <Volume2 size={14} color="#94a3b8" />
            <input type="range" min="0" max="100" defaultValue="85" style={{ accentColor: '#00f2fe', width: '60px', height: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 1.25, 1.5, 2].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              style={{
                background: speed === s ? '#00f2fe' : 'rgba(255,255,255,0.06)',
                color: speed === s ? '#000' : '#94a3b8',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.72rem',
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
}

export default function ComponentSandbox({ activeTemplateId, onTriggerConfetti }) {
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  const renderActiveComponent = () => {
    switch (activeTemplateId) {
      case 'kanban-board':
        return <InteractiveKanban />;
      case 'analytics-dashboard':
        return <InteractiveAnalytics />;
      case 'audio-player':
        return <InteractiveAudioPlayer />;
      case 'pricing-table':
      default:
        return <InteractivePricing />;
    }
  };

  const getViewportWidth = () => {
    if (viewport === 'mobile') return '390px';
    if (viewport === 'tablet') return '768px';
    return '100%';
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Sandbox Header */}
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
          <Layers size={16} color="#00f2fe" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
            Interactive Voice Component Canvas
          </span>
          <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Live Render</span>
        </div>

        {/* Viewport switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.04)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setViewport('desktop')}
            style={{
              background: viewport === 'desktop' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: viewport === 'desktop' ? '#00f2fe' : '#94a3b8',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Desktop 100%"
          >
            <Monitor size={15} />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            style={{
              background: viewport === 'tablet' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: viewport === 'tablet' ? '#00f2fe' : '#94a3b8',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Tablet 768px"
          >
            <Tablet size={15} />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            style={{
              background: viewport === 'mobile' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: viewport === 'mobile' ? '#00f2fe' : '#94a3b8',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Mobile 390px"
          >
            <Smartphone size={15} />
          </button>
        </div>
      </div>

      {/* Main Viewport Body */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, rgba(16, 21, 34, 0.8), #07090e)'
      }}>
        <div style={{
          width: getViewportWidth(),
          maxWidth: '100%',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: viewport !== 'desktop' ? '20px' : '0',
          border: viewport !== 'desktop' ? '1px solid rgba(0, 242, 254, 0.3)' : 'none',
          boxShadow: viewport !== 'desktop' ? '0 10px 40px rgba(0, 0, 0, 0.8)' : 'none',
          overflow: 'hidden'
        }}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}
