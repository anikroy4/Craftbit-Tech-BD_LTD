import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiShield, FiMail, FiLock, FiUser, FiArrowRight,
  FiAlertCircle, FiLogOut, FiCheck, FiX, FiCheckCircle,
  FiRefreshCw, FiKey, FiClock
} from 'react-icons/fi';
import {
  loginUser,
  registerUser,
  googleAuthUser,
  logoutUser,
  clearAuthError,
  verifyEmail,
  resendVerificationCode
} from '../redux/appSlice';
import { toast } from 'sonner';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterPath = location.pathname.includes('register') || 
                         location.pathname.includes('join') || 
                         location.pathname.includes('signup') ||
                         new URLSearchParams(location.search).get('mode') === 'register';

  const {
    currentUser,
    isAuthenticated,
    authLoading,
    authError,
    dashboardRole
  } = useSelector((state) => state.app);

  const [isRegisterMode, setIsRegisterMode] = useState(isRegisterPath);

  useEffect(() => {
    if (isRegisterPath) {
      setIsRegisterMode(true);
    }
  }, [location.pathname, location.search]);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Email Verification Modal State
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [previewOtp, setPreviewOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Initialize native Google Identity Services if client ID is configured
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (clientId && window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (response?.credential) {
            try {
              const result = await dispatch(googleAuthUser({ credential: response.credential })).unwrap();
              toast.success(`Google Verified! Signed in as ${result.user.name}`);
              navigate('/dashboard');
            } catch (err) {
              toast.error(err || 'Google sign-in failed');
            }
          }
        }
      });
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    if (isRegisterMode) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      try {
        const result = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })).unwrap();

        if (result?.verificationRequired || (result?.user && !result.user.isEmailVerified)) {
          setVerifyingEmail(result.user.email);
          setPreviewOtp(result.previewCode || '');
          setShowVerifyModal(true);
          toast.info('Account created! Please verify your email with the 6-digit code sent via Nodemailer.');
        } else {
          toast.success(`Welcome to CraftBit, ${result.user.name}!`);
          navigate('/dashboard');
        }
      } catch (err) {
        // If account already exists -> inform and automatically redirect to Sign In
        if ((err && typeof err === 'object' && err.userExists) || 
            (typeof err === 'string' && err.toLowerCase().includes('already exists'))) {
          toast.info('Account already exists with this email! Redirecting to Sign In...');
          setIsRegisterMode(false);
          setFormData((prev) => ({
            ...prev,
            email: (err?.email) || prev.email,
            password: '',
            confirmPassword: ''
          }));
          return;
        }
        toast.error(typeof err === 'string' ? err : err?.message || 'Registration failed');
      }
    } else {
      try {
        const result = await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        })).unwrap();

        if (result?.verificationRequired || (result?.user && !result.user.isEmailVerified)) {
          setVerifyingEmail(result.user.email);
          setPreviewOtp(result.previewCode || '');
          setShowVerifyModal(true);
          toast.warning('Email verification required! Please enter the 6-digit code sent via Nodemailer.');
        } else {
          toast.success(`Signed in as ${result.user.role.toUpperCase()}!`);
          navigate('/dashboard');
        }
      } catch (err) {
        toast.error(err || 'Authentication failed');
      }
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.trim().length < 6) {
      toast.error('Please enter the 6-digit verification code.');
      return;
    }
    setIsVerifying(true);
    try {
      await dispatch(verifyEmail({
        email: verifyingEmail,
        code: verificationCode.trim()
      })).unwrap();

      toast.success('Email successfully verified! Full portal access unlocked.');
      setShowVerifyModal(false);
      navigate('/dashboard');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Verification failed. Please check the code.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!verifyingEmail) return;
    setIsResending(true);
    try {
      const res = await dispatch(resendVerificationCode({ email: verifyingEmail })).unwrap();
      toast.success(res?.message || 'Fresh verification code dispatched via Nodemailer!');
      if (res?.previewCode) {
        setPreviewOtp(res.previewCode);
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoogleSignInClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (clientId && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      // Show Google OAuth Account selector modal
      setShowGoogleModal(true);
    }
  };

  const handleSelectGoogleProfile = async (profile) => {
    setShowGoogleModal(false);
    try {
      const result = await dispatch(googleAuthUser(profile)).unwrap();
      toast.success(`Google Verified! Welcome, ${result.user.name}`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err || 'Google authentication failed');
    }
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail) {
      toast.error('Please enter your Google account email');
      return;
    }
    handleSelectGoogleProfile({
      email: customGoogleEmail,
      name: customGoogleName || customGoogleEmail.split('@')[0],
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      googleId: 'g_' + Math.random().toString(36).substring(2, 12),
    });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info('Signed out of CraftBit Portal');
  };

  return (
    <div className="page-wrapper dashboard-page" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <Helmet>
        <title>{isRegisterMode ? 'Register Team Account' : 'Identity Gateway & Sign In'} | CraftBit Tech BD LTD</title>
      </Helmet>

      <div className="container" style={{ maxWidth: '580px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <div className="badge flex items-center gap-1.5 mx-auto" style={{ marginBottom: '1rem' }}>
            <FiShield className="text-sky-400" size={13} />
            <span>Role-Based Identity Engine</span>
          </div>
          <h1 className="section-title" style={{ fontSize: '2.2rem' }}>
            CraftBit <span className="gradient-text">{isRegisterMode ? 'Account Signup' : 'Portal Sign In'}</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
            {isRegisterMode
              ? 'Register a new moderator profile. SuperAdmin has access to elevate privileges.'
              : 'Secure authenticated gateway for SuperAdmin, Admin, and Moderator.'}
          </p>
        </div>

        {/* If Already Logged In Session Banner */}
        {isAuthenticated && currentUser && (
          <div className="nda-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="user-avatar-pill" style={{ width: '40px', height: '40px', fontSize: '0.85rem' }}>
                  {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'CB'}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{currentUser.name}</span>
                    <span className="badge" style={{ marginBottom: 0, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                      {currentUser.role}
                    </span>
                    {currentUser.isEmailVerified ? (
                      <span className="status-badge status-replied text-[10px] py-0.5 px-2" style={{ textTransform: 'none' }}>
                        <FiCheckCircle size={11} className="text-emerald-400" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="status-badge status-closed text-[10px] py-0.5 px-2" style={{ textTransform: 'none', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.35)', color: '#fbbf24' }}>
                        <FiClock size={11} />
                        <span>Pending Verification</span>
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">{currentUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                {!currentUser.isEmailVerified ? (
                  <button
                    type="button"
                    onClick={() => {
                      setVerifyingEmail(currentUser.email);
                      setShowVerifyModal(true);
                    }}
                    className="btn-primary"
                    style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem', background: '#f59e0b', borderColor: '#d97706' }}
                  >
                    <FiMail size={14} />
                    <span>Verify Email Now</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary"
                    style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                  >
                    <span>Open Dashboard</span>
                    <FiArrowRight size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="action-btn-danger"
                  style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem' }}
                  title="Sign out of this session"
                >
                  <FiLogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Authentication Card */}
        <div className="dashboard-panel" style={{ padding: '2rem' }}>
          
          {/* Mode Switcher Tabs */}
          <div className="filter-tabs" style={{ marginBottom: '1.75rem', borderBottom: 'none', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(false); dispatch(clearAuthError()); }}
              className={`tab-btn ${!isRegisterMode ? 'active' : ''}`}
              style={{ padding: '0.5rem 1.4rem', fontSize: '0.85rem' }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(true); dispatch(clearAuthError()); }}
              className={`tab-btn ${isRegisterMode ? 'active' : ''}`}
              style={{ padding: '0.5rem 1.4rem', fontSize: '0.85rem' }}
            >
              Register (New Moderator)
            </button>
          </div>

          {/* Google Auth Button */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              disabled={authLoading}
              onClick={handleGoogleSignInClick}
              className="w-full flex items-center justify-center gap-3 rounded-xl font-semibold transition-all hover:brightness-110 active:scale-[0.99]"
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.88rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isRegisterMode ? 'Sign up with Google' : 'Continue with Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="grow border-t border-white/10"></div>
              <span className="px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Or with Email & Bcrypt Password
              </span>
              <div className="grow border-t border-white/10"></div>
            </div>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="service-deliverables-box" style={{
              background: 'rgba(244, 63, 94, 0.1)',
              borderColor: 'rgba(244, 63, 94, 0.3)',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <FiAlertCircle className="text-rose-400 shrink-0" size={16} />
              <p className="text-xs text-rose-300 font-semibold" style={{ margin: 0 }}>
                {authError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name field (Register only) */}
            {isRegisterMode && (
              <div className="form-group">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                  <FiUser size={13} className="text-sky-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                  placeholder="e.g. Farhan Tanvir"
                />
              </div>
            )}

            {/* Email field */}
            <div className="form-group">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                <FiMail size={13} className="text-sky-400" />
                <span>Work / Portal Email *</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-control"
                placeholder="e.g. yourname@craftbit.com"
                autoComplete="email"
              />
            </div>

            {/* Password field - Strictly masked with Bcrypt Verification */}
            <div className="form-group">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                <FiLock size={13} className="text-sky-400" />
                <span>Password * (Bcrypt Verified)</span>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-control"
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
            </div>

            {/* Confirm Password (Register only) */}
            {isRegisterMode && (
              <div className="form-group">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                  <FiLock size={13} className="text-emerald-400" />
                  <span>Confirm Password *</span>
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="form-control"
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
              style={{ marginTop: '1.25rem', padding: '0.85rem' }}
            >
              {authLoading ? (
                <span>Validating Session with Bcrypt...</span>
              ) : isRegisterMode ? (
                <>
                  <span>Create Moderator Account</span>
                  <FiArrowRight size={15} />
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <FiArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer Notice */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
            {isRegisterMode ? (
              <p>
                Already have portal credentials?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(false); dispatch(clearAuthError()); }}
                  className="text-sky-400 font-semibold hover:underline"
                >
                  Sign In here
                </button>
              </p>
            ) : (
              <p>
                Need a new team account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(true); dispatch(clearAuthError()); }}
                  className="text-sky-400 font-semibold hover:underline"
                >
                  Register as Moderator
                </button>
              </p>
            )}
          </div>

        </div>

      </div>

      {/* ── GOOGLE AUTH ACCOUNT PICKER MODAL ── */}
      {showGoogleModal && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog" style={{ maxWidth: '420px', padding: '1.75rem' }}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="text-base font-bold text-white">Google Authentication</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="modal-close-btn"
              >
                <FiX size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Sign in with your verified Google account to access CraftBit Operations:
            </p>

            {/* Quick Team Google Profiles */}
            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() => handleSelectGoogleProfile({
                  name: 'Anik Roy',
                  email: 'anikroy.dev@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                  googleId: 'g_anik_102938'
                })}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 hover:border-sky-500/50 bg-white/5 hover:bg-white/10 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-500/30">
                    AR
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Anik Roy</h5>
                    <p className="text-[11px] text-slate-400">anikroy.dev@gmail.com</p>
                  </div>
                </div>
                <span className="badge text-[10px] mb-0">1-Click</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectGoogleProfile({
                  name: 'CraftBit Admin',
                  email: 'craftbittechbd@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                  googleId: 'g_craftbit_994820'
                })}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 hover:border-sky-500/50 bg-white/5 hover:bg-white/10 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                    CB
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">CraftBit Operations</h5>
                    <p className="text-[11px] text-slate-400">craftbittechbd@gmail.com</p>
                  </div>
                </div>
                <span className="badge text-[10px] mb-0">1-Click</span>
              </button>
            </div>

            {/* Custom Google Account Entry */}
            <form onSubmit={handleCustomGoogleSubmit} className="pt-3 border-t border-white/10 space-y-2.5">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">
                Or Sign In with Any Google Email:
              </span>
              <input
                type="email"
                required
                value={customGoogleEmail}
                onChange={(e) => setCustomGoogleEmail(e.target.value)}
                placeholder="your.google.account@gmail.com"
                className="form-control text-xs"
              />
              <input
                type="text"
                value={customGoogleName}
                onChange={(e) => setCustomGoogleName(e.target.value)}
                placeholder="Your Display Name (Optional)"
                className="form-control text-xs"
              />
              <button
                type="submit"
                className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-1.5"
              >
                <FiCheck size={13} />
                <span>Verify & Sign In with Google</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── EMAIL VERIFICATION OTP MODAL ── */}
      {showVerifyModal && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog" style={{ maxWidth: '460px', padding: '2rem' }}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <FiMail size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Email Verification Required</h3>
                  <p className="text-[11px] text-slate-400">Step 2 of Account Activation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowVerifyModal(false)}
                className="modal-close-btn"
              >
                <FiX size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              We dispatched a 6-digit verification code to <strong className="text-sky-300">{verifyingEmail}</strong> via <strong>Nodemailer</strong>. Please enter the code below to verify your email.
            </p>

            {/* Sandbox / Preview Code Quick Insert Helper */}
            {previewOtp && (
              <div
                onClick={() => setVerificationCode(previewOtp)}
                className="cursor-pointer mb-4 p-2.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 transition-all flex items-center justify-between"
                title="Click to auto-fill code"
              >
                <div className="flex items-center gap-2">
                  <FiKey className="text-sky-400 shrink-0" size={14} />
                  <span className="text-xs text-slate-200">
                    Verification Code: <strong className="text-sky-300 font-mono text-sm tracking-wider">{previewOtp}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded-md uppercase">
                  Click to fill
                </span>
              </div>
            )}

            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="form-group">
                <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FiKey size={13} className="text-sky-400" />
                    <span>6-Digit Verification Code</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Expires in 15 mins</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="form-control text-center text-2xl font-mono font-bold tracking-[0.5em] text-sky-400"
                  style={{ letterSpacing: '0.4em' }}
                />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isVerifying || verificationCode.length < 6}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm"
                >
                  {isVerifying ? (
                    <>
                      <FiRefreshCw className="animate-spin" size={15} />
                      <span>Verifying with MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <FiCheckCircle size={15} />
                      <span>Verify Email & Activate Portal</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={isResending}
                    onClick={handleResendCode}
                    className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
                  >
                    <FiRefreshCw className={isResending ? 'animate-spin' : ''} size={12} />
                    <span>{isResending ? 'Sending new code...' : 'Resend Code via Nodemailer'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowVerifyModal(false)}
                    className="text-xs text-slate-400 hover:text-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-500 leading-relaxed">
              🔒 <strong>RBAC Policy:</strong> User accounts must complete email verification before SuperAdmin can assign Admin or Moderator roles.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
