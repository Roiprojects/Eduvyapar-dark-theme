import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, User, Globe, Compass, BarChart2, School, Shield, Sun, Moon } from 'lucide-react';
import { CHAPTERS, STUDENTS } from '../data/storyData';

export default function CommandPalette({ isOpen, onClose, onSelectChapter, onSelectStudent, theme = 'dark', onToggleTheme }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChapters = CHAPTERS.filter(
    (c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.id.includes(query)
  );

  const filteredStudents = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.program.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: theme === 'dark' ? 'rgba(7, 9, 13, 0.75)' : 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel-elevated"
        style={{
          width: '90%',
          maxWidth: '580px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-spatial)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            gap: '12px'
          }}
        >
          <Search size={18} color="var(--text-tertiary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AIVRM chapters, students, theme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px' }}>
          {/* Quick Theme Switch Option */}
          <div
            onClick={() => {
              onToggleTheme();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '12px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {theme === 'dark' ? <Sun size={18} color="var(--accent-warm)" /> : <Moon size={18} color="var(--accent-primary)" />}
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Toggle Theme: Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  {theme === 'dark' ? 'Experience AIVRM in luminous ivory & cobalt' : 'Experience AIVRM in deep celestial space'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              Enter
            </span>
          </div>

          {/* Chapters Section */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-tertiary)',
                padding: '4px 10px',
                fontWeight: 600
              }}
            >
              Story Chapters
            </div>
            {filteredChapters.map((chap) => (
              <div
                key={chap.id}
                onClick={() => {
                  onSelectChapter(chap.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      color: 'var(--accent-cyan)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(108, 231, 255, 0.12)'
                    }}
                  >
                    {chap.id}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{chap.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{chap.subtitle}</div>
                  </div>
                </div>
                <ArrowRight size={14} color="var(--text-tertiary)" />
              </div>
            ))}
          </div>

          {/* Students Section */}
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-tertiary)',
                padding: '4px 10px',
                fontWeight: 600
              }}
            >
              Student Dossiers
            </div>
            {filteredStudents.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  if (onSelectStudent) onSelectStudent(st);
                  onSelectChapter('03');
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={st.avatar}
                    alt={st.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 500 }}>{st.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{st.program}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: st.status === 'Approved' ? 'var(--accent-success)' : 'var(--accent-warning)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)'
                  }}
                >
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)'
          }}
        >
          <span>Use ↑ ↓ to navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
