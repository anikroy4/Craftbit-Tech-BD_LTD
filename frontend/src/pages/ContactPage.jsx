
import ContactForm from '../components/ContactForm';
import { FiMapPin, FiMail, FiPhone, FiClock, FiShield, FiMessageSquare } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Contact Us & Request a Quote | CraftBit Tech BD LTD</title>
        <meta name="description" content="Reach out to CraftBit Tech BD LTD in Gopibagh, Dhaka. Request a technical quote or schedule an architectural consultation." />
      </Helmet>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge flex items-center gap-1.5 mx-auto">
              <FiMessageSquare size={13} />
              <span>Get In Touch</span>
            </div>
            <h1 className="section-title">Start Your <span className="gradient-text">Project Today</span></h1>
            <p className="section-subtitle">
              Ready to transform your technical architecture or build a new software product? Talk with our senior engineers.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <FiMapPin size={22} className="shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="info-card-title">Corporate Headquarters</h4>
                  <p className="info-card-desc">15-A/A1, Lane 2, Gopibagh, Dhaka-1203, Bangladesh</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FiMail size={22} className="shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="info-card-title">Direct Technical Inquiries</h4>
                  <a href="mailto:craftbittechbd@gmail.com" className="info-card-desc hover:text-sky-400 transition-colors block">
                    craftbittechbd@gmail.com
                  </a>
                  <p className="text-xs text-sky-400 font-semibold mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 inline-block"></span>
                    <span>Avg response time: &lt; 2 hours</span>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FiPhone size={22} className="shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="info-card-title">Phone / WhatsApp Hotline</h4>
                  <a href="tel:01774381687" className="info-card-desc hover:text-sky-400 transition-colors block">
                    01774381687
                  </a>
                  <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 inline-block"></span>
                    <span>Direct developer connection available</span>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FiClock size={22} className="shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="info-card-title">Business Hours</h4>
                  <p className="info-card-desc">Sunday – Thursday: 9:00 AM – 7:00 PM BST</p>
                  <p className="text-xs text-emerald-400 font-semibold mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 inline-block animate-pulse"></span>
                    <span>24/7 SLA Server Monitoring active</span>
                  </p>
                </div>
              </div>

              <div className="nda-card">
                <div className="flex items-center gap-2 mb-2">
                  <FiShield className="text-sky-400 shrink-0" size={18} />
                  <h4 className="text-sky-400 font-bold text-sm uppercase tracking-wider">NDA & Confidentiality</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We respect your intellectual property. We are happy to execute mutual Non-Disclosure Agreements (NDAs) prior to receiving your proprietary code or technical documentation.
                </p>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
