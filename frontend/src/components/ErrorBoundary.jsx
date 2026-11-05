import React from 'react';
import { FiRefreshCw, FiHome, FiAlertTriangle } from 'react-icons/fi';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CraftBit Tech BD ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060913] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center backdrop-blur-xl">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FiAlertTriangle size={32} />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Something unexpected occurred
            </h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We encountered a temporary interface glitch. Your data is safe. Please refresh the page or return to the main portal.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={this.handleReload}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
              >
                <FiRefreshCw size={15} />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <FiHome size={15} />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
