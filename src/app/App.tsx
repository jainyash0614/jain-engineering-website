import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { ProductsIndex } from './pages/ProductsIndex';
import { ElectricalMetalBoxes } from './pages/ElectricalMetalBoxes';
import { FloorDistributionSystem } from './pages/FloorDistributionSystem';
import { JunctionBoxes } from './pages/JunctionBoxes';
import { FoldedMetalBoxes } from './pages/FoldedMetalBoxes';
import { Principles } from './pages/Principles';
import { Manufacturing } from './pages/Manufacturing';
import { Quality } from './pages/Quality';
import { Resources } from './pages/Resources';
import { Downloads } from './pages/Downloads';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { BecomePartner } from './pages/BecomePartner';

function AppShell() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('main section, main [data-reveal]')
    );

    if (reduceMotion) {
      elements.forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    elements.forEach((el) => el.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/products/electrical-metal-boxes" element={<ElectricalMetalBoxes />} />
          <Route path="/products/floor-distribution-system" element={<FloorDistributionSystem />} />
          <Route path="/products/junction-boxes" element={<JunctionBoxes />} />
          <Route path="/products/folded-metal-boxes" element={<FoldedMetalBoxes />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/principles" element={<Principles />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partner" element={<BecomePartner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
