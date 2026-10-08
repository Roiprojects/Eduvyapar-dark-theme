import React, { useState } from 'react';
import { ArrowRight, Globe2, Building2, Users2, FileText, TrendingUp, Search } from 'lucide-react';
import { GLOBAL_METRICS, COUNTRY_DATA } from '../../data/storyData';

export default function Chapter01Ecosystem({ activeCountry, onSelectCountry, onNextChapter }) {
  const [viewMode, setViewMode] = useState('global'); // 'global' or 'domestic'
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCountries = COUNTRY_DATA.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="chapter-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Header & Search Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '32px'
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
              01 THE ECOSYSTEM
            </div>
            <h1
              className="font-serif text-gradient-primary"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                lineHeight: 1.1,
                fontWeight: 400
              }}
            >
              A Global Education Ecosystem
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', marginTop: '6px' }}>
              Connecting students, institutions and opportunities across the world.
            </p>
          </div>

          {/* Global/Domestic Pills & Location Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="glass-panel"
              style={{ display: 'flex', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
            >
              <button
                onClick={() => setViewMode('global')}
                style={{
                  background: viewMode === 'global' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: viewMode === 'global' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Global View
              </button>
              <button
                onClick={() => setViewMode('domestic')}
                style={{
                  background: viewMode === 'domestic' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: viewMode === 'domestic' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Domestic
              </button>
            </div>

            <div style={{ position: 'relative', width: '180px' }}>
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
                placeholder="Search location..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="precision-input"
                style={{ padding: '6px 10px 6px 30px', fontSize: '0.8rem' }}
              />
            </div>
          </div>
        </div>

        {/* Main Grid: Left Metrics & Details, Center Globe focus, Right Top Application Sources */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 340px) 1fr minmax(260px, 320px)',
            gap: '24px',
            alignItems: 'start'
          }}
          className="responsive-ecosystem-grid"
        >
          {/* Left: 4 Metric Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {GLOBAL_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    {metric.label}
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {metric.value}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    color: 'var(--accent-success)',
                    background: 'rgba(72, 213, 151, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}
                >
                  <TrendingUp size={13} />
                  <span>{metric.change}</span>
                </div>
              </div>
            ))}

            <button
              onClick={onNextChapter}
              className="btn-primary"
              style={{ marginTop: '8px', padding: '12px 18px', justifyContent: 'center' }}
            >
              Explore the Network <ArrowRight size={16} />
            </button>
          </div>

          {/* Center: Contextual Focus Badge overlaid on 3D Globe */}
          <div
            style={{
              height: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: '24px'
            }}
          >
            {/* Active Selected Country Card */}
            <div
              className="glass-panel-elevated"
              style={{
                padding: '16px 24px',
                textAlign: 'center',
                border: '1px solid rgba(108, 231, 255, 0.3)',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Active Telemetry Node
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: '1.8rem',
                  color: 'var(--text-primary)',
                  margin: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>{COUNTRY_DATA.find((c) => c.id === activeCountry)?.flag || '🇮🇳'}</span>
                <span>{COUNTRY_DATA.find((c) => c.id === activeCountry)?.name || 'India'}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {COUNTRY_DATA.find((c) => c.id === activeCountry)?.applications.toLocaleString() || '8,470'}
                </strong>{' '}
                Applications Connected
              </div>
            </div>
          </div>

          {/* Right: Top Application Sources List */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div
              style={{
                fontSize: '0.76rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>Top Application Sources</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Live Data</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredCountries.map((country) => {
                const isSelected = country.id === activeCountry;
                return (
                  <div
                    key={country.id}
                    onClick={() => onSelectCountry(country.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(104, 92, 255, 0.15)' : 'var(--border-subtle)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{country.flag}</span>
                      <span
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: isSelected ? 600 : 400,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {country.name}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span
                        className="font-display"
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)'
                        }}
                      >
                        {country.applications.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Click country to align 3D globe</span>
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
