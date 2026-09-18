import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Stats from '../components/Stats';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Portfolio from '../components/Portfolio';
import ProcessSection from '../components/ProcessSection';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import FAQSection from '../components/FAQSection';
import CTABanner from '../components/CTABanner';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="w-full relative overflow-hidden flex flex-col mx-auto">
      <Hero />
      <ClientLogos />
      <Stats />
      <Services />
      <TechStack />
      <Portfolio />
      <ProcessSection />
      <Testimonials />
      <Team />
      <FAQSection />
      <CTABanner />
      <ContactForm />
    </div>
  );
}
