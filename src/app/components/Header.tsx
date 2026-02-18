import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Manufacturing', href: '/manufacturing' },
    { name: 'Principles', href: '/principles' },
    { name: 'Quality', href: '/quality' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full nav-soft-transition ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85 shadow-md border-b border-border'
          : 'bg-surface shadow-sm'
      }`}
    >
      {/* Top bar - SendCutSend style */}
      <div className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-9 items-center justify-center text-xs font-medium text-muted-foreground">
            Proudly made in India • Faridabad, Haryana
          </div>
        </div>
      </div>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">JEW</span>
            </div>
            <span className="hidden sm:block text-lg font-bold text-foreground">
              Jain Engineering Works
            </span>
          </Link>

          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:px-6">
            <div className="flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-surface-2'
                }`}
              >
                {item.name}
              </Link>
            ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-2 md:shrink-0">
            <Link to="/partner">
              <Button variant="ghost" size="sm" className="font-semibold">
                Become a Partner
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="sm" className="rounded-lg font-semibold px-5">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="ml-auto flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-surface-2"
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface py-4">
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 text-base font-medium rounded-lg ${
                    isActive(item.href) ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-surface-2'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-2 space-y-2 border-t border-border mt-4">
                <Link to="/partner" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-lg">
                    Become a Partner
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-lg font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
