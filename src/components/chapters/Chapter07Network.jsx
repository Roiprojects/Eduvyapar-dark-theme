import React, { useState } from 'react';
import { NETWORK_HUBS, GLOBAL_METRICS } from '../../data/storyData';
import { Globe, ArrowRight, Share2, MapPin, Building, Users } from 'lucide-react';

export default function Chapter07Network({ onNextChapter }) {
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);

  const hubImages = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=500&q=80'
  ];

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
            07 THE NETWORK
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
                From a Student to Global Impact
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px' }}>
                Connecting Student → Department → Institution → City → Country → World.
              </p>
            </div>
            <button onClick={onNextChapter} className="btn-primary" style={{ padding: '10px 18px' }}>
              The Future <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Constellation Hub Cards Grid (Matching reference screenshot panel 07) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          {NETWORK_HUBS.map((hub, idx) => {
            const isSelected = selectedHubIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedHubIndex(idx)}
                className="glass-panel"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ height: '110px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={hubImages[idx % hubImages.length]}
                    alt={hub.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      fontSize: '0.68rem',
                      background: 'rgba(7, 9, 13, 0.85)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    {hub.type}
                  </div>
                </div>

                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {hub.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="var(--accent-warm)" />
                    <span>{hub.city}, {hub.country}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hub Highlight Banner */}
        <div
          className="glass-panel-elevated"
          style={{
            padding: '24px 32px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Active Satellite Link
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
              {NETWORK_HUBS[selectedHubIndex].name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
              Synchronized course syllabi, instant credit transfer accreditation, and mutual researcher access.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>Students in Transit</div>
              <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-warm)' }}>
                {NETWORK_HUBS[selectedHubIndex].students}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(104, 92, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)'
              }}
            >
              <Share2 size={18} />
            </div>
          </div>
        </div>

        {/* Bottom 4 Global Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}
          className="global-metrics-strip"
        >
          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              24+
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Countries</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              120+
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Partner Institutions</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-warm)' }}>
              12,842
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Students</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-success)' }}>
              1,284
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Applications</div>
          </div>
        </div>
      </div>
    </section>
  );
}
