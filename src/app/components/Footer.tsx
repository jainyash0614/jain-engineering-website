import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* About */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              About
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">JEW</span>
              </div>
              <span className="font-semibold text-foreground">Jain Engineering Works</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Incepted in 2003. Manufacturing & supplying metal boxes, metal plates, sheet metal components, shock loop assembly, port silencer & more. Faridabad.
            </p>
            <div className="flex gap-4">
              <a href="mailto:jain_engineeringworks@yahoo.co.in" className="text-muted-foreground hover:text-primary" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919990007858" className="text-muted-foreground hover:text-primary" aria-label="WhatsApp">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">Products</Link></li>
              <li><Link to="/manufacturing" className="text-sm text-muted-foreground hover:text-foreground">Manufacturing</Link></li>
              <li><Link to="/principles" className="text-sm text-muted-foreground hover:text-foreground">Principles</Link></li>
              <li><Link to="/quality" className="text-sm text-muted-foreground hover:text-foreground">Quality</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">Technical Guides</Link></li>
              <li><Link to="/downloads" className="text-sm text-muted-foreground hover:text-foreground">Datasheets</Link></li>
              <li><Link to="/quality" className="text-sm text-muted-foreground hover:text-foreground">Certifications</Link></li>
              <li><Link to="/resources?intent=case-studies" className="text-sm text-muted-foreground hover:text-foreground">Case Studies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/hsdST1BVCwGwiEaN9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Faridabad, Haryana<br />India
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:jain_engineeringworks@yahoo.co.in" className="hover:text-foreground">jain_engineeringworks@yahoo.co.in</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+919990007858" className="hover:text-foreground">+91 9990007858</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jain Engineering Works. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/contact?intent=privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/contact?intent=terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link to="/quality" className="text-muted-foreground hover:text-foreground">Quality Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
