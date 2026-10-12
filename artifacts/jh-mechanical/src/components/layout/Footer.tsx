import { Link } from 'wouter';
import { Facebook } from 'lucide-react';
import { services } from '@/data/services';
import { areas } from '@/data/areas';

export function Footer() {
  return (
    <footer className="bg-[#1c201d] px-5 py-12 text-[#9ea99c] lg:px-8 border-t border-[#303530]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 border-b border-[#2d332d] pb-10">
          <div>
            <span className="display-face text-2xl font-bold uppercase text-[#f2f0e8]">JH Mechanical</span>
            <p className="mt-4 text-sm leading-6 max-w-xs">
              Practical, dependable diesel mechanic services for Bendigo and surrounding Victoria. We keep heavy vehicles and machinery working hard.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="https://www.facebook.com/dieselmechbendigo" target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#262d27] text-[#83C438] transition-colors hover:bg-[#323b33]">
                <span className="sr-only">Facebook</span>
                <Facebook size={26} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] mb-5">Services</h3>
            <ul className="space-y-3">
              {Object.values(services).map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="text-sm hover:text-[#83c438] transition-colors" data-testid={`footer-service-${s.slug}`}>
                    {s.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] mb-5">Service Areas</h3>
            <ul className="space-y-3">
              {Object.values(areas).map(a => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}/`} className="text-sm hover:text-[#83c438] transition-colors" data-testid={`footer-area-${a.slug}`}>
                    {a.cityName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+61354488149" className="hover:text-[#83c438] transition-colors block" data-testid="footer-phone-link">
                  03 5448 8149
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=Unit%203%2F39%20Collins%20St%2C%20Kangaroo%20Flat%20VIC%203555" target="_blank" rel="noreferrer" className="hover:text-[#83c438] transition-colors block leading-6" data-testid="footer-address-link">
                  Unit 3/39 Collins St<br />Kangaroo Flat VIC 3555
                </a>
              </li>
              <li className="pt-2">
                <Link href="/about/" className="hover:text-[#83c438] transition-colors block" data-testid="footer-about-link">About JH</Link>
              </li>
              <li>
                <a href="/#quote" className="hover:text-[#83c438] transition-colors block" data-testid="footer-quote-link">Request a Quote</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-[#83c438] transition-colors block" data-testid="footer-faq-link">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs">
          <span>&copy; {new Date().getFullYear()} JH Mechanical &middot; Bendigo, Victoria</span>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-[#83c438] transition-colors" data-testid="footer-bottom-home">Home</Link>
            <Link href="/about/" className="hover:text-[#83c438] transition-colors" data-testid="footer-bottom-about">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
