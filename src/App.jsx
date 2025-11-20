import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  CalendarOff,
  PartyPopper,
  PhoneOff,
  Edit3,
  Smile,
  Frown,
  UserCheck
} from 'lucide-react';
import { SITUATIONS, MODES, generateExcuse } from './data';
import { generateExcuseAI } from './gemini';

function App() {
  const [situation, setSituation] = useState('late');
  const [customInput, setCustomInput] = useState('');
  const [mode, setMode] = useState('humor');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');

    try {
      // Try to use AI first (if env var exists, it will work)
      const label = SITUATIONS.find(s => s.id === situation)?.label || situation;
      const text = await generateExcuseAI(situation === 'custom' ? customInput : label, mode, customInput);
      setResult(text);
    } catch (error) {
      console.log("AI Generation failed, falling back to templates:", error);
      // Fallback to Static Templates
      setTimeout(() => {
        const text = generateExcuse(situation, mode, customInput);
        setResult(text);
        setLoading(false);
      }, 800);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIconForSituation = (id) => {
    switch (id) {
      case 'late': return <Clock size={16} />;
      case 'deadline': return <AlertTriangle size={16} />;
      case 'date': return <CalendarOff size={16} />;
      case 'party': return <PartyPopper size={16} />;
      case 'call': return <PhoneOff size={16} />;
      case 'custom': return <Edit3 size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  const getIconForMode = (id) => {
    switch (id) {
      case 'humor': return <Smile size={18} />;
      case 'desperate': return <Frown size={18} />;
      case 'polite': return <UserCheck size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div className="app-container">
      <h1>Excuse Generator</h1>
      <p className="subtitle">모든 이를 위한 반응형 변명 생성기</p>

      <div className="glass-panel fade-in">
        <section className="input-section">
          <h2>1. 상황 선택 (Situation)</h2>
          <div className="badge-grid">
            {SITUATIONS.map((s) => (
              <button
                key={s.id}
                className={`badge ${situation === s.id ? 'active' : ''}`}
                onClick={() => setSituation(s.id)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {getIconForSituation(s.id)}
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {situation === 'custom' && (
            <div className="custom-input-wrapper fade-in">
              <input
                type="text"
                className="custom-input"
                placeholder="어떤 상황인가요? (예: 헬스장 안 감)"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
            </div>
          )}
        </section>

        <section className="mode-section" style={{ marginTop: '2rem' }}>
          <h2>2. 모드 선택 (Mode)</h2>
          <div className="mode-selector">
            {MODES.map((m) => (
              <button
                key={m.id}
                className={`mode-btn ${mode === m.id ? 'active' : ''}`}
                data-mode={m.id}
                onClick={() => setMode(m.id)}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {getIconForMode(m.id)}
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <div className="loading-spinner"></div>
              Generating...
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Sparkles size={20} />
              변명 생성하기 (Generate)
            </div>
          )}
        </button>
      </div>

      {result && (
        <div className="glass-panel output-card fade-in">
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> Copied!
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Copy size={14} /> Copy
              </span>
            )}
          </button>
          <p>{result}</p>
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '1rem',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            opacity: 0.7
          }}>
            {result.length} / 500자
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
