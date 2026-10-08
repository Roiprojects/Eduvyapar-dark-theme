import React, { useState } from 'react';
import { STUDENTS, APPLICATION_TIMELINE } from '../../data/storyData';
import { Search, CheckCircle2, Clock, XCircle, FileText, ArrowRight, User, Mail, Phone, Calendar, ShieldCheck, Download } from 'lucide-react';

export default function Chapter06Application({ onNextChapter }) {
  const [selectedStudentId, setSelectedStudentId] = useState('ADM-2026-001');
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  const currentStudent = STUDENTS.find((s) => s.id === selectedStudentId) || STUDENTS[0];

  const filteredStudents = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="chapter-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.76rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
              marginBottom: '6px'
            }}
          >
            06 EVERY APPLICATION
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1
                className="font-serif text-gradient-primary"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                  lineHeight: 1.08,
                  fontWeight: 400
                }}
              >
                Every Application, A Story
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px' }}>
                A closer look at what matters.
              </p>
            </div>
            <button onClick={onNextChapter} className="btn-primary" style={{ padding: '10px 18px' }}>
              Global Network <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Master Digital Dossier Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 320px) 1fr',
            gap: '24px',
            alignItems: 'start'
          }}
          className="responsive-dossier-grid"
        >
          {/* Left Column: Applications Search & List */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-tertiary)'
                }}
              />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="precision-input"
                style={{ padding: '8px 12px 8px 32px', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
              {filteredStudents.map((st) => {
                const isSelected = st.id === currentStudent.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStudentId(st.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(104, 92, 255, 0.16)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {st.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{st.program}</div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background:
                          st.status === 'Approved'
                            ? 'rgba(72, 213, 151, 0.15)'
                            : st.status === 'Rejected'
                            ? 'rgba(255, 102, 122, 0.15)'
                            : 'rgba(241, 184, 75, 0.15)',
                        color:
                          st.status === 'Approved'
                            ? 'var(--accent-success)'
                            : st.status === 'Rejected'
                            ? 'var(--accent-danger)'
                            : 'var(--accent-warning)',
                        border: '1px solid currentColor'
                      }}
                    >
                      {st.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Digital Dossier Main Card */}
          <div className="glass-panel-elevated" style={{ padding: '30px' }}>
            {/* Header: Candidate Info & Dossier Tabs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.15)'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)' }}>
                      {currentStudent.name}
                    </h2>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(72, 213, 151, 0.15)',
                        color: 'var(--accent-success)',
                        border: '1px solid var(--accent-success)'
                      }}
                    >
                      {currentStudent.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {currentStudent.id} • {currentStudent.program}
                  </div>
                </div>
              </div>

              {/* Tabs: Overview, Academic, Documents, Payments, Activity */}
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(255, 255, 255, 0.04)', padding: '3px', borderRadius: '8px' }}>
                {['Overview', 'Academic', 'Documents', 'Payments', 'Activity'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                      color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dossier Body: Split Timeline & Student Info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(260px, 1fr) minmax(280px, 1fr)',
                gap: '28px'
              }}
              className="responsive-dossier-body"
            >
              {/* Left Sub-Column: Application Timeline */}
              <div>
                <h3 style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '18px' }}>
                  Application Timeline
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                  {/* Vertical connecting line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      bottom: '12px',
                      left: '8px',
                      width: '2px',
                      background: 'linear-gradient(to bottom, #685CFF, #48D597)',
                      opacity: 0.5
                    }}
                  />

                  {APPLICATION_TIMELINE.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: idx === APPLICATION_TIMELINE.length - 1 ? 'var(--accent-success)' : 'var(--accent-primary)',
                          border: '3px solid var(--bg-surface)',
                          boxShadow: '0 0 8px currentColor',
                          flexShrink: 0
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                          {item.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: '24px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    <ShieldCheck size={16} color="var(--accent-success)" />
                    <span>Cryptographically Signed Record</span>
                  </div>
                  <Download size={14} color="var(--text-tertiary)" style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Right Sub-Column: Student Demographic Profile */}
              <div>
                <h3 style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '18px' }}>
                  Student Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Date of Birth</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{currentStudent.dob}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Gender</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{currentStudent.gender}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Nationality</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{currentStudent.nationality}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Email</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{currentStudent.email}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Phone</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{currentStudent.phone}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Blood Group</span>
                    <strong style={{ color: 'var(--accent-danger)' }}>{currentStudent.bloodGroup}</strong>
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                    Personal Statement
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                    "{currentStudent.statement}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
