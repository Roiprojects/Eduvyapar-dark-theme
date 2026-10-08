import React, { useState } from 'react';
import { STUDENTS } from '../../data/storyData';
import { CheckCircle2, Clock, XCircle, ArrowRight, Award, BookOpen, Calendar, IndianRupee } from 'lucide-react';

export default function Chapter03People({ selectedStudent, onSelectStudent, onNextChapter }) {
  const [activeStudentId, setActiveStudentId] = useState(selectedStudent?.id || 'ADM-2026-001');

  const student = STUDENTS.find((s) => s.id === activeStudentId) || STUDENTS[0];

  const handleSelect = (s) => {
    setActiveStudentId(s.id);
    if (onSelectStudent) onSelectStudent(s);
  };

  return (
    <section className="chapter-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.76rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
              marginBottom: '6px'
            }}
          >
            03 PEOPLE
          </div>
          <h1
            className="font-serif text-gradient-primary"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              lineHeight: 1.08,
              fontWeight: 400
            }}
          >
            The Human Core
          </h1>
        </div>

        {/* Main Composition: Featured Student Profile on Left + Editorial Statement on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1.4fr) minmax(300px, 1fr)',
            gap: '40px',
            alignItems: 'center'
          }}
          className="responsive-people-grid"
        >
          {/* Featured Student Card */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: '36px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header: Avatar, Name, Program, Status Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                marginBottom: '32px'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={student.avatar}
                  alt={student.name}
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    right: '-6px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background:
                      student.status === 'Approved'
                        ? 'var(--accent-success)'
                        : student.status === 'Rejected'
                        ? 'var(--accent-danger)'
                        : 'var(--accent-warning)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-surface)'
                  }}
                >
                  {student.status === 'Approved' ? (
                    <CheckCircle2 size={14} color="#000" />
                  ) : student.status === 'Rejected' ? (
                    <XCircle size={14} color="#fff" />
                  ) : (
                    <Clock size={14} color="#000" />
                  )}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h2
                    className="font-serif"
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 400,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1
                    }}
                  >
                    {student.name}
                  </h2>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      background:
                        student.status === 'Approved'
                          ? 'rgba(72, 213, 151, 0.15)'
                          : student.status === 'Rejected'
                          ? 'rgba(255, 102, 122, 0.15)'
                          : 'rgba(241, 184, 75, 0.15)',
                      color:
                        student.status === 'Approved'
                          ? 'var(--accent-success)'
                          : student.status === 'Rejected'
                          ? 'var(--accent-danger)'
                          : 'var(--accent-warning)',
                      border: '1px solid currentColor',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    ● {student.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.98rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
                  {student.program}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  {student.id}
                </div>
              </div>
            </div>

            {/* 4 Essential Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                padding: '20px 0',
                borderTop: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '28px'
              }}
              className="student-metrics-grid"
            >
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Attendance
                </div>
                <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {student.attendance}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Fees Paid
                </div>
                <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-warm)' }}>
                  {student.feesPaid}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  CGPA
                </div>
                <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {student.cgpa}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Credits
                </div>
                <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {student.credits}
                </div>
              </div>
            </div>

            {/* Interactive Student Selector Thumbnails Row */}
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '12px'
                }}
              >
                Select Cohort Profile
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {STUDENTS.map((st) => {
                  const isCurrent = st.id === student.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleSelect(st)}
                      style={{
                        position: 'relative',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                      title={`${st.name} (${st.program})`}
                    >
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: isCurrent
                            ? '2px solid var(--accent-cyan)'
                            : '2px solid rgba(255, 255, 255, 0.1)',
                          boxShadow: isCurrent ? '0 0 12px rgba(108, 231, 255, 0.5)' : 'none',
                          opacity: isCurrent ? 1 : 0.65,
                          transition: 'all 0.2s ease'
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Statement */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '2px',
                background: 'var(--accent-warm)',
                marginBottom: '28px'
              }}
            />

            <blockquote
              className="font-serif text-gradient-warm"
              style={{
                fontSize: 'clamp(2.2rem, 3.4vw, 3.2rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                fontStyle: 'italic',
                marginBottom: '24px'
              }}
            >
              "Students are not data points.<br />
              They're futures."
            </blockquote>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '420px', marginBottom: '32px' }}>
              Every student interaction at AIVRM—from application submission, credit accreditation to fee settlement—is tied to real individual aspirations.
            </p>

            <button
              onClick={onNextChapter}
              className="btn-primary"
              style={{ width: 'fit-content', padding: '12px 22px' }}
            >
              Explore the Institution <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
