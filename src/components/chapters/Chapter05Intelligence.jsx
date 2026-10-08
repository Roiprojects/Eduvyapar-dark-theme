import React, { useState } from 'react';
import { INTELLIGENCE_DATA } from '../../data/storyData';
import { TrendingUp, BarChart3, PieChart, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Chapter05Intelligence({ onNextChapter }) {
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  // SVG chart dimensions for Admissions Overview
  const chartWidth = 520;
  const chartHeight = 180;
  const padding = 30;

  const months = INTELLIGENCE_DATA.monthlyAdmissions;
  const maxApps = Math.max(...months.map((m) => m.applications));

  // Compute points for spline
  const points = months.map((m, i) => {
    const x = padding + (i / (months.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (m.applications / maxApps) * (chartHeight - padding * 2);
    return { x, y, ...m };
  });

  const pathD = points.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  // Revenue chart path
  const revPoints = INTELLIGENCE_DATA.revenueTrend.map((m, i) => {
    const x = 20 + (i / 5) * 240;
    const y = 110 - ((m.value - 25) / 20) * 80;
    return { x, y, ...m };
  });

  const revPath = revPoints.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cpx = prev.x + (curr.x - prev.x) / 2;
    return `${acc} C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

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
            05 INTELLIGENCE
          </div>
          <h1
            className="font-serif text-gradient-primary"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              lineHeight: 1.08,
              fontWeight: 400
            }}
          >
            Turn Data into Decisions
          </h1>
        </div>

        {/* Top 3 Analytical Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(240px, 0.8fr) minmax(280px, 1fr)',
            gap: '20px',
            marginBottom: '20px'
          }}
          className="responsive-intelligence-top"
        >
          {/* 1. Admissions Overview Chart */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Admissions Overview
                </h3>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Monthly applicant conversion trajectory
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(72, 213, 151, 0.1)',
                  color: 'var(--accent-success)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem'
                }}
              >
                <TrendingUp size={12} />
                <span>+18% this month</span>
              </div>
            </div>

            {/* Custom SVG Line & Area Chart */}
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: '160px' }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#685CFF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#685CFF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal guidelines */}
                {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
                  const y = chartHeight - padding - ratio * (chartHeight - padding * 2);
                  return (
                    <line
                      key={i}
                      x1={padding}
                      y1={y}
                      x2={chartWidth - padding}
                      y2={y}
                      stroke="var(--border-subtle)"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Area fill */}
                <path d={areaD} fill="url(#areaGrad)" />

                {/* Main spline path */}
                <path d={pathD} fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" />

                {/* Points */}
                {points.map((pt, i) => (
                  <g key={i} onMouseEnter={() => setHoveredMonth(pt)} onMouseLeave={() => setHoveredMonth(null)}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredMonth?.month === pt.month ? 6 : 4}
                      fill="var(--accent-cyan)"
                      stroke="var(--bg-surface)"
                      strokeWidth="2"
                      style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                    />
                    <text
                      x={pt.x}
                      y={chartHeight - 8}
                      textAnchor="middle"
                      fill="var(--text-tertiary)"
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Tooltip on hover */}
              {hoveredMonth && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--accent-cyan)',
                    color: 'var(--text-primary)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '0.75rem',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <strong style={{ color: 'var(--accent-cyan)' }}>{hoveredMonth.month}</strong>: {hoveredMonth.applications} Apps
                  ({hoveredMonth.approved} Approved)
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#685CFF' }} />
                Applications
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#48D597' }} />
                Approved
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF667A' }} />
                Rejected
              </span>
            </div>
          </div>

          {/* 2. Revenue Trend */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Revenue Trend</div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    margin: '4px 0'
                  }}
                >
                  ₹42.1L
                </div>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-success)', display: 'flex', alignItems: 'center' }}>
                <ArrowUpRight size={14} /> +12.6%
              </span>
            </div>

            <svg viewBox="0 0 280 120" style={{ width: '100%', height: '110px' }}>
              <path d={revPath} fill="none" stroke="#4C8DFF" strokeWidth="2.5" />
              {revPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#6CE7FF" />
              ))}
            </svg>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* 3. Student Distribution Donut */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Student Distribution
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* SVG Donut */}
              <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                <svg viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border-subtle)" strokeWidth="4.5" />
                  {/* Engineering 42% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#685CFF"
                    strokeWidth="4.5"
                    strokeDasharray="42 58"
                    strokeDashoffset="0"
                  />
                  {/* Management 24% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#4C8DFF"
                    strokeWidth="4.5"
                    strokeDasharray="24 76"
                    strokeDashoffset="-42"
                  />
                  {/* Science 18% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#6CE7FF"
                    strokeWidth="4.5"
                    strokeDasharray="18 82"
                    strokeDashoffset="-66"
                  />
                  {/* Arts 10% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#DDBB7A"
                    strokeWidth="4.5"
                    strokeDasharray="10 90"
                    strokeDashoffset="-84"
                  />
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)' }}>12,842</span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Students
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {INTELLIGENCE_DATA.studentDistribution.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.74rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{item.discipline}</span>
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Analytical Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(280px, 1.2fr) minmax(240px, 0.9fr)',
            gap: '20px',
            alignItems: 'stretch'
          }}
          className="responsive-intelligence-bottom"
        >
          {/* Top Courses */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Top Enrolled Programs
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {INTELLIGENCE_DATA.topCourses.map((c, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{c.title}</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{c.enrolled.toLocaleString()}</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${(c.enrolled / 3000) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #685CFF, #6CE7FF)',
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications by Country Mini Heat Matrix */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Applications by Region
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="glass-panel" style={{ padding: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>South Asia</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>8,470</div>
              </div>
              <div className="glass-panel" style={{ padding: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Middle East</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>1,284</div>
              </div>
              <div className="glass-panel" style={{ padding: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>North America</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>642</div>
              </div>
              <div className="glass-panel" style={{ padding: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Europe & UK</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-warm)' }}>526</div>
              </div>
            </div>
          </div>

          {/* Editorial Callout */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ width: '28px', height: '2px', background: 'var(--accent-cyan)', marginBottom: '16px' }} />
              <blockquote
                className="font-serif text-gradient-primary"
                style={{ fontSize: '1.5rem', lineHeight: 1.25, fontWeight: 400, fontStyle: 'italic', marginBottom: '12px' }}
              >
                "Insights that create opportunities."
              </blockquote>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Predictive retention algorithms calculate enrollment risk across 24+ sovereign regions in real-time.
              </p>
            </div>

            <button onClick={onNextChapter} className="btn-primary" style={{ marginTop: '16px', padding: '10px 16px', justifyContent: 'center' }}>
              Inspect Applications <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
