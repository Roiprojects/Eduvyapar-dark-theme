import React, { useState, useEffect, useRef } from 'react';
import SpatialScene from './components/SpatialScene';
import Navigation from './components/Navigation';
import CommandPalette from './components/CommandPalette';
import AdmissionModal from './components/AdmissionModal';

import Chapter00Enter from './components/chapters/Chapter00Enter';
import Chapter01Ecosystem from './components/chapters/Chapter01Ecosystem';
import Chapter02Flow from './components/chapters/Chapter02Flow';
import Chapter03People from './components/chapters/Chapter03People';
import Chapter04Institution from './components/chapters/Chapter04Institution';
import Chapter05Intelligence from './components/chapters/Chapter05Intelligence';
import Chapter06Application from './components/chapters/Chapter06Application';
import Chapter07Network from './components/chapters/Chapter07Network';
import Chapter08Future from './components/chapters/Chapter08Future';

import { CHAPTERS, STUDENTS } from './data/storyData';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aivrm-theme') || 'dark';
  });
  const [activeChapter, setActiveChapter] = useState('00');
  const [activeCountry, setActiveCountry] = useState('india');
  const [studentsList, setStudentsList] = useState(STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(STUDENTS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const audioCtxRef = useRef(null);
  const oscRef = useRef([]);

  // Sync theme with html root attribute and local storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aivrm-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Add new application submission
  const handleAddApplication = (newApplicant) => {
    setStudentsList((prev) => [newApplicant, ...prev]);
    setSelectedStudent(newApplicant);
    setTimeout(() => {
      scrollToChapter('06');
    }, 600);
  };

  // Mouse parallax tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Web Audio API ambient drone synthesizer
  const toggleAudio = () => {
    if (audioEnabled) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setAudioEnabled(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Luxurious ambient pad chords (D minor / F maj9 chord: D, A, C, E, F)
        const freqs = [146.83, 220.0, 261.63, 329.63, 349.23];
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        gainNode.connect(filter);
        filter.connect(ctx.destination);

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq + idx * 0.4, ctx.currentTime);
          osc.connect(gainNode);
          osc.start();
          oscRef.current.push(osc);
        });

        setAudioEnabled(true);
      } catch (err) {
        console.warn('AudioContext not allowed without direct interaction', err);
      }
    }
  };

  // Scroll spy to update activeChapter as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const chap of CHAPTERS) {
        const el = document.getElementById(`chapter-${chap.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(chap.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to chapter
  const scrollToChapter = (chapterId) => {
    setActiveChapter(chapterId);
    const el = document.getElementById(`chapter-${chapterId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextChapter = (currentId) => {
    const nextIdx = CHAPTERS.findIndex((c) => c.id === currentId) + 1;
    if (nextIdx < CHAPTERS.length) {
      scrollToChapter(CHAPTERS[nextIdx].id);
    }
  };

  const handleAuthenticate = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const curIdx = CHAPTERS.findIndex((c) => c.id === activeChapter);
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (curIdx < CHAPTERS.length - 1) {
          e.preventDefault();
          scrollToChapter(CHAPTERS[curIdx + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (curIdx > 0) {
          e.preventDefault();
          scrollToChapter(CHAPTERS[curIdx - 1].id);
        }
      } else if (e.key >= '0' && e.key <= '8') {
        const target = CHAPTERS.find((c) => c.id === `0${e.key}`);
        if (target) {
          e.preventDefault();
          scrollToChapter(target.id);
        }
      } else if (e.key.toLowerCase() === 't') {
        toggleTheme();
      } else if (e.key.toLowerCase() === 'a') {
        setIsAdmissionModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapter]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-space)' }}>
      {/* 3D WebGL Three.js Spatial Scene */}
      <SpatialScene
        activeChapter={activeChapter}
        activeCountry={activeCountry}
        mousePos={mousePos}
        theme={theme}
      />

      {/* Persistent Navigation */}
      <Navigation
        activeChapter={activeChapter}
        onSelectChapter={scrollToChapter}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectChapter={scrollToChapter}
        onSelectStudent={(st) => setSelectedStudent(st)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Admission Application Form Modal */}
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        onSubmitApplication={handleAddApplication}
      />

      {/* 9 Continuous Chapters */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Chapter 00 — Enter */}
        <div id="chapter-00">
          <Chapter00Enter
            isAuthenticated={isAuthenticated}
            onAuthenticate={handleAuthenticate}
            onNextChapter={() => handleNextChapter('00')}
          />
        </div>

        {/* Chapter 01 — Ecosystem */}
        <div id="chapter-01">
          <Chapter01Ecosystem
            activeCountry={activeCountry}
            onSelectCountry={(country) => setActiveCountry(country)}
            onNextChapter={() => handleNextChapter('01')}
          />
        </div>

        {/* Chapter 02 — Flow */}
        <div id="chapter-02">
          <Chapter02Flow
            onNextChapter={() => handleNextChapter('02')}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        </div>

        {/* Chapter 03 — People */}
        <div id="chapter-03">
          <Chapter03People
            selectedStudent={selectedStudent}
            onSelectStudent={(st) => setSelectedStudent(st)}
            onNextChapter={() => handleNextChapter('03')}
          />
        </div>

        {/* Chapter 04 — Institution */}
        <div id="chapter-04">
          <Chapter04Institution
            onNextChapter={() => handleNextChapter('04')}
          />
        </div>

        {/* Chapter 05 — Intelligence */}
        <div id="chapter-05">
          <Chapter05Intelligence
            onNextChapter={() => handleNextChapter('05')}
          />
        </div>

        {/* Chapter 06 — Application */}
        <div id="chapter-06">
          <Chapter06Application
            onNextChapter={() => handleNextChapter('06')}
            students={studentsList}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        </div>

        {/* Chapter 07 — Network */}
        <div id="chapter-07">
          <Chapter07Network
            onNextChapter={() => handleNextChapter('07')}
          />
        </div>

        {/* Chapter 08 — Future */}
        <div id="chapter-08">
          <Chapter08Future
            onRestartStory={() => scrollToChapter('00')}
            onEnterDashboard={() => {
              alert('Redirecting to AIVRM sovereign institutional workspace...');
            }}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        </div>
      </main>

      {/* Responsive Styles helper */}
      <style>{`
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .responsive-ecosystem-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-people-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-dossier-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-intelligence-top {
            grid-template-columns: 1fr !important;
          }
          .responsive-intelligence-bottom {
            grid-template-columns: 1fr !important;
          }
          .flow-nodes-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
          }
          .student-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .global-metrics-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile-only {
            display: flex !important;
          }
          .responsive-dossier-body {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .show-mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
