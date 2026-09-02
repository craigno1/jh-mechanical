import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, CheckCircle2, ChevronDown, Facebook, MapPin, Menu, PhoneCall, ShieldCheck, Wrench, X } from 'lucide-react';
import logoPath from '@assets/JH_Mechnical_Logo_1788345228022.jpg';
import storefrontImg from '@assets/image_1788154164791.png';
import teamImg from '@assets/image_1788177487503.png';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

function AboutSeo() {
  useEffect(() => {
    document.title = 'About JH Mechanical | Local Diesel Mechanic in Bendigo';
    const description = 'Meet JH Mechanical, a practical and dependable Bendigo diesel mechanic supporting trucks, fleets and heavy vehicles across central Victoria.';
    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); document.head.appendChild(tag); }
      Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    };
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: document.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: window.location.origin + '/about' });
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.origin + '/about';
  }, []);
  return null;
}

function About() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const aboutServices = ['Diesel mechanic', 'Diesel servicing', 'Vehicle maintenance', 'Vehicle breakdown', 'Vehicle repairs'];
  return (
    <div className="noise min-h-[100dvh] bg-[#f6f4ed] text-[#242a24]">
      <AboutSeo />
       <header className="sticky top-0 z-40 border-b border-[#303530] bg-[#1c201d]/95 text-[#f2f0e8] backdrop-blur-md">
            <div className="mx-auto flex h-[92px] max-w-[1240px] items-center justify-between gap-4 px-5 lg:px-8">
            <Link href="/" className="flex shrink-0 items-center rounded-sm transition-opacity hover:opacity-90" data-testid="link-about-home-logo">
              <span className="flex h-[75px] w-[83px] items-center justify-center overflow-hidden rounded-sm bg-white p-1">
                <img src={logoPath} alt="JH Mechanical" className="h-full w-full object-contain" />
              </span>
          </Link>
           <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
             <div className="relative">
               <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center gap-1 text-sm text-[#d4d9d0] transition-colors hover:text-[#83C438]" aria-expanded={servicesOpen} data-testid="button-about-nav-services">
                 Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
               </button>
               {servicesOpen && <div className="absolute left-0 top-full mt-5 w-56 rounded-sm border border-[#303530] bg-[#1c201d] py-2 shadow-xl">{aboutServices.map((service) => <a key={service} href="/#quote" onClick={() => setServicesOpen(false)} className="block px-4 py-2.5 text-sm text-[#d4d9d0] transition-colors hover:bg-[#242a25] hover:text-[#83C438]">{service}</a>)}</div>}
             </div>
             <a href="/#areas" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#83C438]" data-testid="link-about-nav-areas">Service areas</a>
             <Link href="/about" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#83C438]" data-testid="link-about-nav-about">About JH</Link>
             <a href="/#faq" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#83C438]" data-testid="link-about-nav-faq">FAQ</a>
           </nav>
           <div className="hidden items-center gap-3 md:flex"><a href={phoneHref} className="flex items-center gap-2 text-sm font-semibold text-[#f2f0e8]" data-testid="link-about-call"><PhoneCall size={16} className="text-[#83C438]" /> {phone}</a><a href="/#quote" className="bg-[#83C438] px-4 py-3 text-xs font-bold uppercase tracking-[.09em] text-[#1c201d] transition-colors hover:bg-[#94d14b]">Get a quote</a></div>
           <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#f2f0e8] md:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} data-testid="button-about-mobile-menu">{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
         {menuOpen && <nav className="border-t border-[#303530] bg-[#242a25] px-5 pb-5 pt-2 md:hidden" aria-label="Mobile navigation"><div className="block border-b border-[#394139] py-4"><span className="text-sm font-semibold text-[#83C438]">Services</span><div className="mt-3 flex flex-col gap-3 border-l border-[#394139] pl-3">{aboutServices.map((service) => <a key={service} href="/#quote" onClick={() => setMenuOpen(false)} className="text-sm text-[#d4d9d0]">{service}</a>)}</div></div><a href="/#areas" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold">Service areas</a><Link href="/about" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold">About JH</Link><a href="/#faq" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold">FAQ</a><div className="flex items-center gap-3 pt-4"><a href={phoneHref} className="flex flex-1 items-center justify-center gap-2 border border-[#596358] px-3 py-3 text-sm font-semibold"><PhoneCall size={16} className="text-[#83C438]" /> Call {phone}</a><a href="/#quote" className="bg-[#83C438] px-4 py-3 text-xs font-bold uppercase tracking-[.08em] text-[#1c201d]">Quote</a></div></nav>}
      </header>
      <main>
         <section className="bg-[#1c201d] px-5 pb-8 pt-12 text-[#f2f0e8] sm:pb-10 sm:pt-16 lg:px-8"><div className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[1fr_.9fr]"><div><span className="eyebrow">About JH Mechanical</span><h1 className="display-face mt-5 max-w-3xl text-[2.65rem] font-bold uppercase leading-[.86] tracking-[-.03em] sm:text-[4.9rem]">Local know-how.<br /><span className="text-[#83C438]">Properly applied.</span></h1><p className="mt-7 max-w-md border-l-2 border-[#83C438] pl-5 text-base leading-7 text-[#b9c1b7]">JH Mechanical is a Bendigo-based diesel mechanic for the people and businesses who rely on their vehicles to get the job done.</p></div><div><div className="relative aspect-[4/3] overflow-hidden bg-[#242a25]"><img src={teamImg} alt="JH Mechanical owner and family beside a service vehicle" className="absolute inset-0 h-full w-full object-cover" /></div></div></div></section>
          <section className="px-5 py-12 sm:py-[4.5rem] lg:px-8">
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative min-h-[410px] overflow-hidden bg-[#242a25]">
              <img src={storefrontImg} alt="JH Mechanical workshop" className="absolute inset-0 h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111511]/90 to-transparent" />
              <div className="absolute left-7 top-7 rounded-sm bg-[#f8f9f1]/90 px-3 py-2 shadow-sm">
                <p className="mono-face text-[9px] uppercase tracking-[.15em] text-[#4b574b]">JH / Bendigo VIC</p>
              </div>
              <div className="absolute bottom-7 left-7">
                <Wrench size={44} className="text-[#83C438]" strokeWidth={1.25} />
                <p className="display-face mt-4 text-4xl font-bold uppercase leading-none text-[#f2f0e8]">Ready for<br />the real work.</p>
              </div>
            </div>
            <div>
              <span className="eyebrow">A practical approach</span>
              <h2 className="display-face mt-4 text-[2.65rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-[4.9rem] lg:text-[4.3rem]">Mechanics are<br /><span className="text-[#83C438]">about trust.</span></h2>
              <div className="mt-7 space-y-5 text-sm leading-7 text-[#5e665c]">
                <p>When a truck or work vehicle is off the road, the pressure is real. JH Mechanical keeps the process simple: listen carefully, diagnose properly, explain the options and do the work that needs doing.</p>
                <p>That means no unnecessary jargon and no disappearing behind a workshop counter. Just experienced, practical help for diesel vehicles, fleets and heavy-vehicle owners across Bendigo and the surrounding region.</p>
                <p>Whether you are planning a service, chasing an intermittent fault or standing beside a vehicle that has stopped, you can call and talk through the next step.</p>
              </div>
              <a href={phoneHref} className="mt-8 inline-flex items-center gap-3 bg-[#262d27] px-5 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] hover:bg-[#313c32]" data-testid="link-about-story-call"><PhoneCall size={17} className="text-[#83C438]" /> Talk to JH Mechanical</a>
            </div>
          </div>
        </section>
        <section className="bg-[#262d27] px-5 py-12 text-[#f2f0e8] sm:py-16 lg:px-8"><div className="mx-auto max-w-[1080px]"><div className="grid gap-px bg-[#4b574b] sm:grid-cols-3"><div className="bg-[#262d27] p-7"><ShieldCheck className="text-[#83C438]" size={28} /><h2 className="display-face mt-8 text-3xl font-bold uppercase">Clear advice</h2><p className="mt-3 text-sm leading-6 text-[#adb8aa]">You should understand the problem and the plan before work begins.</p></div><div className="bg-[#262d27] p-7"><MapPin className="text-[#83C438]" size={28} /><h2 className="display-face mt-8 text-3xl font-bold uppercase">Local service</h2><p className="mt-3 text-sm leading-6 text-[#adb8aa]">Bendigo based, covering the places central Victorian operators actually travel.</p></div><div className="bg-[#262d27] p-7"><CheckCircle2 className="text-[#83C438]" size={28} /><h2 className="display-face mt-8 text-3xl font-bold uppercase">Work that lasts</h2><p className="mt-3 text-sm leading-6 text-[#adb8aa]">Maintenance and repairs approached with the next job, not just today, in mind.</p></div></div></div></section>
         <section className="bg-[#dedbd0] px-5 py-12 sm:py-16 lg:px-8"><div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"><div><span className="eyebrow">Need a hand?</span><h2 className="display-face mt-4 text-[2.65rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-[4.9rem]">Let’s talk<br /><span className="text-[#83C438]">diesel.</span></h2></div><div><p className="max-w-xs text-sm leading-6 text-[#5f665c]">Call for a straightforward conversation about servicing, repairs, maintenance or a breakdown.</p><a href={phoneHref} className="mt-5 flex items-center gap-3 text-xl font-bold text-[#262d27]" data-testid="link-about-final-phone"><PhoneCall size={19} className="text-[#83C438]" /> {phone}</a></div></div></section>
      </main>
      <footer className="bg-[#1c201d] px-5 py-8 text-[#9ea99c] lg:px-8"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-4 text-xs sm:flex-row"><span>© {new Date().getFullYear()} JH Mechanical · Bendigo, Victoria</span><div className="flex gap-5"><Link href="/" className="hover:text-[#83C438]" data-testid="link-about-footer-home">Home</Link><a href="https://www.facebook.com/dieselmechbendigo" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#83C438]" data-testid="link-about-footer-facebook"><Facebook size={14} /> Facebook</a></div></div></footer>
    </div>
  );
}

export default About;