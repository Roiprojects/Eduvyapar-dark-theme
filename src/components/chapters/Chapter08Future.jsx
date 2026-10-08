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
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 60%, rgba(221, 187, 122, 0.18) 0%, rgba(13, 17, 24, 0.92) 50%, #07090d 95%)',
        color: '#f5f2ea',
        boxShadow: '0 -30px 80px rgba(0, 0, 0, 0.6)',
        borderRadius: '32px 32px 0 0',
        paddingTop: '6rem',
        paddingBottom: '5rem'
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
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(221, 187, 122, 0.3)',
            marginBottom: '32px'
          }}
        >
          <Sparkles size={14} color="#ddbb7a" />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.74rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#ddbb7a'
            }}
          >
            08 THE FUTURE • AIVRM
          </span>
        </div>

        {/* Hero Title */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 6.2rem)',
            lineHeight: 1.02,
            fontWeight: 400,
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #ffffff 30%, #ddbb7a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
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
            color: '#f5f2ea',
            marginBottom: '16px'
          }}
        >
          Shaping A Brighter Tomorrow.
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#9ba3af',
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
              borderRadius: '10px',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
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
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={16} color="#ddbb7a" /> Switch to Light Theme
              </>
            ) : (
              <>
                <Moon size={16} color="#6ce7ff" /> Switch to Dark Theme
              </>
            )}
          </button>
        </div>

        {/* Philosophy Badge */}
        <div
          onClick={onToggleTheme}
          style={{
            marginTop: '64px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '24px',
            padding: '12px 24px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '0.82rem',
            color: '#9ba3af',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          title="Click to toggle theme"
        >
          <span style={{ color: theme === 'light' ? '#6ce7ff' : '#9ba3af', fontWeight: theme === 'light' ? 700 : 400 }}>
            <strong style={{ color: '#ffffff' }}>LIGHT MODE:</strong> "Shaping Brighter Futures."
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
          <span style={{ color: theme === 'dark' ? '#6ce7ff' : '#9ba3af', fontWeight: theme === 'dark' ? 700 : 400 }}>
            <strong style={{ color: '#ffffff' }}>DARK MODE:</strong> "Education, Connected."
          </span>
        </div>
      </div>
    </section>
  );
}
