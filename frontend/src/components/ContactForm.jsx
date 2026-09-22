import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitQuoteRequest } from '../redux/appSlice';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { 
  FiUser, FiMail, FiLayers, FiDollarSign, FiMessageSquare, 
  FiSend, FiCheckCircle, FiShield, FiClock 
} from 'react-icons/fi';

export default function ContactForm() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialService = searchParams.get('service') || '';
  const initialBudget = searchParams.get('budget') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService,
    budget: initialBudget,
    message: ''
  });

  useEffect(() => {
    const s = searchParams.get('service');
    const b = searchParams.get('budget');
    if (s || b) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({
        ...prev,
        service: s !== null ? s : prev.service,
        budget: b !== null ? b : prev.budget
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    dispatch(submitQuoteRequest(formData));
    setLoading(false);
    setSubmitted(true);
    toast.success('Inquiry submitted successfully! Our architects will reply shortly.');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  if (submitted) {
    return (
      <div className="success-alert">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
          <FiCheckCircle size={30} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">🎉 Project Brief Received!</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Thank you, <strong className="text-white">{formData.name}</strong>. Our lead software architect has received your specifications{formData.service ? <> for <em>{formData.service}</em></> : ''} and will email your initial technical estimate within 24 hours.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', service: '', budget: '', message: '' }); }}
          className="btn-secondary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label className="flex items-center gap-2">
          <FiUser size={15} className="text-sky-400 shrink-0" />
          <span>Full Name *</span>
        </label>
        <input 
          type="text" 
          required 
          className="form-control" 
          placeholder="e.g. Rafiul Islam"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2">
          <FiMail size={15} className="text-sky-400 shrink-0" />
          <span>Corporate / Work Email *</span>
        </label>
        <input 
          type="email" 
          required 
          className="form-control" 
          placeholder="e.g. rafiul@company.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="flex items-center gap-2">
            <FiLayers size={15} className="text-sky-400 shrink-0" />
            <span>Primary Service</span>
          </label>
          <input 
            type="text"
            className="form-control"
            placeholder="e.g. Full-Stack Web Development, Mobile App..."
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2">
            <FiDollarSign size={15} className="text-sky-400 shrink-0" />
            <span>Estimated Budget</span>
          </label>
          <input 
            type="text"
            className="form-control"
            placeholder="e.g. $5,000 - $15,000 USD"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2">
          <FiMessageSquare size={15} className="text-sky-400 shrink-0" />
          <span>Project Scope & Requirements *</span>
        </label>
        <textarea 
          rows={4} 
          required 
          className="form-control" 
          placeholder="Describe goals, target users, preferred tech stack, and ideal timeline..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary flex items-center justify-center gap-2 w-full"
      >
        {loading ? (
          <span>Securing Submission...</span>
        ) : (
          <>
            <span>Submit Project Brief</span>
            <FiSend size={15} className="shrink-0" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
        <span className="flex items-center gap-1.5">
          <FiShield className="text-sky-400 shrink-0" size={13} />
          <span>100% Strict NDA Policy</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <FiClock className="text-emerald-400 shrink-0" size={13} />
          <span>Avg Response: 2 Hours</span>
        </span>
      </div>
    </form>
  );
}
