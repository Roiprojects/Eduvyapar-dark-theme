import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function Chapter00Enter({ onAuthenticate, isAuthenticated, onNextChapter }) {
  const [email, setEmail] = useState('admin@aivrm.edu');
  const [password, setPassword] = useState('AIVRMConnected2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
      if (onAuthenticate) {
        onAuthenticate(email);
      }
      setTimeout(() => {
        onNextChapter();
      }, 700);
    }, 600);
  };

  return (
    <section className="chapter-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(320px, 0.95fr)',
          gap: '64px',
          alignItems: 'center'
        }}
        className="responsive-grid"
      >
        {/* Left Column: Hero Editorial Statement */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '28px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                boxShadow: '0 0 8px var(--accent-cyan)'
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-secondary)'
              }}
            >
              A Global Education Ecosystem • AIVRM
            </span>
          </div>

          <h1
            className="font-serif text-gradient-primary"
            style={{
              fontSize: 'clamp(3.4rem, 6.2vw, 5.8rem)',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              marginBottom: '24px'
            }}
          >
            Education,<br />
            <span style={{ fontStyle: 'italic' }}>Connected.</span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '460px',
              marginBottom: '36px'
            }}
          >
            Institutions. Students. Programs. Opportunities.<br />
            All in one intelligent ecosystem.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
              One Platform. Every Possibility.
            </div>
          </div>
        </div>

        {/* Right Column: Precision Floating Login Object */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div
            className="glass-panel-elevated"
            style={{
              padding: '40px 36px',
              boxShadow: 'var(--shadow-spatial)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Specular edge highlight */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--border-glow), transparent)'
              }}
            />

            <div style={{ marginBottom: '28px' }}>
              <h2
                className="font-serif"
                style={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  marginBottom: '6px'
                }}
              >
                Welcome back.
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Sign in to your AIVRM intelligent workspace
              </p>
            </div>

            {authSuccess ? (
              <div
                style={{
                  padding: '24px',
                  borderRadius: '10px',
                  background: 'rgba(72, 213, 151, 0.1)',
                  border: '1px solid rgba(72, 213, 151, 0.3)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle size={36} color="var(--accent-success)" style={{ margin: '0 auto 12px auto' }} />
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Authenticated Successfully
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Entering AIVRM Global Ecosystem...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                      letterSpacing: '0.02em'
                    }}
                  >
                    Institutional Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                      }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="precision-input"
                      style={{ paddingLeft: '40px' }}
                      placeholder="admin@aivrm.edu"
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    <label
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.02em'
                      }}
                    >
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Password reset link dispatched to authorized institutional email.');
                      }}
                      style={{
                        fontSize: '0.76rem',
                        color: 'var(--accent-cyan)',
                        textDecoration: 'none'
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                      }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="precision-input"
                      style={{ paddingLeft: '40px', paddingRight: '40px' }}
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-tertiary)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: 'var(--accent-primary)', width: '15px', height: '15px' }}
                    />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Remember me</span>
                  </label>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Encrypted TLS 1.3
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '13px',
                    fontSize: '0.94rem',
                    marginTop: '8px'
                  }}
                >
                  {isSubmitting ? (
                    'Connecting...'
                  ) : (
                    <>
                      Enter Workspace <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            )}

            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                Demo credentials pre-filled
              </span>
              <button
                type="button"
                onClick={onNextChapter}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Skip to Story Preview →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
