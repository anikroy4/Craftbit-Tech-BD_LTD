import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {
  FiUsers, FiLayers, FiFolder, FiMail, FiShield,
  FiPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiRefreshCw,
  FiActivity, FiTrendingUp, FiClock, FiLock, FiEye,
  FiDollarSign, FiSearch, FiSliders, FiArrowUpRight,
  FiDatabase, FiCheckCircle, FiAlertCircle, FiTag,
  FiCalendar, FiCpu, FiCompass, FiZap, FiChevronRight,
  FiDownloadCloud, FiHelpCircle, FiGrid, FiUserCheck, FiServer,
  FiLogOut, FiKey
} from 'react-icons/fi';
import {
  fetchDashboardOverview,
  fetchDashboardUsers,
  fetchServices,
  fetchProjects,
  fetchQuotes,
  createService,
  updateService,
  deleteService,
  createProject,
  updateProject,
  deleteProject,
  updateQuoteStatus,
  deleteQuote,
  createDashboardUser,
  updateUserRole,
  deleteDashboardUser,
  setDashboardRole,
  logoutUser,
  superAdminResendVerification,
  verifyEmail,
  resendVerificationCode,
  API_BASE
} from '../redux/appSlice';
import { toast } from 'sonner';

export default function DashboardPage() {
  const dispatch = useDispatch();

  // Redux state
  const {
    dashboardRole,
    dashboardMetrics,
    dashboardUsers,
    services,
    projects,
    quoteRequests,
    dashboardLoading,
    currentUser,
    isAuthenticated,
  } = useSelector((state) => state.app);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'services' | 'projects' | 'quotes' | 'users'
  const [searchTerm, setSearchTerm] = useState('');
  const [quoteFilter, setQuoteFilter] = useState('all');

  // Email Verification modal state for unverified current user
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [previewOtp, setPreviewOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Modals / Form state
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '', category: 'Engineering', desc: '', baseCost: 2000, typicalDuration: '3 - 5 Weeks', features: ''
  });

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', category: 'Web', client: '', desc: '', tech: '', stats: '+100% Performance'
  });

  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '', email: '', role: 'moderator'
  });

  const [inspectQuote, setInspectQuote] = useState(null);
  const [replyQuote, setReplyQuote] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySending, setReplySending] = useState(false);

  const handleSendNodemailerReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error('Please enter a response message');
      return;
    }
    setReplySending(true);
    try {
      const { data } = await axios.post(`${API_BASE}/quotes/${replyQuote._id}/reply`, {
        replyMessage: replyText,
        subject: `CraftBit Tech BD Proposal for ${replyQuote.name}`,
        adminName: currentUser?.name || 'CraftBit Team'
      });
      toast.success(data.message || `Reply dispatched to ${replyQuote.email} via Nodemailer!`);
      setReplyQuote(null);
      setInspectQuote(null);
      setReplyText('');
      dispatch(fetchQuotes());
      dispatch(fetchDashboardOverview());
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to dispatch email reply');
    } finally {
      setReplySending(false);
    }
  };

  // Load backend data on mount
  useEffect(() => {
    if (isAuthenticated && currentUser && ['superadmin', 'admin', 'moderator'].includes(currentUser.role)) {
      dispatch(fetchDashboardOverview());
      dispatch(fetchServices());
      dispatch(fetchProjects());
      dispatch(fetchQuotes());
      dispatch(fetchDashboardUsers());
    }
  }, [dispatch, isAuthenticated, currentUser]);

  // Role permissions
  const isSuperAdmin = dashboardRole === 'superadmin';
  const isAdmin = dashboardRole === 'admin' || isSuperAdmin;
  const isModerator = dashboardRole === 'moderator';

  const canDelete = isSuperAdmin || dashboardRole === 'admin';
  const canManageUsers = isSuperAdmin;
  const canManageQuotes = isAdmin;

  // Handlers for Services
  const handleOpenServiceModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setServiceForm({
        title: service.title,
        category: service.category,
        desc: service.desc,
        baseCost: service.baseCost,
        typicalDuration: service.typicalDuration,
        features: Array.isArray(service.features) ? service.features.join(', ') : ''
      });
    } else {
      setEditingService(null);
      setServiceForm({
        title: '', category: 'Engineering', desc: '', baseCost: 2000, typicalDuration: '3 - 5 Weeks', features: ''
      });
    }
    setShowServiceModal(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await dispatch(updateService({
          id: editingService._id || editingService.id,
          data: serviceForm
        })).unwrap();
        toast.success('Service updated in MongoDB Atlas');
      } else {
        await dispatch(createService(serviceForm)).unwrap();
        toast.success('New service committed to MongoDB');
      }
      setShowServiceModal(false);
      dispatch(fetchDashboardOverview());
    } catch (err) {
      toast.error(err || 'Failed to save service');
    }
  };

  const handleDeleteService = async (id) => {
    if (!canDelete) {
      toast.error('Editors do not have deletion permissions');
      return;
    }
    if (confirm('Are you sure you want to permanently delete this service from MongoDB?')) {
      try {
        await dispatch(deleteService(id)).unwrap();
        toast.success('Service deleted from database');
        dispatch(fetchDashboardOverview());
      } catch (err) {
        toast.error(err || 'Failed to delete service');
      }
    }
  };

  // Handlers for Projects
  const handleOpenProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        category: project.category,
        client: project.client || '',
        desc: project.desc,
        tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
        stats: project.stats || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '', category: 'Web', client: '', desc: '', tech: 'React 19, Node.js, MongoDB, Redis', stats: '+100% Speed'
      });
    }
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await dispatch(updateProject({
          id: editingProject._id || editingProject.id,
          data: projectForm
        })).unwrap();
        toast.success('Project updated in MongoDB');
      } else {
        await dispatch(createProject(projectForm)).unwrap();
        toast.success('Project added to portfolio collection');
      }
      setShowProjectModal(false);
      dispatch(fetchDashboardOverview());
    } catch (err) {
      toast.error(err || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!canDelete) {
      toast.error('Editors do not have deletion permissions');
      return;
    }
    if (confirm('Permanently delete this project from MongoDB?')) {
      try {
        await dispatch(deleteProject(id)).unwrap();
        toast.success('Project removed from database');
        dispatch(fetchDashboardOverview());
      } catch (err) {
        toast.error(err || 'Failed to delete project');
      }
    }
  };

  // Quotes handlers
  const handleQuoteStatusChange = async (id, status) => {
    if (!canManageQuotes) {
      toast.error('Editors have read-only access to inquiries');
      return;
    }
    try {
      await dispatch(updateQuoteStatus({ id, status })).unwrap();
      toast.success(`Inquiry marked as ${status.toUpperCase()}`);
      dispatch(fetchDashboardOverview());
      if (inspectQuote && inspectQuote._id === id) {
        setInspectQuote({ ...inspectQuote, status });
      }
    } catch (err) {
      toast.error(err || 'Failed to update quote status');
    }
  };

  const handleDeleteQuote = async (id) => {
    if (!canDelete) {
      toast.error('Only Admins and Superadmins can delete inquiries');
      return;
    }
    if (confirm('Permanently delete this customer inquiry?')) {
      try {
        await dispatch(deleteQuote(id)).unwrap();
        toast.success('Inquiry deleted');
        dispatch(fetchDashboardOverview());
        if (inspectQuote && inspectQuote._id === id) {
          setInspectQuote(null);
        }
      } catch (err) {
        toast.error(err || 'Failed to delete quote');
      }
    }
  };

  // User management (Only SuperAdmin can make Admin and Moderator; Admin can promote Moderator to Admin)
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      toast.error('Only SuperAdmin has access to create new team accounts.');
      return;
    }
    try {
      const res = await dispatch(createDashboardUser(userForm)).unwrap();
      toast.success(`Team member created! Verification code dispatched to ${userForm.email} via Nodemailer.`);
      setShowUserModal(false);
      setUserForm({ name: '', email: '', role: 'moderator' });
      dispatch(fetchDashboardOverview());
      dispatch(fetchDashboardUsers());
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Failed to create user');
    }
  };

  const handleChangeUserRole = async (id, role) => {
    const targetUser = dashboardUsers.find((u) => u._id === id);
    if (targetUser && !targetUser.isEmailVerified) {
      toast.error(`Action Blocked: ${targetUser.name} has not verified their email yet. Verification is required before SuperAdmin can assign roles.`);
      return;
    }
    if (isModerator) {
      toast.error('Moderators do not have RBAC permissions.');
      return;
    }
    if (isAdmin && !isSuperAdmin && role === 'superadmin') {
      toast.error('Only SuperAdmin can grant the SuperAdmin role.');
      return;
    }
    try {
      await dispatch(updateUserRole({ id, role })).unwrap();
      toast.success(`User role updated to: ${role.toUpperCase()}`);
      dispatch(fetchDashboardOverview());
      dispatch(fetchDashboardUsers());
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Failed to change role');
    }
  };

  const handleResendUserVerification = async (id, email) => {
    try {
      const res = await dispatch(superAdminResendVerification(id)).unwrap();
      toast.success(res?.message || `Verification code resent to ${email} via Nodemailer!`);
      dispatch(fetchDashboardUsers());
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Failed to resend verification');
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
        email: verifyingEmail || currentUser?.email,
        code: verificationCode.trim()
      })).unwrap();

      toast.success('Email successfully verified! All dashboard permissions activated.');
      setShowVerifyModal(false);
      dispatch(fetchDashboardUsers());
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Verification failed. Please check the code.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    const emailToResend = verifyingEmail || currentUser?.email;
    if (!emailToResend) return;
    setIsResending(true);
    try {
      const res = await dispatch(resendVerificationCode({ email: emailToResend })).unwrap();
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

  const handleDeleteUser = async (id) => {
    if (!isSuperAdmin) {
      toast.error('Only SuperAdmin can remove team members.');
      return;
    }
    if (confirm('Permanently remove this team member from MongoDB?')) {
      try {
        await dispatch(deleteDashboardUser(id)).unwrap();
        toast.success('Team member removed');
        dispatch(fetchDashboardOverview());
        dispatch(fetchDashboardUsers());
      } catch (err) {
        toast.error(err || 'Failed to delete user');
      }
    }
  };

  const refreshAll = () => {
    dispatch(fetchDashboardOverview());
    dispatch(fetchServices());
    dispatch(fetchProjects());
    dispatch(fetchQuotes());
    dispatch(fetchDashboardUsers());
    toast.success('Live sync with MongoDB Atlas complete');
  };

  // Filtered lists
  const filteredServices = services.filter((s) =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.desc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuotes = quoteRequests.filter((q) => {
    const matchesSearch =
      q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = quoteFilter === 'all' || q.status === quoteFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-wrapper dashboard-page">
      <Helmet>
        <title>Control Center Dashboard | CraftBit Tech BD LTD</title>
      </Helmet>

      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="container">

          {/* ════════════════════════════════════════════════════════════════════
              PIXEL-PERFECT HERO HEADER (Matches website style guide)
          ════════════════════════════════════════════════════════════════════ */}
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <div className="badge flex items-center gap-1.5 mx-auto" style={{ marginBottom: '1rem' }}>
              <FiServer className="text-sky-400" size={13} />
              <span>MongoDB Atlas & Express Control Engine</span>
            </div>
            <h1 className="section-title">
              CraftBit <span className="gradient-text">Operations Center</span>
            </h1>
            <p className="section-subtitle">
              Role-Based Access Control: Real-time Mongoose data synchronization across SuperAdmin, Admin, and Moderator.
            </p>
          </div>

          {/* Role Privilege Notice (Styled exactly like website .nda-card) */}
          <div className="nda-card" style={{ marginBottom: '2.5rem', padding: '1.25rem 1.5rem' }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2.5">
                <FiShield className="text-sky-400 shrink-0" size={18} />
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed" style={{ margin: 0 }}>
                  <strong className="text-sky-400 uppercase tracking-wider font-bold">
                    {dashboardRole} Privileges:
                  </strong>{' '}
                  {isSuperAdmin
                    ? 'Full unrestricted administrative control. Create, update, and delete services/projects, triage customer quotes, register new accounts, and assign SuperAdmin, Admin, or Moderator roles.'
                    : isAdmin
                    ? 'Operational administrative access. Manage catalog services, portfolio projects, triage customer quotes, and promote Moderators to Admin. Registering accounts and SuperAdmin role assignment are exclusively reserved for SuperAdmin.'
                    : 'Moderator contributor access. View live data collections, draft and update service and portfolio content. User RBAC mutations and customer inquiry triage are disabled.'}
                </p>
              </div>
              <span className="badge" style={{ marginBottom: 0, textTransform: 'uppercase', fontSize: '0.72rem' }}>
                {dashboardRole}
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              NAVIGATION TABS & SEARCH (Uses website .filter-tabs / .tab-btn)
          ════════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ marginBottom: '2.5rem' }}>
            <div className="filter-tabs" style={{ marginBottom: 0, justifyContent: 'flex-start' }}>
              {[
                { id: 'overview', label: 'System Overview', icon: FiTrendingUp },
                { id: 'services', label: `Services (${services.length})`, icon: FiLayers },
                { id: 'projects', label: `Projects (${projects.length})`, icon: FiFolder },
                { id: 'quotes', label: `Client Inquiries (${quoteRequests.length})`, icon: FiMail },
                ...((isSuperAdmin || isAdmin) ? [{ id: 'users', label: `Team RBAC (${dashboardUsers.length})`, icon: FiUsers }] : []),
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn flex items-center gap-2 ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick search input & Sync */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={refreshAll}
                className="btn-secondary flex items-center gap-1.5"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', height: '38px' }}
                title="Resync with MongoDB Atlas"
              >
                <FiRefreshCw size={12} className={dashboardLoading ? 'animate-spin text-sky-400' : ''} />
                <span>Sync</span>
              </button>

              {activeTab !== 'overview' && (
                <div className="dashboard-search-wrap">
                  <FiSearch className="dashboard-search-icon" size={14} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search ${activeTab}...`}
                    className="form-control dashboard-search-input"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="dashboard-search-clear"
                      title="Clear search"
                    >
                      <FiX size={13} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Email Verification Required Banner */}
          {currentUser && !currentUser.isEmailVerified && (
            <div className="service-deliverables-box mb-6" style={{
              background: 'rgba(245, 158, 11, 0.1)',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              padding: '1.15rem 1.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <FiAlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Email Verification Required</span>
                    <span className="badge text-[10px] mb-0" style={{ background: '#f59e0b', color: '#000', borderColor: '#d97706', fontWeight: 800 }}>
                      Pending Email
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Your portal email (<strong className="text-amber-300">{currentUser.email}</strong>) is not verified. You must verify your email before SuperAdmin or Admin can assign roles or promote you.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setVerifyingEmail(currentUser.email);
                    setShowVerifyModal(true);
                  }}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.82rem', background: '#f59e0b', borderColor: '#d97706' }}
                >
                  <FiMail size={14} />
                  <span>Enter Verification Code</span>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 1: SYSTEM OVERVIEW
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Stat Cards Grid (Uses website .info-card style) */}
              <div className="dashboard-stats-grid">
                
                {/* Services Card */}
                <div className="info-card">
                  <div className="info-icon">
                    <FiLayers size={22} className="shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="info-card-title text-sm uppercase tracking-wider text-slate-400">Services in Catalog</h4>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {dashboardMetrics?.counts?.services ?? services.length}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-white/5">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <FiCheck size={11} /> MongoDB Live
                      </span>
                      <button onClick={() => setActiveTab('services')} className="text-sky-400 hover:underline flex items-center gap-0.5">
                        <span>View</span> <FiChevronRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Projects Card */}
                <div className="info-card">
                  <div className="info-icon" style={{ color: '#a855f7', background: 'rgba(168, 85, 247, 0.12)', borderColor: 'rgba(168, 85, 247, 0.25)' }}>
                    <FiFolder size={22} className="shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="info-card-title text-sm uppercase tracking-wider text-slate-400">Portfolio Projects</h4>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {dashboardMetrics?.counts?.projects ?? projects.length}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-white/5">
                      <span className="text-purple-400 font-semibold flex items-center gap-1">
                        <FiArrowUpRight size={11} /> Showcased
                      </span>
                      <button onClick={() => setActiveTab('projects')} className="text-purple-400 hover:underline flex items-center gap-0.5">
                        <span>Inspect</span> <FiChevronRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inquiries Card */}
                <div className="info-card">
                  <div className="info-icon" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                    <FiMail size={22} className="shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="info-card-title text-sm uppercase tracking-wider text-slate-400">Client Inquiries</h4>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {dashboardMetrics?.counts?.quotes ?? quoteRequests.length}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-white/5">
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <FiClock size={11} /> {dashboardMetrics?.quotesStatus?.new ?? 0} Pending
                      </span>
                      <button onClick={() => setActiveTab('quotes')} className="text-emerald-400 hover:underline flex items-center gap-0.5">
                        <span>Triage</span> <FiChevronRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Team Users Card */}
                <div className="info-card">
                  <div className="info-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
                    <FiUsers size={22} className="shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="info-card-title text-sm uppercase tracking-wider text-slate-400">Team Operators</h4>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {dashboardMetrics?.counts?.users ?? dashboardUsers.length}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-white/5">
                      <span className="text-sky-400 font-semibold flex items-center gap-1">
                        <FiShield size={11} /> RBAC
                      </span>
                      {(isSuperAdmin || isAdmin) ? (
                        <button onClick={() => setActiveTab('users')} className="text-amber-400 hover:underline flex items-center gap-0.5">
                          <span>{isSuperAdmin ? 'Manage' : 'Promote'}</span> <FiChevronRight size={11} />
                        </button>
                      ) : (
                        <span className="text-slate-500 italic">Protected</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Inquiry Triage Quick Panel (Styled like website .service-deliverables-box) */}
              <div className="dashboard-panel">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiMail size={18} className="text-sky-400 shrink-0" />
                      <span>Recent Client Inquiries (MongoDB Atlas Live Feed)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Submissions from the public website contact form stream directly here.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1.1rem', fontSize: '0.8rem' }}
                  >
                    <span>View All Inquiries</span>
                    <FiArrowUpRight size={13} />
                  </button>
                </div>

                <div className="dashboard-table-wrap">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Prospective Client</th>
                        <th>Service Requested</th>
                        <th>Budget Estimate</th>
                        <th>Status</th>
                        <th className="text-right">Triage Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quoteRequests.slice(0, 5).map((quote) => (
                        <tr key={quote._id}>
                          <td>
                            <p className="font-bold text-white">{quote.name}</p>
                            <a href={`mailto:${quote.email}`} className="text-xs text-sky-400 hover:underline">
                              {quote.email}
                            </a>
                          </td>
                          <td className="font-medium text-slate-200">
                            {quote.service || 'Custom Requirement'}
                          </td>
                          <td>
                            <span className="text-emerald-400 font-semibold">
                              {quote.budget || 'Flexible'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge status-${quote.status}`}>
                              <span className="status-dot"></span>
                              <span>{quote.status}</span>
                            </span>
                          </td>
                          <td className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setInspectQuote(quote)}
                                className="action-btn"
                              >
                                <FiEye size={13} />
                                <span>Inspect</span>
                              </button>
                              {canManageQuotes && (
                                <select
                                  value={quote.status}
                                  onChange={(e) => handleQuoteStatusChange(quote._id, e.target.value)}
                                  className="form-select-sm"
                                >
                                  <option value="new">New</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="replied">Replied</option>
                                  <option value="closed">Closed</option>
                                </select>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {quoteRequests.length === 0 && (
                        <tr>
                          <td colSpan={5} className="empty-table-cell">
                            No inquiries recorded in MongoDB yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 2: SERVICES (MongoDB Services Collection)
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiLayers className="text-sky-400" size={20} />
                    <span>Active Services Catalog ({filteredServices.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modifying items here immediately updates the public website <code className="text-sky-400">/services</code> page.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenServiceModal()}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                >
                  <FiPlus size={16} />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Service Cards Grid (Uses website .service-card exact layout) */}
              <div className="services-grid">
                {filteredServices.map((service) => (
                  <div key={service._id || service.id} className="service-card">
                    <div className="flex justify-between items-start mb-3">
                      <span className="badge" style={{ marginBottom: 0 }}>
                        {service.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        From ${service.baseCost?.toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 grow">{service.desc}</p>

                    <div className="service-meta-strip" style={{ marginBottom: '1rem' }}>
                      <div className="service-meta-item">
                        <span className="service-meta-label">Est. Timeline</span>
                        <span className="service-meta-value service-meta-duration">
                          <FiClock size={12} className="shrink-0" />
                          <span>{service.typicalDuration}</span>
                        </span>
                      </div>
                      <div className="service-meta-item">
                        <span className="service-meta-label">Base Cost</span>
                        <span className="service-meta-value service-meta-price">
                          <FiDollarSign size={12} className="shrink-0" />
                          <span>${service.baseCost} USD</span>
                        </span>
                      </div>
                    </div>

                    {/* Features Preview */}
                    {Array.isArray(service.features) && service.features.length > 0 && (
                      <div className="service-deliverables-box" style={{ padding: '0.85rem 1rem', marginBottom: '1rem' }}>
                        <ul className="service-features" style={{ borderTop: 'none', paddingTop: 0, gap: '0.4rem' }}>
                          {service.features.slice(0, 3).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                              <FiCheckCircle className="text-sky-400 shrink-0" size={13} />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleOpenServiceModal(service)}
                        className="action-btn"
                        title="Edit Service"
                      >
                        <FiEdit2 size={12} />
                        <span>Edit</span>
                      </button>

                      {canDelete ? (
                        <button
                          onClick={() => handleDeleteService(service._id || service.id)}
                          className="action-btn-danger"
                          title="Delete Service (Admin/SuperAdmin)"
                        >
                          <FiTrash2 size={12} />
                          <span>Delete</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic px-2">No delete permission</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 3: PROJECTS (MongoDB Projects Collection)
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiFolder className="text-purple-400" size={20} />
                    <span>Portfolio Projects Collection ({filteredProjects.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modifying items here immediately updates the public website <code className="text-purple-400">/portfolio</code> page.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenProjectModal()}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                >
                  <FiPlus size={16} />
                  <span>Add Portfolio Project</span>
                </button>
              </div>

              {/* Project Cards Grid (Uses website .project-card layout) */}
              <div className="portfolio-grid">
                {filteredProjects.map((project) => (
                  <div key={project._id || project.id} className="project-card">
                    {project.image && (
                      <div className="project-thumb">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="project-thumb-img"
                          loading="lazy"
                        />
                        <div className="project-thumb-overlay" />
                        <span className="project-category-badge">{project.category}</span>
                      </div>
                    )}

                    <div className="project-info" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs text-sky-400 font-semibold">{project.client}</span>
                          <span className="text-xs text-emerald-400 font-bold">{project.stats}</span>
                        </div>

                        <h3 className="project-title text-lg font-bold text-white mb-2">{project.title}</h3>
                        <p className="project-desc text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{project.desc}</p>

                        <div className="project-tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                          {(Array.isArray(project.tech) ? project.tech : []).map((t, idx) => (
                            <span key={idx} className="tech-tag" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleOpenProjectModal(project)}
                          className="action-btn"
                          title="Edit Project"
                        >
                          <FiEdit2 size={12} />
                          <span>Edit</span>
                        </button>

                        {canDelete ? (
                          <button
                            onClick={() => handleDeleteProject(project._id || project.id)}
                            className="action-btn-danger"
                            title="Delete Project (Admin/SuperAdmin)"
                          >
                            <FiTrash2 size={12} />
                            <span>Delete</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic px-2">No delete permission</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 4: CLIENT INQUIRIES (Quotes Collection)
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'quotes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiMail className="text-emerald-400" size={20} />
                    <span>Client Inquiries & Project Briefs ({filteredQuotes.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live stream from MongoDB `QuoteRequest` collection submitted via the contact form.
                  </p>
                </div>

                {/* Status Filter Tabs */}
                <div className="quote-filter-bar">
                  {['all', 'new', 'reviewed', 'replied', 'closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setQuoteFilter(st)}
                      className={`quote-filter-btn ${quoteFilter === st ? 'active' : ''}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dashboard-panel">
                <div className="dashboard-table-wrap">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Contact</th>
                        <th>Service & Budget</th>
                        <th>Message / Scope</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map((quote) => (
                        <tr key={quote._id}>
                          <td className="align-top">
                            <p className="font-bold text-white">{quote.name}</p>
                            <a href={`mailto:${quote.email}`} className="text-xs text-sky-400 hover:underline block mt-0.5">
                              {quote.email}
                            </a>
                            <span className="text-[11px] text-slate-500 mt-1 block">
                              {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                            </span>
                          </td>
                          <td className="align-top">
                            <p className="font-semibold text-slate-200">{quote.service || 'Custom Brief'}</p>
                            <p className="text-xs text-emerald-400 font-bold mt-1">
                              {quote.budget || 'Open Budget'}
                            </p>
                          </td>
                          <td className="align-top max-w-sm">
                            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                              {quote.message}
                            </p>
                          </td>
                          <td className="align-top">
                            {canManageQuotes ? (
                              <select
                                value={quote.status}
                                onChange={(e) => handleQuoteStatusChange(quote._id, e.target.value)}
                                className="form-select-sm"
                              >
                                <option value="new">🟡 New</option>
                                <option value="reviewed">🟠 Reviewed</option>
                                <option value="replied">🟢 Replied</option>
                                <option value="closed">⚪ Closed</option>
                              </select>
                            ) : (
                              <span className={`status-badge status-${quote.status}`}>
                                <span className="status-dot"></span>
                                <span>{quote.status}</span>
                              </span>
                            )}
                          </td>
                          <td className="align-top text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setInspectQuote(quote)}
                                className="action-btn"
                              >
                                <FiEye size={13} />
                                <span>Inspect</span>
                              </button>
                              {canDelete && (
                                <button
                                  onClick={() => handleDeleteQuote(quote._id)}
                                  className="action-btn-danger"
                                  title="Delete inquiry"
                                >
                                  <FiTrash2 size={13} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredQuotes.length === 0 && (
                        <tr>
                          <td colSpan={5} className="empty-table-cell">
                            No inquiries match your current filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 5: USERS & ROLES (SuperAdmin Only)
          ════════════════════════════════════════════════════════════════════ */}
          {/* ════════════════════════════════════════════════════════════════════
              TAB 5: USERS & ROLES (SuperAdmin & Admin Access)
              - Only SuperAdmin can create new accounts and make Admin & Moderator
              - Admin has the power to give Moderator to Admin
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'users' && (isSuperAdmin || isAdmin) && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiShield className={isSuperAdmin ? "text-amber-400" : "text-sky-400"} size={20} />
                    <span>Team & Role-Based Access Control (RBAC)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isSuperAdmin
                      ? 'Stored in MongoDB `craftbit.users`. Only SuperAdmin can create accounts and assign SuperAdmin, Admin, or Moderator.'
                      : 'Stored in MongoDB `craftbit.users`. As Admin, you have the authority to promote Moderators to Admin.'}
                  </p>
                </div>
                {isSuperAdmin ? (
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="btn-primary"
                    style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                  >
                    <FiPlus size={16} />
                    <span>Add Team Member</span>
                  </button>
                ) : (
                  <span className="status-pill flex items-center gap-2">
                    <FiShield className="text-sky-400" size={13} />
                    <span>Admin Mode: Can Promote Moderators to Admin</span>
                  </span>
                )}
              </div>

              <div className="dashboard-panel">
                <div className="dashboard-table-wrap">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Member Name</th>
                        <th>Email</th>
                        <th>Email Verification</th>
                        <th>Role / Permissions</th>
                        <th>Account Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardUsers.map((u) => {
                        const isTargetSuperAdmin = u.role === 'superadmin';
                        const isTargetModerator = u.role === 'moderator';
                        const isVerified = Boolean(u.isEmailVerified);

                        return (
                          <tr key={u._id}>
                            <td className="font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div className="user-avatar-pill">
                                  {u.name.slice(0, 2).toUpperCase()}
                                </div>
                                <span>{u.name}</span>
                              </div>
                            </td>
                            <td className="text-slate-300">{u.email}</td>
                            <td>
                              {isVerified ? (
                                <span className="status-badge status-replied flex items-center gap-1.5 w-fit">
                                  <FiCheckCircle size={12} className="text-emerald-400" />
                                  <span>Verified</span>
                                </span>
                              ) : (
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="status-badge status-closed flex items-center gap-1.5" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.35)', color: '#fbbf24' }}>
                                    <FiClock size={12} />
                                    <span>Pending Email</span>
                                  </span>
                                  {isSuperAdmin && (
                                    <button
                                      type="button"
                                      onClick={() => handleResendUserVerification(u._id, u.email)}
                                      className="action-btn text-[11px] py-1 px-2"
                                      title="Resend 6-digit verification code via Nodemailer"
                                    >
                                      <FiRefreshCw size={11} />
                                      <span>Resend Code</span>
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                            <td>
                              {!isVerified ? (
                                <div className="space-y-1">
                                  <select
                                    disabled
                                    value={u.role}
                                    className="form-select-sm capitalize opacity-60 cursor-not-allowed"
                                    title="User must verify their email before SuperAdmin can assign roles"
                                  >
                                    <option value={u.role}>🔒 {u.role}</option>
                                  </select>
                                  <p className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                                    <FiAlertCircle size={10} />
                                    <span>User must verify email first</span>
                                  </p>
                                </div>
                              ) : isSuperAdmin ? (
                                <select
                                  value={u.role}
                                  onChange={(e) => handleChangeUserRole(u._id, e.target.value)}
                                  className="form-select-sm capitalize"
                                >
                                  <option value="superadmin">👑 SuperAdmin (Full Control)</option>
                                  <option value="admin">🛡️ Admin (Content & Promote Moderators)</option>
                                  <option value="moderator">⚖️ Moderator (Draft & Edit Content)</option>
                                </select>
                              ) : isTargetSuperAdmin ? (
                                <span className="status-badge status-reviewed">
                                  <span>👑 SuperAdmin (Protected)</span>
                                </span>
                              ) : isTargetModerator ? (
                                <div className="flex items-center gap-2">
                                  <span className="status-badge status-replied">
                                    <span className="status-dot"></span>
                                    <span>⚖️ Moderator</span>
                                  </span>
                                  <button
                                    onClick={() => handleChangeUserRole(u._id, 'admin')}
                                    className="action-btn"
                                    style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.35)' }}
                                    title="Promote this Moderator to Admin"
                                  >
                                    <FiShield size={12} />
                                    <span>Promote to Admin</span>
                                  </button>
                                </div>
                              ) : (
                                <span className="status-badge status-new">
                                  <span className="status-dot"></span>
                                  <span>🛡️ Admin</span>
                                </span>
                              )}
                            </td>
                            <td>
                              <span className="status-badge status-replied">
                                <span className="status-dot"></span>
                                <span>{u.status || 'Active'}</span>
                              </span>
                            </td>
                            <td className="text-right">
                              {isSuperAdmin ? (
                                <button
                                  onClick={() => handleDeleteUser(u._id)}
                                  className="action-btn-danger"
                                  title="Remove user from MongoDB"
                                >
                                  <FiTrash2 size={13} />
                                  <span>Remove</span>
                                </button>
                              ) : (
                                <span className="text-[11px] text-slate-500 italic">SuperAdmin Only</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MODAL: INSPECT INQUIRY DETAILS
      ════════════════════════════════════════════════════════════════════ */}
      {inspectQuote && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <FiMail className="text-sky-400" size={18} />
                <h3 className="text-lg font-bold text-white">Project Inquiry Brief</h3>
              </div>
              <button
                onClick={() => setInspectQuote(null)}
                className="modal-close-btn"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="service-deliverables-box" style={{ padding: '1rem', margin: 0 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{inspectQuote.name}</h4>
                    <a href={`mailto:${inspectQuote.email}`} className="text-xs text-sky-400 hover:underline">
                      {inspectQuote.email}
                    </a>
                  </div>
                  <span className={`status-badge status-${inspectQuote.status}`}>
                    <span className="status-dot"></span>
                    <span>{inspectQuote.status}</span>
                  </span>
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="service-deliverables-box" style={{ padding: '0.85rem', margin: 0 }}>
                  <span className="text-xs text-slate-400 block mb-0.5">Requested Service</span>
                  <p className="font-semibold text-white">{inspectQuote.service || 'Custom Brief'}</p>
                </div>
                <div className="service-deliverables-box" style={{ padding: '0.85rem', margin: 0 }}>
                  <span className="text-xs text-slate-400 block mb-0.5">Estimated Budget</span>
                  <p className="font-semibold text-emerald-400">{inspectQuote.budget || 'Open / Flexible'}</p>
                </div>
              </div>

              <div className="service-deliverables-box" style={{ padding: '1rem', margin: 0 }}>
                <span className="text-xs text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
                  Project Scope & Requirements:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {inspectQuote.message}
                </p>
              </div>

              {canManageQuotes && (
                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-semibold">Update Status:</span>
                  <div className="flex gap-1.5">
                    {['new', 'reviewed', 'replied', 'closed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleQuoteStatusChange(inspectQuote._id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                          inspectQuote.status === st
                            ? 'bg-sky-500 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setReplyQuote(inspectQuote);
                    setReplyText(`Dear ${inspectQuote.name},\n\nThank you for reaching out to CraftBit Tech BD LTD regarding "${inspectQuote.service || 'your project'}".\n\nWe have reviewed your project requirements and would be delighted to schedule a technical discovery call this week to provide an architectural estimate.\n\nBest regards,\n${currentUser?.name || 'CraftBit Engineering Team'}\nCraftBit Tech BD LTD`);
                  }}
                  className="btn-primary flex items-center gap-2"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <FiMail size={14} />
                  <span>Send Reply via Nodemailer</span>
                </button>
                <a
                  href={`mailto:${inspectQuote.email}?subject=CraftBit%20Tech%20BD%20-%20Technical%20Consultation`}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                  title="Open desktop mail client"
                >
                  <span>Native Mailto</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => setInspectQuote(null)}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Nodemailer Direct Email Reply ── */}
      {replyQuote && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog" style={{ maxWidth: '520px' }}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <FiMail className="text-sky-400" size={18} />
                <h3 className="text-base font-bold text-white">Nodemailer Dispatch: Reply to Client</h3>
              </div>
              <button onClick={() => setReplyQuote(null)} className="modal-close-btn">
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handleSendNodemailerReply} className="space-y-4">
              <div className="service-deliverables-box" style={{ padding: '0.85rem', margin: 0 }}>
                <p className="text-xs text-slate-300">
                  <strong>Recipient:</strong> {replyQuote.name} &lt;{replyQuote.email}&gt;
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  <strong>Service:</strong> {replyQuote.service || 'Custom Development'}
                </p>
              </div>

              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email Message Body (Nodemailer HTML Format) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="form-control text-xs"
                  placeholder="Compose technical consultation reply..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setReplyQuote(null)}
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replySending}
                  className="btn-primary flex items-center gap-2"
                  style={{ padding: '0.6rem 1.35rem', fontSize: '0.85rem' }}
                >
                  <FiMail size={14} className={replySending ? 'animate-bounce' : ''} />
                  <span>{replySending ? 'Dispatching via Nodemailer...' : 'Dispatch Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Create/Edit Service ── */}
      {showServiceModal && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiLayers className="text-sky-400" size={18} />
                <span>{editingService ? 'Edit Service' : 'Add New Service (MongoDB Atlas)'}</span>
              </h3>
              <button onClick={() => setShowServiceModal(false)} className="modal-close-btn">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="form-group">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <FiLayers size={13} className="text-sky-400" />
                  <span>Service Title *</span>
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="form-control"
                  placeholder="e.g. AI-Powered Microservices"
                />
              </div>
              <div className="modal-grid-2">
                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="form-control text-xs"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Cloud">Cloud</option>
                    <option value="AI">AI</option>
                    <option value="Security">Security</option>
                    <option value="Design">Design</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Base Cost (USD)</label>
                  <input
                    type="number"
                    value={serviceForm.baseCost}
                    onChange={(e) => setServiceForm({ ...serviceForm, baseCost: e.target.value })}
                    className="form-control text-xs"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                  className="form-control text-xs"
                  placeholder="Detailed breakdown of what CraftBit delivers for this offering..."
                />
              </div>
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Features (comma separated)</label>
                <input
                  type="text"
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  className="form-control text-xs"
                  placeholder="e.g. Next.js 15, GraphQL, JWT Auth, Docker Pods"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                >
                  Commit to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Create/Edit Project ── */}
      {showProjectModal && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiFolder className="text-purple-400" size={18} />
                <span>{editingProject ? 'Edit Project' : 'Add Project (MongoDB Atlas)'}</span>
              </h3>
              <button onClick={() => setShowProjectModal(false)} className="modal-close-btn">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="form-control text-xs"
                  placeholder="e.g. FinTech Global Platform"
                />
              </div>
              <div className="modal-grid-2">
                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="form-control text-xs"
                  >
                    <option value="Web">Web</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Cloud">Cloud</option>
                    <option value="AI">AI</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    className="form-control text-xs"
                    placeholder="e.g. Apex Global UK"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.desc}
                  onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                  className="form-control text-xs"
                  placeholder="Overview of technical challenges and architecture..."
                />
              </div>
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={projectForm.tech}
                  onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                  className="form-control text-xs"
                  placeholder="e.g. React 19, Node.js, MongoDB, Redis, Docker"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                >
                  Commit to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Create User (SuperAdmin Only) ── */}
      {showUserModal && isSuperAdmin && (
        <div className="dashboard-modal-backdrop animate-fadeIn">
          <div className="dashboard-modal-dialog" style={{ maxWidth: '440px' }}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiUsers className="text-amber-400" size={18} />
                <span>Add Team Member (RBAC)</span>
              </h3>
              <button onClick={() => setShowUserModal(false)} className="modal-close-btn">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="form-control text-xs"
                  placeholder="e.g. Nusrat Jahan"
                />
              </div>
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="form-control text-xs"
                  placeholder="e.g. nusrat@craftbit.com"
                />
              </div>
              <div className="form-group">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Role & Permissions</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="form-control text-xs cursor-pointer"
                >
                  <option value="moderator">⚖️ Moderator (View + Create/Edit Content)</option>
                  <option value="admin">🛡️ Admin (Content + Quotes + Delete)</option>
                  <option value="superadmin">👑 SuperAdmin (Full Permissions)</option>
                </select>
              </div>
              <div className="p-3 rounded-xl border border-sky-500/20 bg-sky-500/5 text-xs text-slate-300 flex items-start gap-2">
                <FiMail className="text-sky-400 shrink-0 mt-0.5" size={14} />
                <span>
                  A 6-digit verification code will be dispatched to their email via <strong>Nodemailer</strong>. Once the user signs in and verifies their email, their role will be activated.
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                >
                  Create & Send Verification Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Email Verification for Unverified Session ── */}
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
              We sent a 6-digit verification code to <strong className="text-sky-300">{verifyingEmail || currentUser?.email}</strong> via <strong>Nodemailer</strong>. Please enter the code below to complete email verification.
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
                      <span>Verify Email & Activate Permissions</span>
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
              🔒 <strong>RBAC Policy:</strong> SuperAdmin can only add, promote, or assign permissions after user email is verified.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
