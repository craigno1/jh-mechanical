import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, PhoneCall, X } from 'lucide-react';
import logoMarkPath from '@assets/image_1788175621031.png';
import { services } from '@/data/services';
import { areas } from '@/data/areas';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const closeAnd = (action?: () => void) => {
    if (action) action();
    setMenuOpen(false);
    setServicesOpen(false);
    setAreasOpen(false);
  };

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    closeAnd();
    if (location === '/') {
      window.history.replaceState(null, '', '#quote');
      const quoteSection = document.getElementById('quote');
      if (quoteSection) {
        const headerOffset = 76;
        const top = quoteSection.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      setLocation('/#quote');
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#303530] bg-[#1c201d]/95 text-[#f2f0e8] backdrop-blur-md" onMouseLeave={() => { setServicesOpen(false); setAreasOpen(false); }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#83c438] focus:px-4 focus:py-3 focus:text-[#1c201d]">Skip to content</a>
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" onClick={() => closeAnd()} className="flex shrink-0 items-center gap-3 rounded-sm transition-opacity hover:opacity-90">
          <span className="flex h-[42px] w-[48px] items-center justify-center overflow-hidden rounded-sm bg-[#fdfcf7] p-1 sm:h-[48px] sm:w-[54px]">
            <img src={logoMarkPath} alt="JH Mechanical mark" className="h-full w-full object-contain" />
          </span>
          <span className="display-face text-xl font-bold uppercase leading-none tracking-wide text-[#f2f0e8] sm:text-2xl">JH Mechanical</span>
        </Link>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          <div className="relative">
            <button onClick={() => { setServicesOpen(!servicesOpen); setAreasOpen(false); }} className="flex items-center gap-1 text-sm text-[#d4d9d0] transition-colors hover:text-[#83c438]" aria-expanded={servicesOpen} data-testid="nav-services-toggle">
              Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-5 w-64 rounded-sm border border-[#303530] bg-[#1c201d] py-2 shadow-xl">
                {Object.values(services).map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => closeAnd()} className="block px-4 py-2.5 text-sm text-[#d4d9d0] transition-colors hover:bg-[#242a25] hover:text-[#83c438]" data-testid={`nav-service-${s.slug}`}>
                    {s.h1}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => { setAreasOpen(!areasOpen); setServicesOpen(false); }} className="flex items-center gap-1 text-sm text-[#d4d9d0] transition-colors hover:text-[#83c438]" aria-expanded={areasOpen} data-testid="nav-areas-toggle">
              Service areas <ChevronDown size={14} className={`transition-transform ${areasOpen ? 'rotate-180' : ''}`} />
            </button>
            {areasOpen && (
              <div className="absolute left-0 top-full mt-5 w-64 rounded-sm border border-[#303530] bg-[#1c201d] py-2 shadow-xl">
                {Object.values(areas).map(area => (
                  <Link key={area.slug} href={`/service-areas/${area.slug}`} onClick={() => closeAnd()} className="block px-4 py-2.5 text-sm text-[#d4d9d0] transition-colors hover:bg-[#242a25] hover:text-[#83c438]" data-testid={`nav-area-${area.slug}`}>
                    {area.cityName}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/products" onClick={() => closeAnd()} className="text-sm text-[#d4d9d0] transition-colors hover:text-[#83c438]" data-testid="nav-products-link">Products</Link>
          <Link href="/about" onClick={() => closeAnd()} className="text-sm text-[#d4d9d0] transition-colors hover:text-[#83c438]" data-testid="nav-about-link">About JH</Link>
          <a href="/#faq" onClick={() => closeAnd()} className="text-sm text-[#d4d9d0] transition-colors hover:text-[#83c438]" data-testid="nav-faq-link">FAQ</a>
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <a href={phoneHref} className="flex items-center gap-2 text-sm font-semibold text-[#f2f0e8] hover:text-[#83c438] transition-colors" data-testid="nav-phone-link"><PhoneCall size={16} className="text-[#83c438]" /> {phone}</a>
          <button onClick={handleQuoteClick} className="bg-[#83c438] px-4 py-3 text-xs font-bold uppercase tracking-[.09em] text-[#1c201d] transition-colors hover:bg-[#94d14b]" data-testid="nav-quote-btn">Get a quote</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#f2f0e8] xl:hidden shrink-0" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} data-testid="mobile-menu-toggle">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {menuOpen && (
        <nav className="border-t border-[#303530] bg-[#242a25] px-5 pb-5 pt-2 xl:hidden overflow-y-auto max-h-[calc(100dvh-76px)]" aria-label="Mobile navigation">
          <div className="block border-b border-[#394139] py-4">
            <span className="text-sm font-semibold text-[#83c438]">Services</span>
            <div className="mt-3 flex flex-col gap-3 border-l border-[#394139] pl-3">
              {Object.values(services).map(s => (
                <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => closeAnd()} className="text-sm text-[#d4d9d0]" data-testid={`mobile-service-${s.slug}`}>
                  {s.h1}
                </Link>
              ))}
            </div>
          </div>
          <div className="block border-b border-[#394139] py-4">
            <span className="text-sm font-semibold text-[#83c438]">Service areas</span>
            <div className="mt-3 grid grid-cols-2 gap-3 border-l border-[#394139] pl-3">
              {Object.values(areas).map(area => (
                <Link key={area.slug} href={`/service-areas/${area.slug}`} onClick={() => closeAnd()} className="text-sm text-[#d4d9d0]" data-testid={`mobile-area-${area.slug}`}>
                  {area.cityName}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/products" onClick={() => closeAnd()} className="block border-b border-[#394139] py-4 text-sm font-semibold text-[#f2f0e8]" data-testid="mobile-products-link">Products</Link>
          <Link href="/about" onClick={() => closeAnd()} className="block border-b border-[#394139] py-4 text-sm font-semibold text-[#f2f0e8]" data-testid="mobile-about-link">About JH</Link>
          <a href="/#faq" onClick={() => closeAnd()} className="block border-b border-[#394139] py-4 text-sm font-semibold text-[#f2f0e8]" data-testid="mobile-faq-link">FAQ</a>
          
          <div className="flex flex-col gap-3 pt-6 pb-2">
            <a href={phoneHref} className="flex w-full items-center justify-center gap-2 border border-[#596358] bg-[#303730] px-4 py-3.5 text-sm font-semibold text-[#f2f0e8]" data-testid="mobile-phone-link">
              <PhoneCall size={16} className="text-[#83c438]" /> Call {phone}
            </a>
            <button onClick={handleQuoteClick} className="w-full bg-[#83c438] px-4 py-3.5 text-xs font-bold uppercase tracking-[.08em] text-[#1c201d]" data-testid="mobile-quote-btn">
              Get a quote
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
