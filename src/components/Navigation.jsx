import React from 'react';
import { CHAPTERS } from '../data/storyData';
import { Search, Volume2, VolumeX, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navigation({
  activeChapter,
  onSelectChapter,
  onOpenCommandPalette,
  audioEnabled,
  onToggleAudio,
  isAuthenticated,
  userEmail
}) {
  return (
    <>
      {/* Top Header Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          zIndex: 50,
          background: 'linear-gradient(to bottom, rgba(7, 9, 13, 0.95), rgba(7, 9, 13, 0.4), transparent)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #685cff, #4c8dff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(104, 92, 255, 0.4)'
            }}
          >
            <Sparkles size={18} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)'
                }}
              >
                EduVyapar
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cyan)',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  background: 'rgba(108, 231, 255, 0.1)',
                  border: '1px solid rgba(108, 231, 255, 0.2)'
                }}
              >
                Dark Story Mode
              </span>
            </div>
          </div>
        </div>

        {/* Center: Current Chapter Name Banner */}
        <div
          className="hide-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: 'var(--accent-primary)',
              letterSpacing: '0.05em'
            }}
          >
            CHAPTER {activeChapter}
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text-primary)'
            }}
          >
            {CHAPTERS.find((c) => c.id === activeChapter)?.title || 'Ecosystem'}
          </span>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              transition: 'all 0.2s ease'
            }}
            title="Search anything (Cmd+K)"
          >
            <Search size={14} />
            <span className="hide-mobile">Search (⌘K)</span>
          </button>

          {/* Audio Ambience Toggle */}
          <button
            onClick={onToggleAudio}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: audioEnabled ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem'
            }}
            title={audioEnabled ? 'Mute spatial audio' : 'Enable ambient soundscape'}
          >
            {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="hide-mobile">{audioEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          {/* Authentication Badge */}
          {isAuthenticated ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(72, 213, 151, 0.12)',
                border: '1px solid rgba(72, 213, 151, 0.3)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                color: 'var(--accent-success)'
              }}
            >
              <ShieldCheck size={13} />
              <span>{userEmail ? userEmail.split('@')[0] : 'Workspace Active'}</span>
            </div>
          ) : (
            <button
              onClick={() => onSelectChapter('00')}
              className="btn-secondary"
              style={{ padding: '5px 12px', fontSize: '0.78rem' }}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Left Persistent Story Chapters Navigation (Desktop) */}
      <nav
        style={{
          position: 'fixed',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
        className="hide-mobile"
      >
        {CHAPTERS.map((chap) => {
          const isActive = chap.id === activeChapter;
          return (
            <button
              key={chap.id}
              onClick={() => onSelectChapter(chap.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                padding: '4px 0',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Indicator Dot / Line */}
              <div
                style={{
                  width: isActive ? '20px' : '6px',
                  height: '2px',
                  borderRadius: '1px',
                  background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: isActive ? '0 0 10px rgba(108, 231, 255, 0.8)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Chapter Label */}
              <span
                style={{
                  fontSize: '0.74rem',
                  letterSpacing: '0.04em',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  opacity: isActive ? 1 : 0.45,
                  transition: 'all 0.2s ease'
                }}
              >
                {chap.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Floating Navigation (Mobile & Tablet) */}
      <div
        className="show-mobile-only"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          background: 'rgba(13, 17, 24, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '9999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: 'var(--shadow-spatial)'
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
          {activeChapter}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>
          {CHAPTERS.find((c) => c.id === activeChapter)?.title}
        </span>
        <div style={{ display: 'flex', gap: '4px', marginLeft: '6px' }}>
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectChapter(c.id)}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: c.id === activeChapter ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
