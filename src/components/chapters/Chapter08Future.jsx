import React from 'react';
import { ArrowRight, RotateCcw, Sparkles, ExternalLink, Compass } from 'lucide-react';

export default function Chapter08Future({ onRestartStory, onEnterDashboard }) {
  return (
    <section
      className="chapter-section"
      style={{
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Subtle Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '32px'
          }}
        >
          <Sparkles size={14} color="var(--accent-warm)" />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.74rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-warm)'
            }}
          >
            08 THE FUTURE • EDUVYAPAR
          </span>
        </div>

        {/* Hero Title Matching Reference Image */}
        <h1
          className="font-serif text-gradient-warm"
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 6.2rem)',
            lineHeight: 1.02,
            fontWeight: 400,
            marginBottom: '24px'
          }}
        >
          Education<br />
          without boundaries.
        </h1>

        <p
          className="font-serif"
          style={{
            fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}
        >
          Shaping A Brighter Tomorrow.
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            margin: '0 auto 40px auto',
            lineHeight: 1.6
          }}
        >
          One Platform. Every Possibility.<br />
          Where students, institutions, and global opportunities converge in an intelligent continuum.
        </p>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={onEnterDashboard}
            className="btn-primary"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              borderRadius: '10px'
            }}
          >
            Continue to Dashboard <ArrowRight size={18} />
          </button>

          <button
            onClick={onRestartStory}
            className="btn-secondary"
            style={{
              padding: '14px 24px',
              fontSize: '0.94rem',
              borderRadius: '10px'
            }}
          >
            <RotateCcw size={16} /> Re-experience Story
          </button>
        </div>

        {/* Philosophy Badge */}
        <div
          style={{
            marginTop: '64px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '24px',
            padding: '12px 24px',
            borderRadius: '12px',
            background: 'rgba(13, 17, 24, 0.7)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-tertiary)'
          }}
        >
          <span>
            <strong style={{ color: 'var(--text-secondary)' }}>LIGHT MODE:</strong> "Shaping Brighter Futures."
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
          <span>
            <strong style={{ color: 'var(--accent-cyan)' }}>DARK MODE:</strong> "Education, Connected."
          </span>
        </div>
      </div>
    </section>
  );
}
