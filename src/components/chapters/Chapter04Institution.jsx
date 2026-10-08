import React, { useState } from 'react';
import { INSTITUTION_METRICS } from '../../data/storyData';
import { Building, Users, BookOpen, Activity, Box, IndianRupee, Award, ArrowRight, Layers, Sparkles } from 'lucide-react';

const ICON_COMPONENTS = {
  Users: Users,
  BookOpen: BookOpen,
  Activity: Activity,
  Box: Box,
  CreditCard: IndianRupee,
  Award: Award
};

export default function Chapter04Institution({ onNextChapter }) {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview, departments, facilities

  const departments = [
    { name: 'Computer Science & AI', students: '3,840', faculty: '74', labs: '18' },
    { name: 'Business Administration', students: '2,920', faculty: '58', labs: '8' },
    { name: 'Mechanical & Robotics', students: '2,140', faculty: '46', labs: '14' },
    { name: 'Design & Digital Media', students: '1,890', faculty: '38', labs: '10' },
    { name: 'Applied Sciences', students: '2,052', faculty: '68', labs: '16' }
  ];

  return (
    <section className="chapter-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '36px',
            gap: '20px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.76rem',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.1em',
                marginBottom: '6px'
              }}
            >
              04 THE INSTITUTION
            </div>
            <h1
              className="font-serif text-gradient-primary"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                lineHeight: 1.08,
                fontWeight: 400
              }}
            >
              A Living Digital Campus
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px' }}>
              A complete ecosystem engineered for modern autonomous education.
            </p>
          </div>

          {/* Department / Overview Tab Controls */}
          <div
            className="glass-panel"
            style={{ display: 'flex', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
          >
            {['overview', 'departments', 'facilities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 16px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Spatial Metric Badges Grid (Matching Reference Screenshot Chapter 04) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}
        >
          {INSTITUTION_METRICS.map((metric, idx) => {
            const Icon = ICON_COMPONENTS[metric.icon] || Building;
            const isSelected = selectedMetric === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedMetric(idx)}
                className="glass-panel"
                style={{
                  padding: '18px 20px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-glass)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{metric.label}</span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                    }}
                  >
                    <Icon size={15} />
                  </div>
                </div>

                <div
                  className="font-display"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginBottom: '4px'
                  }}
                >
                  {metric.value}
                </div>

                <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-tertiary)' }}>
                  {metric.badge}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab View Content */}
        {activeTab === 'departments' ? (
          <div className="glass-panel-elevated" style={{ padding: '24px 32px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Academic Departments Breakdown
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {departments.map((dept, i) => (
                <div key={i} className="glass-panel" style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {dept.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Enrollment</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{dept.students}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Faculty</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{dept.faculty}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Laboratories</span>
                    <strong style={{ color: 'var(--accent-warm)' }}>{dept.labs}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'facilities' ? (
          <div className="glass-panel-elevated" style={{ padding: '24px 32px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Campus Spatial Infrastructure
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '6px' }}>Turing Computing Pavilion</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>High-density GPU clusters and quantum simulation research cluster.</p>
              </div>
              <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent-success)', marginBottom: '6px' }}>Bose Innovation Labs</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Autonomous robotics, telemetry prototyping and cleanroom facilities.</p>
              </div>
              <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent-warm)', marginBottom: '6px' }}>Central Digital Library</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Over 4.2M global academic publications and collaborative study spaces.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Overview Banner */
          <div
            className="glass-panel-elevated"
            style={{
              padding: '28px 36px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Real-Time Campus Telemetry
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                {INSTITUTION_METRICS[selectedMetric].label}: {INSTITUTION_METRICS[selectedMetric].value}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '620px', marginTop: '4px' }}>
                Integrated biometric access, ERP fee disbursement, RFID smart laboratory inventory, and automated faculty scheduling run autonomously.
              </p>
            </div>

            <button onClick={onNextChapter} className="btn-primary" style={{ padding: '12px 24px' }}>
              Intelligence Analytics <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
