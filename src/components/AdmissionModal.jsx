import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Upload, Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';

export default function AdmissionModal({ isOpen, onClose, onSubmitApplication }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    program: 'B.Tech Computer Science',
    cgpa: '',
    gender: 'Female',
    dob: '2005-06-15',
    statement: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplicant, setSubmittedApplicant] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `ADM-2026-${Math.floor(Math.random() * 800 + 100)}`;
      const newStudent = {
        id: generatedId,
        name: formData.name || 'Applicant',
        program: formData.program,
        status: 'Under Review',
        attendance: '100%',
        feesPaid: '₹45,000 (Token)',
        cgpa: formData.cgpa || '8.8',
        credits: '0 / 160',
        dob: formData.dob,
        gender: formData.gender,
        nationality: formData.country,
        email: formData.email,
        phone: formData.phone || '+91 98000 00000',
        bloodGroup: 'B+',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        statement: formData.statement || 'Excited to contribute to autonomous systems and global research at AIVRM.'
      };

      setSubmittedApplicant(newStudent);
      setIsSubmitting(false);

      if (onSubmitApplication) {
        onSubmitApplication(newStudent);
      }
    }, 800);
  };

  const handleReset = () => {
    setSubmittedApplicant(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: 'India',
      program: 'B.Tech Computer Science',
      cgpa: '',
      gender: 'Female',
      dob: '2005-06-15',
      statement: ''
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        backgroundColor: 'rgba(7, 9, 13, 0.78)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          boxShadow: 'var(--shadow-spatial)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-tertiary)',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {submittedApplicant ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(72, 213, 151, 0.15)',
                color: 'var(--accent-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                border: '1px solid var(--accent-success)'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)' }}>
              Application Successfully Registered
            </div>

            <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '8px 0 12px 0' }}>
              Welcome, {submittedApplicant.name}
            </h2>

            <div
              className="glass-panel"
              style={{
                padding: '16px 24px',
                maxWidth: '420px',
                margin: '0 auto 24px auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Generated Dossier ID</div>
                <div className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {submittedApplicant.id}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Initial Status</div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-warning)',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: 'rgba(241, 184, 75, 0.15)',
                    border: '1px solid var(--accent-warning)'
                  }}
                >
                  Under Review
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 28px auto', lineHeight: 1.5 }}>
              Your profile has entered the AIVRM autonomous review pipeline. Departmental faculty evaluation and credential verification have commenced.
            </p>

            <button onClick={handleReset} className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
              View in Application Dossier <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                <Sparkles size={14} />
                <span>AIVRM Global Admissions Portal</span>
              </div>
              <h2 className="font-serif text-gradient-primary" style={{ fontSize: '2rem', fontWeight: 400 }}>
                Apply for Admission
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
                Join the connected education ecosystem across 24+ global institutions.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Row 1: Full Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devika Krishnan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="precision-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Primary Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="devika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="precision-input"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Country */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 01234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="precision-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Country of Residence
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="precision-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="India">India 🇮🇳</option>
                    <option value="UAE">UAE 🇦🇪</option>
                    <option value="USA">USA 🇺🇸</option>
                    <option value="UK">UK 🇬🇧</option>
                    <option value="Singapore">Singapore 🇸🇬</option>
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="Germany">Germany 🇩🇪</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Program Choice & Prior CGPA */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Academic Program Choice *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="precision-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="B.Tech Computer Science">B.Tech Computer Science & AI</option>
                    <option value="BBA Global Business">BBA Global Business & Management</option>
                    <option value="MBA Finance & Analytics">MBA Finance & Quantitative Analytics</option>
                    <option value="B.Tech AI & Data Science">B.Tech AI & Data Science</option>
                    <option value="M.Tech Robotics">M.Tech Autonomous Robotics</option>
                    <option value="BCA Cloud Computing">BCA Cloud & DevOps Engineering</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Prior Score / CGPA
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9.1 / 92%"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="precision-input"
                  />
                </div>
              </div>

              {/* Row 4: Personal Statement */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                  Personal Statement / Research Motivation
                </label>
                <textarea
                  rows="3"
                  placeholder="Outline your academic goals, research interests, and why you wish to join AIVRM..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="precision-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Security Seal */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.76rem',
                  color: 'var(--text-tertiary)'
                }}
              >
                <ShieldCheck size={16} color="var(--accent-success)" />
                <span>Credentials submitted under autonomous encryption with real-time audit log.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '13px',
                  fontSize: '0.96rem',
                  marginTop: '6px'
                }}
              >
                {isSubmitting ? 'Registering Application...' : 'Submit Application & Enter Pipeline →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
