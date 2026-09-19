import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCpu, 
  FiSend, 
  FiCheckCircle, 
  FiArrowRight, 
  FiClock, 
  FiDollarSign, 
  FiLayers, 
  FiShield, 
  FiRefreshCw, 
  FiCopy, 
  FiCheck,
  FiTerminal
} from 'react-icons/fi';
import { toast } from 'sonner';

const SAMPLE_PROMPTS = [
  "Build a multi-tenant B2B SaaS platform with Stripe billing and real-time dashboard",
  "Develop a high-performance cross-platform iOS & Android mobile app with offline sync",
  "Modernize our monolithic backend to AWS microservices with automated CI/CD",
  "Build an AI customer service agent with RAG vector search and human handoff"
];

export default function AiServiceCostGenerator() {
  const [projectDescription, setProjectDescription] = useState('');
  const [timelinePreference, setTimelinePreference] = useState('standard'); // 'urgent' | 'standard' | 'flexible'
  const [budgetConstraint, setBudgetConstraint] = useState('flexible'); // 'bootstrapped' | 'growth' | 'enterprise' | 'flexible'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Intelligent analysis engine based on user input
  const handleGenerate = (e) => {
    e?.preventDefault();
    if (!projectDescription.trim() || projectDescription.length < 10) {
      toast.error('Please provide a brief description (at least 10 characters) of your project.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulated AI computation with realistic processing animation
    setTimeout(() => {
      const lower = projectDescription.toLowerCase();

      // Heuristic detection of tech domain
      let primaryDomain = 'Full-Stack Web Architecture';
      let recommendedStack = ['React / Next.js', 'Node.js / Express', 'PostgreSQL', 'Docker', 'AWS'];
      let baseWeeks = 6;
      let minBudget = 3200;
      let maxBudget = 5800;
      let complexity = 'Moderate Enterprise';

      if (lower.includes('mobile') || lower.includes('ios') || lower.includes('android') || lower.includes('flutter')) {
        primaryDomain = 'Cross-Platform Mobile Application';
        recommendedStack = ['Flutter / React Native', 'Firebase Auth', 'GraphQL API', 'Fastlane CI/CD'];
        baseWeeks = 8;
        minBudget = 4200;
        maxBudget = 7500;
        complexity = 'High Velocity Mobile';
      } else if (lower.includes('ai') || lower.includes('agent') || lower.includes('rag') || lower.includes('llm') || lower.includes('gpt')) {
        primaryDomain = 'Autonomous AI Agents & ML Systems';
        recommendedStack = ['Python / FastAPI', 'LangChain / LlamaIndex', 'Pinecone Vector DB', 'Claude/GPT-4o API'];
        baseWeeks = 7;
        minBudget = 4800;
        maxBudget = 8900;
        complexity = 'Intelligent AI Architecture';
      } else if (lower.includes('microservice') || lower.includes('cloud') || lower.includes('devops') || lower.includes('kubernetes') || lower.includes('migration')) {
        primaryDomain = 'Cloud Infrastructure & Microservices';
        recommendedStack = ['Kubernetes (EKS)', 'Go / Node.js', 'Terraform', 'Kafka / RabbitMQ', 'Prometheus'];
        baseWeeks = 9;
        minBudget = 5200;
        maxBudget = 9800;
        complexity = 'Mission-Critical Cloud';
      } else if (lower.includes('commerce') || lower.includes('shop') || lower.includes('marketplace') || lower.includes('stripe')) {
        primaryDomain = 'High-Conversion E-Commerce / Marketplace';
        recommendedStack = ['Next.js App Router', 'Stripe Connect', 'Redis Cache', 'PostgreSQL', 'Tailwind CSS'];
        baseWeeks = 7;
        minBudget = 3800;
        maxBudget = 6800;
        complexity = 'Transactional FinTech/Commerce';
      }

      // Modifiers based on user preferences
      let speedMultiplier = 1;
      let deliveryWeeks = baseWeeks;
      if (timelinePreference === 'urgent') {
        speedMultiplier = 1.25;
        deliveryWeeks = Math.max(3, Math.round(baseWeeks * 0.65));
      } else if (timelinePreference === 'flexible') {
        speedMultiplier = 0.9;
        deliveryWeeks = baseWeeks + 2;
      }

      if (budgetConstraint === 'bootstrapped') {
        minBudget = Math.round(minBudget * 0.85);
        maxBudget = Math.round(maxBudget * 0.85);
      } else if (budgetConstraint === 'enterprise') {
        minBudget = Math.round(minBudget * 1.35);
        maxBudget = Math.round(maxBudget * 1.45);
      }

      const calculatedMin = Math.round(minBudget * speedMultiplier);
      const calculatedMax = Math.round(maxBudget * speedMultiplier);

      // Breakdown milestones
      const kickoff = Math.round(calculatedMin * 0.4);
      const beta = Math.round(calculatedMin * 0.3);
      const launch = Math.round(calculatedMin * 0.3);

      // AI Architectural recommendations tailored to prompt
      const architecturalInsights = [
        `Architected specifically for scalability: Clean Layered Pattern with automated CI/CD pipeline.`,
        `Estimated sprint cycle: ${deliveryWeeks} weeks delivered over ${Math.ceil(deliveryWeeks / 2)} bi-weekly sprint reviews with live staging URLs.`,
        `Guaranteed deliverables: Production deploy, full source code IP ownership, automated test suites, and 30-day post-launch warranty.`
      ];

      setAnalysisResult({
        domain: primaryDomain,
        complexity,
        estimatedWeeks: deliveryWeeks,
        estimatedMin: calculatedMin,
        estimatedMax: calculatedMax,
        recommendedStack,
        milestones: { kickoff, beta, launch },
        insights: architecturalInsights
      });

      setIsAnalyzing(false);
      toast.success('AI technical analysis completed!');
    }, 1200);
  };

  const handleCopyQuote = () => {
    if (!analysisResult) return;
    const text = `CraftBit Tech BD - AI Estimate:\n• Domain: ${analysisResult.domain}\n• Timeline: ${analysisResult.estimatedWeeks} Weeks\n• Estimated Budget: $${analysisResult.estimatedMin.toLocaleString()} - $${analysisResult.estimatedMax.toLocaleString()} USD\n• Tech Stack: ${analysisResult.recommendedStack.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Estimate copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="my-16 p-6 sm:p-10 rounded-3xl bg-linear-to-b from-[#0b1329] to-[#060913] border border-sky-500/20 shadow-2xl relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wide uppercase mb-3">
          <FiCpu size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
          <span>AI Technical Cost & Velocity Generator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Describe Your Vision. <span className="gradient-text">Let AI Architect the Cost.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Tell us what you want to build in your own words. Our AI estimator analyzes architectural complexity, suggests modern tech stacks, and predicts your sprint velocity and investment.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Input Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Project Requirements & Vision:
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="e.g., We need a secure telemedicine platform with video consultations, doctor booking calendar, Stripe subscription payments, and HIPAA-compliant health record storage..."
                rows={4}
                className="w-full bg-[#080d1a] border border-white/10 focus:border-sky-400 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all leading-relaxed resize-none"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Quick inspiration templates:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProjectDescription(prompt)}
                    className="text-[11px] text-slate-300 hover:text-white bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 px-3 py-1.5 rounded-lg transition-all text-left truncate max-w-full"
                  >
                    "{prompt.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Preference Selectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Delivery Urgency:
                </label>
                <select
                  value={timelinePreference}
                  onChange={(e) => setTimelinePreference(e.target.value)}
                  className="w-full bg-[#080d1a] border border-white/10 text-slate-300 rounded-xl px-3 py-2.5 text-xs focus:border-sky-400 focus:outline-none"
                >
                  <option value="standard">Standard Balanced Pace (Recommended)</option>
                  <option value="urgent">Accelerated Sprint (Higher Velocity)</option>
                  <option value="flexible">Flexible / Milestone Driven</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Scale & Budget Bracket:
                </label>
                <select
                  value={budgetConstraint}
                  onChange={(e) => setBudgetConstraint(e.target.value)}
                  className="w-full bg-[#080d1a] border border-white/10 text-slate-300 rounded-xl px-3 py-2.5 text-xs focus:border-sky-400 focus:outline-none"
                >
                  <option value="flexible">Flexible Market Standards</option>
                  <option value="bootstrapped">Startup MVP (Cost Optimized)</option>
                  <option value="growth">Growth Scale (High Performance)</option>
                  <option value="enterprise">Enterprise Tier (Maximum SLA)</option>
                </select>
              </div>
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn-primary w-full justify-center flex items-center gap-2.5 py-3.5 text-sm font-bold tracking-wide rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <FiRefreshCw className="animate-spin" size={16} />
                  <span>AI Engine Analyzing Architecture & Estimating...</span>
                </>
              ) : (
                <>
                  <FiTerminal size={16} />
                  <span>Generate AI Technical Breakdown</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Output Console (5 Cols) */}
        <div className="lg:col-span-5">
          {analysisResult ? (
            <div className="p-6 rounded-2xl bg-[#080e1e] border border-sky-400/40 shadow-2xl relative overflow-hidden animate-fadeIn">
              {/* Top Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
                    AI Architectural Proposal
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copied ? <FiCheck className="text-emerald-400" size={13} /> : <FiCopy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Quote'}</span>
                </button>
              </div>

              {/* Price Range */}
              <div className="py-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Estimated Budget Range
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ${analysisResult.estimatedMin.toLocaleString()} - ${analysisResult.estimatedMax.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-sky-400">USD</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                  <FiClock size={13} className="text-sky-400" />
                  <span>Timeline: <strong className="text-white">{analysisResult.estimatedWeeks} Weeks</strong> ({Math.ceil(analysisResult.estimatedWeeks / 2)} Bi-Weekly Sprints)</span>
                </div>
              </div>

              {/* Architecture Details */}
              <div className="py-3 space-y-2.5 text-xs border-b border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-400">Domain:</span>
                  <span className="text-white font-semibold text-right">{analysisResult.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Complexity:</span>
                  <span className="text-sky-400 font-semibold">{analysisResult.complexity}</span>
                </div>
              </div>

              {/* Recommended Stack Chips */}
              <div className="py-3 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  AI Recommended Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.recommendedStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Escrow Sprints */}
              <div className="py-3 text-xs border-b border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                  Escrow Milestones
                </span>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Kickoff & Architecture (40%):</span>
                    <strong className="text-white">${analysisResult.milestones.kickoff.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Alpha Staging Demo (30%):</span>
                    <strong className="text-white">${analysisResult.milestones.beta.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>QA & Production Launch (30%):</span>
                    <strong className="text-white">${analysisResult.milestones.launch.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-4">
                <Link
                  to={`/contact?service=${encodeURIComponent(analysisResult.domain)}&budget=${encodeURIComponent(`$${analysisResult.estimatedMin.toLocaleString()} - $${analysisResult.estimatedMax.toLocaleString()} USD`)}`}
                  className="btn-primary w-full justify-center flex items-center gap-2 py-3 text-xs sm:text-sm font-bold rounded-xl shadow-lg hover:shadow-sky-500/25"
                >
                  <span>Book Proposal Discussion</span>
                  <FiArrowRight size={15} />
                </Link>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  ✓ Free Principal Architect consultation included
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                <FiTerminal size={24} />
              </div>
              <h4 className="text-white font-bold text-base mb-1">
                Awaiting Project Input
              </h4>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                Type your project requirements on the left and click <strong>"Generate AI Technical Breakdown"</strong> to generate real-time budgets, timelines, and architectural stacks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

