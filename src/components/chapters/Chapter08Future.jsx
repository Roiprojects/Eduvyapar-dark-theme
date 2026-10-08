import React from 'react';
import { ArrowRight, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';

export default function Chapter08Future({ onRestartStory, onEnterDashboard, theme = 'dark', onToggleTheme }) {
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
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
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
            08 THE FUTURE • AIVRM
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

          <button
            onClick={onToggleTheme}
            className="btn-secondary"
            style={{
              padding: '14px 24px',
              fontSize: '0.94rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={16} color="var(--accent-warm)" /> Switch to Light Theme
              </>
            ) : (
              <>
                <Moon size={16} color="var(--accent-primary)" /> Switch to Dark Theme
              </>
            )}
          </button>
        </div>

        {/* Philosophy Badge with Clickable Mode Switch */}
        <div
          onClick={onToggleTheme}
          style={{
            marginTop: '64px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '24px',
            padding: '12px 24px',
            borderRadius: '12px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.82rem',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          title="Click to toggle theme"
        >
          <span style={{ color: theme === 'light' ? 'var(--accent-primary)' : 'inherit', fontWeight: theme === 'light' ? 700 : 400 }}>
            <strong>LIGHT MODE:</strong> "Shaping Brighter Futures."
          </span>
          <span style={{ color: 'var(--border-subtle)' }}>|</span>
          <span style={{ color: theme === 'dark' ? 'var(--accent-cyan)' : 'inherit', fontWeight: theme === 'dark' ? 700 : 400 }}>
            <strong>DARK MODE:</strong> "Education, Connected."
          </span>
        </div>
      </div>
    </section>
  );
}
