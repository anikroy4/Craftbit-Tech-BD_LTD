import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <Team />
      <ContactForm />
    </>
  );
}
