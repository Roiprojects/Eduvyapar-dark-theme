import React, { useState } from 'react';
import { FLOW_STEPS, FLOW_METRICS } from '../../data/storyData';
import { Send, FileCheck, Search, CreditCard, CheckCircle2, ArrowRight, ChevronRight, Activity } from 'lucide-react';

const ICON_MAP = {
  Send: Send,
  FileCheck: FileCheck,
  Search: Search,
  CreditCard: CreditCard,
  CheckCircle2: CheckCircle2
};

export default function Chapter02Flow({ onNextChapter }) {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Review in progress by default

  const currentStep = FLOW_STEPS[activeStepIndex];

  return (
    <section className="chapter-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Editorial Heading */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.76rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
              marginBottom: '6px'
            }}
          >
            02 THE FLOW
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <h1
                className="font-serif text-gradient-primary"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                  lineHeight: 1.08,
                  fontWeight: 400
                }}
              >
                From Application to Opportunity
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px' }}>
                A seamless journey for every student.
              </p>
            </div>
            <div
              className="glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: 'var(--accent-cyan)'
              }}
            >
              <Activity size={14} />
              <span>Real-Time Spatial Data Pipeline</span>
            </div>
          </div>
        </div>

        {/* 5 Spatial Stage Nodes Flow Line */}
        <div
          style={{
            position: 'relative',
            margin: '40px 0 50px 0',
            padding: '20px 0'
          }}
        >
          {/* Subtle connecting spline rail behind nodes */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '5%',
              right: '5%',
              height: '2px',
              background: 'linear-gradient(90deg, #685cff, #4c8dff, #6ce7ff, #ddbb7a, #48d597)',
              opacity: 0.35,
              zIndex: 1
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '16px',
              position: 'relative',
              zIndex: 2
            }}
            className="flow-nodes-grid"
          >
            {FLOW_STEPS.map((step, idx) => {
              const Icon = ICON_MAP[step.icon] || Send;
              const isSelected = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className="glass-panel"
                  style={{
                    padding: '20px 16px',
                    cursor: 'pointer',
                    borderRadius: '14px',
                    background: isSelected
                      ? 'rgba(18, 24, 33, 0.95)'
                      : 'rgba(13, 17, 24, 0.65)',
                    border: isSelected
                      ? '1px solid var(--accent-cyan)'
                      : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                    transform: isSelected ? 'translateY(-6px)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  {/* Glowing Node Circle Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isSelected
                        ? 'linear-gradient(135deg, #685cff, #6ce7ff)'
                        : isPassed
                        ? 'rgba(72, 213, 151, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected
                        ? '2px solid #ffffff'
                        : isPassed
                        ? '1px solid var(--accent-success)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                      color: isSelected ? '#ffffff' : isPassed ? 'var(--accent-success)' : 'var(--text-secondary)'
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'monospace',
                      color: 'var(--accent-cyan)',
                      marginBottom: '4px'
                    }}
                  >
                    STAGE 0{step.step}
                  </div>

                  <h3
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}
                  >
                    {step.title}
                  </h3>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {step.count.toLocaleString()} in queue
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detail Dossier & Context */}
        <div
          className="glass-panel-elevated"
          style={{
            padding: '24px 32px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-cyan)'
                }}
              >
                Selected Pipeline Node
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-success)' }}>
                {currentStep.status}
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)' }}>
              {currentStep.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', maxWidth: '650px' }}>
              {currentStep.description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>Current Volume</div>
              <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {currentStep.count.toLocaleString()}
              </div>
            </div>
            <button onClick={onNextChapter} className="btn-primary" style={{ padding: '10px 18px' }}>
              Meet Students <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Metrics Row at Bottom */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px'
          }}
        >
          {FLOW_METRICS.map((m, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '16px',
                borderLeft: `3px solid ${m.color}`
              }}
            >
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                {m.label}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <span>{m.value}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: m.change.startsWith('+') ? 'var(--accent-success)' : 'var(--accent-danger)'
                  }}
                >
                  {m.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
