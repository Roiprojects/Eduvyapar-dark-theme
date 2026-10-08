import React from 'react';
import { CHAPTERS } from '../data/storyData';
import { Search, Volume2, VolumeX, ShieldCheck, Sparkles, Sun, Moon } from 'lucide-react';

export default function Navigation({
  activeChapter,
  onSelectChapter,
  onOpenCommandPalette,
  audioEnabled,
  onToggleAudio,
  isAuthenticated,
  userEmail,
  theme = 'dark',
  onToggleTheme
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
          background: 'var(--header-bg)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
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
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)'
                }}
              >
                AIVRM
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cyan)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: theme === 'dark' ? 'rgba(108, 231, 255, 0.1)' : 'rgba(2, 132, 199, 0.1)',
                  border: '1px solid var(--border-subtle)',
                  fontWeight: 600
                }}
              >
                {theme === 'dark' ? 'Dark Story Mode' : 'Light Mode'}
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
            background: 'var(--bg-glass)',
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: 'var(--accent-primary)',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}
          >
            CHAPTER {activeChapter}
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>•</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Toggle Button (Light/Dark Mode) */}
          <button
            onClick={onToggleTheme}
            style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '6px 12px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 500,
              transition: 'all 0.25s ease'
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={15} color="var(--accent-warm)" />
                <span className="hide-mobile">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={15} color="var(--accent-primary)" />
                <span className="hide-mobile">Dark Mode</span>
              </>
            )}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            style={{
              background: 'var(--bg-glass)',
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
              background: 'var(--bg-glass)',
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
              <span>{userEmail ? userEmail.split('@')[0] : 'AIVRM Active'}</span>
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
                  background: isActive ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
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
                  opacity: isActive ? 1 : 0.55,
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
          background: 'var(--bg-surface-elevated)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '9999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: 'var(--shadow-spatial)'
        }}
      >
        <button
          onClick={onToggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {theme === 'dark' ? <Sun size={14} color="var(--accent-warm)" /> : <Moon size={14} color="var(--accent-primary)" />}
        </button>
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
                background: c.id === activeChapter ? 'var(--accent-cyan)' : 'var(--border-subtle)',
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
