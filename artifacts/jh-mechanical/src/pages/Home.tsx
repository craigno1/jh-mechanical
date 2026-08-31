import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Facebook,
  Gauge,
  MapPin,
  Maximize2,
  Menu,
  Minus,
  Navigation,
  PhoneCall,
  Plus,
  Quote,
  ShieldCheck,
  Truck,
  Upload,
  Wrench,
  X,
} from 'lucide-react';
import logoPath from '@assets/image_1788152037725.png';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

const services = [
  { title: 'Diesel mechanic', text: 'Practical diagnosis and repairs for the engines that keep your work moving.', icon: Wrench },
  { title: 'Diesel servicing', text: 'Scheduled servicing that catches small problems before they become expensive ones.', icon: Gauge },
  { title: 'Vehicle maintenance', text: 'Maintenance plans for trucks, machinery and busy local fleets.', icon: ClipboardCheck },
  { title: 'Vehicle breakdown', text: 'A calm, capable response when a heavy vehicle stops where it should not.', icon: CircleAlert },
  { title: 'Vehicle repairs', text: 'Straight answers, quality parts and repairs made to work hard again.', icon: Truck },
];

const areas = ['Bendigo', 'Heathcote', 'Seymour', 'Macedon', 'Shepparton', 'Lockington', 'Melbourne', 'Sunbury'];

const faqs = [
  { q: 'What types of vehicles do you work on?', a: 'JH Mechanical works with diesel trucks, light commercial vehicles, fleet vehicles and a range of heavy vehicles. Call with the make, model and issue and we will tell you the best next step.' },
  { q: 'Do you help with vehicle breakdowns?', a: 'Yes. Breakdown help is available across Bendigo and surrounding areas, subject to location and availability. Call (03) 5448 8149 first so we can understand what has happened and get you moving safely.' },
  { q: 'How often should my diesel vehicle be serviced?', a: 'It depends on the vehicle, the work it does and its operating conditions. We can help set a sensible service rhythm around kilometres, engine hours or your fleet schedule.' },
  { q: 'Can I get an instant quote?', a: 'Send through your name, phone number and a short description of the job using the form below. Adding a photo can help us understand the issue before we speak.' },
  { q: 'Which areas around Bendigo do you cover?', a: 'JH Mechanical services Bendigo and surrounding Victoria, including Heathcote, Seymour, Macedon, Shepparton, Lockington, Melbourne and Sunbury.' },
];

function SeoHead() {
  useEffect(() => {
    document.title = 'JH Mechanical | Diesel Mechanic Bendigo & Surrounding Victoria';
    const description = 'Dependable diesel mechanic services in Bendigo and surrounding Victoria. JH Mechanical handles servicing, repairs, maintenance and heavy vehicle breakdown help.';
    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        document.head.appendChild(tag);
      }
      Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    };
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: document.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: window.location.origin + '/' });
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + '/';
    let schema = document.head.querySelector('#jh-faq-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'jh-faq-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    });
    return () => schema?.remove();
  }, []);
  return null;
}

function Header({ menuOpen, setMenuOpen, onQuote }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void; onQuote: () => void }) {
  const closeAnd = (action: () => void) => { action(); setMenuOpen(false); };
  return (
    <header className="sticky top-0 z-40 border-b border-[#303530] bg-[#1c201d]/95 text-[#f2f0e8] backdrop-blur-md">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#a4d45a] focus:px-4 focus:py-3 focus:text-[#1c201d]" data-testid="link-skip-content">Skip to content</a>
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group shrink-0" data-testid="link-home-logo">
          <span className="relative block h-[42px] w-[50px] shrink-0 overflow-hidden rounded-sm bg-white">
            <img src={logoPath} alt="JH Mark" className="absolute left-1/2 top-[-7px] w-[80px] max-w-none -translate-x-1/2" />
          </span>
          <div className="flex flex-col">
            <span className="display-face text-[24px] font-bold uppercase leading-none tracking-wide text-[#f2f0e8] transition-colors group-hover:text-[#a4d45a] sm:text-[26px]">JH Mechanical</span>
            <span className="mono-face mt-0.5 text-[10px] uppercase tracking-[0.15em] text-[#a4d45a] sm:text-[11px]">Diesel Mechanic · Bendigo VIC</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          <a href="#services" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#a4d45a]" data-testid="link-nav-services">Services</a>
          <a href="#areas" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#a4d45a]" data-testid="link-nav-areas">Service areas</a>
          <Link href="/about" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#a4d45a]" data-testid="link-nav-about">About JH</Link>
          <a href="#faq" className="text-sm text-[#d4d9d0] transition-colors hover:text-[#a4d45a]" data-testid="link-nav-faq">FAQ</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={phoneHref} className="flex items-center gap-2 text-sm font-semibold text-[#f2f0e8]" data-testid="link-header-phone"><PhoneCall size={16} className="text-[#a4d45a]" /> {phone}</a>
          <button onClick={onQuote} className="bg-[#a4d45a] px-4 py-3 text-xs font-bold uppercase tracking-[0.09em] text-[#1c201d] transition-colors hover:bg-[#c2eb7b]" data-testid="button-header-quote">Get a quote</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#f2f0e8] md:hidden shrink-0" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-[#303530] bg-[#242a25] px-5 pb-5 pt-2 md:hidden" aria-label="Mobile navigation">
          <a href="#services" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold" data-testid="link-mobile-services">Services</a>
          <a href="#areas" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold" data-testid="link-mobile-areas">Service areas</a>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold" data-testid="link-mobile-about">About JH</Link>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block border-b border-[#394139] py-4 text-sm font-semibold" data-testid="link-mobile-faq">FAQ</a>
          <div className="flex items-center gap-3 pt-4">
            <a href={phoneHref} className="flex flex-1 items-center justify-center gap-2 border border-[#596358] px-3 py-3 text-sm font-semibold" data-testid="link-mobile-phone"><PhoneCall size={16} className="text-[#a4d45a]" /> Call {phone}</a>
            <button onClick={() => closeAnd(onQuote)} className="bg-[#a4d45a] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#1c201d]" data-testid="button-mobile-quote">Quote</button>
          </div>
        </nav>
      )}
    </header>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  return (
    <div className="relative overflow-hidden bg-[#262d27] p-6 text-[#f2f0e8] shadow-[0_20px_60px_rgba(20,27,21,.2)] sm:p-8 lg:p-10">
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[22px] border-[#a4d45a]/10" />
      <div className="relative">
        {!submitted ? (
          <>
            <div className="mb-7">
              <span className="eyebrow">Free instant quote</span>
              <h2 className="display-face mt-3 text-4xl font-bold uppercase leading-[.94] tracking-tight text-[#f2f0e8] sm:text-5xl">Tell us what<br /><span className="text-[#a4d45a]">needs doing.</span></h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#b9c0b6]">A few details helps us call you back prepared. No hard sell, no run-around.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">Your name<input required name="name" type="text" placeholder="e.g. Chris Taylor" className="mt-2 block w-full border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-name" /></label>
                <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">Best phone number<input required name="phone" type="tel" placeholder="04xx xxx xxx" className="mt-2 block w-full border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-phone" /></label>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">What can we help with?<textarea required name="job" rows={4} placeholder="Tell us about the vehicle and the job..." className="mt-2 block w-full resize-none border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-job" /></label>
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-[#687467] bg-[#303930] px-4 py-3.5 text-sm text-[#d6ddd1] transition-colors hover:border-[#a4d45a]">
                <Upload size={18} className="shrink-0 text-[#a4d45a]" /><span className="min-w-0 truncate">{fileName || 'Add a photo of the vehicle or issue (optional)'}</span><input type="file" accept="image/*" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} data-testid="input-quote-photo" />
              </label>
              <button type="submit" className="flex w-full items-center justify-center gap-3 bg-[#a4d45a] px-5 py-4 text-sm font-bold uppercase tracking-[.1em] text-[#1c201d] transition-colors hover:bg-[#c2eb7b]" data-testid="button-submit-quote">Send quote request <ArrowUpRight size={17} /></button>
              <p className="text-center text-[11px] leading-5 text-[#899487]">We will use these details only to respond to your enquiry. For urgent breakdown help, call <a href={phoneHref} className="font-bold text-[#a4d45a]" data-testid="link-quote-phone">{phone}</a>.</p>
            </form>
          </>
        ) : (
          <div className="flex min-h-[445px] flex-col justify-center">
            <CheckCircle2 size={44} className="text-[#a4d45a]" />
            <span className="eyebrow mt-7">Request received</span>
            <h2 className="display-face mt-3 text-5xl font-bold uppercase leading-[.94]">Thanks —<br /><span className="text-[#a4d45a]">we have it.</span></h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#c1c9bd]">Your details are ready for the JH Mechanical team. For a faster answer, call us directly on <a href={phoneHref} className="font-semibold text-[#a4d45a]" data-testid="link-confirmation-phone">{phone}</a>.</p>
            <button onClick={() => setSubmitted(false)} className="mt-8 w-fit border border-[#5a6759] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] hover:border-[#a4d45a]" data-testid="button-new-quote">Send another request</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [mapZoom, setMapZoom] = useState(13);
  const scrollToQuote = () => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="noise min-h-[100dvh] overflow-hidden">
      <SeoHead />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onQuote={scrollToQuote} />
      <main id="main-content">
        <section className="relative bg-[#1c201d] text-[#f2f0e8]">
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
            <div className="reveal">
              <span className="eyebrow">Diesel mechanic · Bendigo VIC</span>
              <h1 className="display-face mt-6 max-w-3xl text-[3.8rem] font-bold uppercase leading-[.87] tracking-[-.03em] sm:text-[6.6rem] lg:text-[8rem]">Keep your<br /><span className="text-[#a4d45a]">work moving.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#bdc5ba] sm:text-lg">Straightforward diesel servicing, repairs and breakdown help for trucks, fleets and heavy vehicles across Bendigo and surrounding Victoria.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={scrollToQuote} className="flex items-center justify-center gap-3 bg-[#a4d45a] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#1c201d] hover:bg-[#c2eb7b]" data-testid="button-hero-quote">Get a free quote <ArrowUpRight size={17} /></button>
                <a href={phoneHref} className="flex items-center justify-center gap-3 border border-[#5a6559] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] hover:border-[#a4d45a]" data-testid="link-hero-call"><PhoneCall size={17} className="text-[#a4d45a]" /> Call {phone}</a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#353b35] pt-5 text-xs text-[#aab3a8]">
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#a4d45a]" /> Local and dependable</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#a4d45a]" /> Heavy vehicle focused</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#a4d45a]" /> No fuss, clear advice</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[500px] lg:ml-auto">
              <div className="relative aspect-[4/4.5] overflow-hidden border border-[#4a554b] bg-[#313a32]">
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, transparent 0 48%, #a4d45a 48% 49%, transparent 49%), linear-gradient(25deg, transparent 0 59%, #131713 59% 100%)' }} />
                <div className="absolute left-8 top-8 border-l border-t border-[#a4d45a] px-4 py-3 text-[10px] uppercase tracking-[.16em] text-[#bcd990]">On the tools<br /><span className="text-[#eef1e7]">When it matters</span></div>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-[#111511] to-transparent px-6 pb-7 pt-24">
                  <div><p className="mono-face text-xs uppercase tracking-[.15em] text-[#a4d45a]">JH / 01</p><p className="display-face mt-1 text-4xl font-bold uppercase">Built for the road</p></div>
                  <Wrench size={48} strokeWidth={1} className="text-[#a4d45a]" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#a4d45a] px-5 py-4 text-[#1c201d] shadow-lg sm:left-[-28px]"><p className="mono-face text-[10px] font-bold uppercase tracking-[.14em]">Call when it counts</p><a href={phoneHref} className="mt-1 block text-xl font-bold" data-testid="link-hero-card-phone">{phone}</a></div>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[#849083] lg:flex"><span className="h-px w-16 bg-[#526052]" />01 / 04</div>
        </section>

        <section className="border-b border-[#d9d4c8] bg-[#eeece3]">
          <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-9 sm:grid-cols-3 sm:gap-5 lg:px-8">
            <div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-[#76ae35]" size={22} /><div><h2 className="display-face text-xl font-bold uppercase">Less time off the road</h2><p className="mt-1 text-sm leading-5 text-[#5c6259]">Efficient diagnosis and repairs that respect your schedule.</p></div></div>
            <div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-[#76ae35]" size={22} /><div><h2 className="display-face text-xl font-bold uppercase">Advice you can trust</h2><p className="mt-1 text-sm leading-5 text-[#5c6259]">Clear recommendations, without the jargon or pressure.</p></div></div>
            <div className="flex gap-4"><Navigation className="mt-1 shrink-0 text-[#76ae35]" size={22} /><div><h2 className="display-face text-xl font-bold uppercase">Bendigo based</h2><p className="mt-1 text-sm leading-5 text-[#5c6259]">A local operator for local businesses and drivers.</p></div></div>
          </div>
        </section>

        <section id="services" className="bg-[#f6f4ed] px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><span className="eyebrow">What we do</span><h2 className="display-face mt-4 max-w-3xl text-[3.8rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-7xl lg:text-[7.2rem]">The right fix.<br /><span className="text-[#76ae35]">Done properly.</span></h2></div><p className="max-w-md text-sm leading-6 text-[#61675d] lg:mb-2">From routine diesel servicing to an unexpected breakdown, JH Mechanical keeps heavy vehicles safe, reliable and ready to earn their keep.</p></div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {services.map(({ title, text, icon: Icon }, index) => (
                <a href="#quote" key={title} className={`service-card group flex min-h-[286px] flex-col border border-[#d8d4c9] bg-[#f0eee6] p-5 sm:p-6 lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : index === 4 ? 'lg:col-start-4' : ''}`} data-testid={`link-service-${index}`}>
                  <div className="flex items-start justify-between"><Icon size={30} strokeWidth={1.5} className="text-[#76ae35]" /><ArrowUpRight size={19} className="text-[#9ea59a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
                  <h3 className="display-face mt-auto pt-12 text-[2.15rem] font-bold uppercase leading-[.9] tracking-[-.01em]">{title}</h3><p className="mt-3 text-sm leading-5 text-[#646b61]">{text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#262d27] px-5 py-20 text-[#f2f0e8] sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div><span className="eyebrow">The JH difference</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.92] sm:text-6xl">Capable hands.<br /><span className="text-[#a4d45a]">No drama.</span></h2><p className="mt-6 max-w-md text-sm leading-6 text-[#b9c1b7]">When your vehicle is part of how you make a living, you need more than a quick patch. You need someone who listens, knows diesel and tells you the truth about the job.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-[#a4d45a] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[#a4d45a]" data-testid="link-about-difference">Meet JH Mechanical <ArrowUpRight size={16} /></Link></div>
            <div className="grid gap-px bg-[#485348] sm:grid-cols-2">
              {[['01', 'Local knowledge', 'Bendigo based, with a practical understanding of the work and roads around central Victoria.'], ['02', 'Straight talking', 'We explain what is happening, what matters now and what can wait.'], ['03', 'Work-ready thinking', 'Repairs and maintenance decisions made around uptime, not guesswork.'], ['04', 'One call away', 'When the unexpected happens, you can speak to a real mechanic about the next move.']].map(([number, title, text]) => <div key={number} className="bg-[#262d27] p-6 sm:p-7"><span className="mono-face text-xs text-[#a4d45a]">{number}</span><h3 className="display-face mt-8 text-3xl font-bold uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-[#aeb7aa]">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="quote" className="bg-[#dedbd0] px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="pt-3"><span className="eyebrow">Let’s get moving</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.9] sm:text-7xl">Good work<br />starts with<br /><span className="text-[#76ae35]">a chat.</span></h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#5f665d]">Have a job in mind or a vehicle that will not cooperate? Send the details through and we will get back to you.</p><div className="mt-9 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#262d27] text-[#a4d45a]"><PhoneCall size={18} /></span><div><p className="mono-face text-[10px] uppercase tracking-[.12em] text-[#73796f]">Prefer to call?</p><a href={phoneHref} className="text-lg font-bold text-[#252b25]" data-testid="link-quote-section-phone">{phone}</a></div></div></div>
            <QuoteForm />
          </div>
        </section>

        <section className="bg-[#f6f4ed] px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1240px]"><div className="flex items-end justify-between gap-6"><div><span className="eyebrow">Work to come</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.93] sm:text-6xl">A look at<br /><span className="text-[#76ae35]">the work.</span></h2></div><span className="hidden text-right text-xs uppercase tracking-[.12em] text-[#7a8177] sm:block">Job gallery<br />Coming soon</span></div>
            <div className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_.7fr_.7fr]">
              <div className="flex min-h-[310px] flex-col justify-between bg-[#d6d3c8] p-6 sm:p-8"><div className="flex justify-between"><span className="mono-face text-xs text-[#697166]">PROJECT 001</span><Truck size={26} className="text-[#76ae35]" /></div><div><h3 className="display-face max-w-sm text-4xl font-bold uppercase leading-none text-[#30372f]">Real jobs.<br />Real vehicles.</h3><p className="mt-3 max-w-sm text-sm leading-5 text-[#656d63]">We are building a gallery of the jobs and machines that keep central Victoria moving.</p></div></div>
              <div className="flex min-h-[250px] items-end bg-[#b9c1b5] p-6" style={{ backgroundImage: 'linear-gradient(150deg, transparent 35%, #313a32 35% 36%, transparent 36%), linear-gradient(30deg, transparent 55%, #8ca374 55% 74%, transparent 74%)' }}><span className="mono-face text-[10px] uppercase tracking-[.12em] text-[#273027]">Photo slot / 02</span></div>
              <div className="flex min-h-[250px] items-end bg-[#c7c8bd] p-6" style={{ backgroundImage: 'linear-gradient(25deg, transparent 44%, #263026 44% 48%, transparent 48%), linear-gradient(120deg, transparent 58%, #91ad73 58% 72%, transparent 72%)' }}><span className="mono-face text-[10px] uppercase tracking-[.12em] text-[#465045]">Photo slot / 03</span></div>
            </div>
          </div>
        </section>

        <section id="areas" className="bg-[#e9e7de] px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><span className="eyebrow">Where we work</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.92] sm:text-6xl">Central Victoria<br /><span className="text-[#76ae35]">covered.</span></h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#626a60]">Based in Bendigo, JH Mechanical helps keep vehicles moving across the region and along the routes that connect it.</p><a href="https://www.google.com/maps/search/Bendigo+Victoria" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[#30372f] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[#30372f]" data-testid="link-map-directions"><MapPin size={16} className="text-[#76ae35]" /> Open Bendigo map <ArrowUpRight size={15} /></a></div>
            <div className="relative min-h-[360px] overflow-hidden border border-[#c3c5ba] bg-[#e1e3d8] shadow-[0_12px_25px_rgba(55,68,54,.08)] sm:min-h-[410px]">
              <div className="absolute inset-0" style={{ transform: `scale(${1 + (mapZoom - 13) * .025})`, transformOrigin: 'center' }}>
                <div className="absolute -left-[8%] top-[15%] h-[36%] w-[47%] rotate-[16deg] rounded-[45%] bg-[#c4d7c0]" />
                <div className="absolute -right-[12%] bottom-[2%] h-[31%] w-[45%] rotate-[-18deg] rounded-[50%] bg-[#cadbc1]" />
                <div className="absolute left-[9%] top-[45%] h-[18%] w-[22%] rotate-[-15deg] rounded-[48%] bg-[#c3d8c2]" />
                <div className="absolute -left-[10%] top-[68%] h-[12px] w-[125%] rotate-[-18deg] border-y border-[#aebdc1] bg-[#b9d2d2]" />
                <div className="absolute -left-[12%] top-[29%] h-[10px] w-[125%] rotate-[28deg] border-y border-[#d3c7a9] bg-[#fffdf2]" />
                <div className="absolute -left-[12%] top-[55%] h-[9px] w-[124%] rotate-[-8deg] border-y border-[#d3c7a9] bg-[#fffdf2]" />
                <div className="absolute left-[40%] top-[-12%] h-[125%] w-[10px] rotate-[21deg] border-x border-[#d3c7a9] bg-[#fffdf2]" />
                <div className="absolute left-[63%] top-[-15%] h-[130%] w-[7px] rotate-[-32deg] border-x border-[#d3c7a9] bg-[#fffdf2]" />
                <div className="absolute left-[20%] top-[4%] h-[92%] w-[4px] rotate-[43deg] bg-[#f8faf0]" />
                <div className="absolute left-[6%] top-[19%] h-[8px] w-[29%] rotate-[4deg] bg-[#fffdf2]" />
                <div className="absolute left-[49%] top-[37%] h-[10px] w-[31%] rotate-[74deg] bg-[#fffdf2]" />
                <div className="absolute left-[75%] top-[8%] h-[13%] w-[16%] border border-[#d0d4c8] bg-[#dbdfd1]" />
                <div className="absolute left-[70%] top-[72%] h-[12%] w-[23%] border border-[#d0d4c8] bg-[#dce0d2]" />
                <div className="absolute left-[17%] top-[72%] h-[10%] w-[20%] border border-[#d0d4c8] bg-[#dce0d2]" />
                <span className="absolute left-[28%] top-[25%] rotate-[28deg] text-[10px] text-[#7b8d80]">Bendigo Creek</span>
                <span className="absolute left-[12%] top-[14%] text-[10px] font-medium text-[#789177]">Kangaroo Flat</span>
                <span className="absolute right-[12%] top-[22%] text-[10px] font-medium text-[#789177]">Epsom</span>
                <span className="absolute left-[13%] bottom-[18%] text-[10px] font-medium text-[#789177]">Golden Square</span>
                <span className="absolute right-[8%] bottom-[17%] text-[10px] font-medium text-[#789177]">Strathfieldsaye</span>
                <span className="absolute left-[45%] top-[14%] rotate-[21deg] text-[9px] text-[#9b9f92]">High Street</span>
                <span className="absolute left-[56%] top-[59%] rotate-[-32deg] text-[9px] text-[#9b9f92]">McIvor Highway</span>
                <span className="absolute left-[18%] top-[65%] rotate-[-8deg] text-[9px] text-[#9b9f92]">Bendigo Creek Trail</span>
              </div>
              <div className="absolute left-5 top-5 rounded-sm bg-[#f8f9f1]/90 px-3 py-2 shadow-sm"><p className="mono-face text-[9px] uppercase tracking-[.14em] text-[#6d776b]">Service radius</p><p className="mt-0.5 text-xs font-semibold text-[#3d493d]">Central Victoria</p></div>
              <div className="absolute right-4 top-4 overflow-hidden rounded-sm border border-[#c9cdc1] bg-[#f8f9f1] shadow-sm">
                <button type="button" onClick={() => setMapZoom(Math.min(15, mapZoom + 1))} className="block border-b border-[#d5d8ce] p-2.5 text-[#4c5a4b] hover:bg-[#e7ecdf]" aria-label="Zoom in" data-testid="button-map-zoom-in"><Plus size={16} /></button>
                <button type="button" onClick={() => setMapZoom(Math.max(11, mapZoom - 1))} className="block border-b border-[#d5d8ce] p-2.5 text-[#4c5a4b] hover:bg-[#e7ecdf]" aria-label="Zoom out" data-testid="button-map-zoom-out"><Minus size={16} /></button>
                <button type="button" className="block p-2.5 text-[#4c5a4b] hover:bg-[#e7ecdf]" aria-label="Expand map" data-testid="button-map-expand"><Maximize2 size={15} /></button>
              </div>
              <div className="absolute left-[45%] top-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"><span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f7f8ef] bg-[#262d27] text-[#a4d45a] shadow-[0_3px_8px_rgba(25,38,25,.32)]"><MapPin size={22} fill="currentColor" /></span><span className="mt-2 rounded-sm bg-[#262d27] px-3 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] shadow-sm">Bendigo</span></div>
              <div className="absolute bottom-4 left-5 rounded-sm bg-[#f8f9f1]/85 px-2 py-1 text-[9px] text-[#7b8377]">Map data mockup · Bendigo VIC</div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#c8c8bd] pt-7 lg:col-start-2">{areas.map((area) => <a href="#quote" key={area} className="text-sm font-semibold text-[#3d453c] underline decoration-[#99bd62] decoration-2 underline-offset-4 hover:text-[#76ae35]" data-testid={`link-area-${area.toLowerCase()}`}>{area}</a>)}</div>
          </div>
        </section>

        <section className="bg-[#f6f4ed] px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1240px]"><div className="max-w-3xl"><span className="eyebrow">What people say</span><h2 className="display-face mt-4 text-[3.8rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-7xl lg:text-[7.2rem]">Good operators<br /><span className="text-[#76ae35]">notice good work.</span></h2></div><div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[['“The kind of mechanic you want when the truck is your livelihood. Clear about the issue and got us back on the road.”', 'Illustrative placeholder', 'Fleet operator · Bendigo'], ['“No fuss, no guessing. JH explained what needed doing and what could wait — exactly what you want from a local trade.”', 'Illustrative placeholder', 'Owner-driver · Heathcote'], ['“A practical answer when we needed one. The follow-up advice was as valuable as the repair itself.”', 'Illustrative placeholder', 'Workshop customer · Central Victoria']].map(([quote, name, role], index) => <figure key={index} className="border-t-2 border-[#a4d45a] bg-[#eeece3] p-6 sm:p-8" data-testid={`testimonial-${index}`}><Quote size={25} className="text-[#76ae35]" /><blockquote className="mt-6 text-lg font-medium leading-7 text-[#333a32]">{quote}</blockquote><figcaption className="mt-8 border-t border-[#d2d0c5] pt-4"><p className="text-sm font-bold text-[#333a32]">{name}</p><p className="mt-1 text-xs text-[#71786e]">{role}</p></figcaption></figure>)}
          </div><p className="mt-6 text-xs text-[#81877c]">Testimonials shown above are illustrative placeholders for the finished website.</p></div>
        </section>

        <section id="faq" className="bg-[#dedbd0] px-5 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-[1000px] gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><span className="eyebrow">Questions, answered</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.92] sm:text-6xl">No guesswork<br /><span className="text-[#76ae35]">here.</span></h2><p className="mt-6 text-sm leading-6 text-[#646b61]">Still unsure? Give us a call and we will point you in the right direction.</p><a href={phoneHref} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#30372f]" data-testid="link-faq-phone"><PhoneCall size={16} className="text-[#76ae35]" /> {phone}</a></div><div className="border-t border-[#bcbdb2]">{faqs.map((faq, index) => <div key={faq.q} className="border-b border-[#bcbdb2]"><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-bold text-[#30372f]" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{faq.q}</span><ChevronDown size={19} className={`shrink-0 text-[#76ae35] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-[#62695f]" data-testid={`answer-faq-${index}`}>{faq.a}</p>}</div>)}</div></div>
        </section>
      </main>
      <footer className="bg-[#1c201d] px-5 pb-7 pt-16 text-[#e9ece4] lg:px-8">
        <div className="mx-auto max-w-[1240px]"><div className="grid gap-12 border-b border-[#3b443b] pb-12 md:grid-cols-[1.4fr_.8fr_.8fr_1fr]"><div><div className="flex items-center gap-3">
          <span className="relative block h-[42px] w-[50px] shrink-0 overflow-hidden rounded-sm bg-white">
            <img src={logoPath} alt="JH Mark" className="absolute left-1/2 top-[-7px] w-[80px] max-w-none -translate-x-1/2" />
          </span>
          <div className="flex flex-col">
            <span className="display-face text-2xl font-bold uppercase leading-none tracking-wide text-[#f2f0e8]">JH Mechanical</span>
            <span className="mono-face mt-0.5 text-[10px] uppercase tracking-[0.15em] text-[#a4d45a]">Diesel Mechanic · Bendigo VIC</span>
          </div>
        </div><p className="mt-6 max-w-xs text-sm leading-6 text-[#aeb7a9]">Diesel mechanic services for trucks, fleets and heavy vehicles across Bendigo and surrounding Victoria.</p><a href={phoneHref} className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#a4d45a]" data-testid="link-footer-phone"><PhoneCall size={16} /> {phone}</a></div><div><h2 className="mono-face text-[10px] font-bold uppercase tracking-[.15em] text-[#a4d45a]">Navigate</h2><div className="mt-5 flex flex-col gap-3 text-sm text-[#c4ccc1]"><a href="#services" data-testid="link-footer-services">Services</a><a href="#areas" data-testid="link-footer-areas">Service areas</a><Link href="/about" data-testid="link-footer-about">About JH</Link><a href="#faq" data-testid="link-footer-faq">FAQ</a></div></div><div><h2 className="mono-face text-[10px] font-bold uppercase tracking-[.15em] text-[#a4d45a]">Services</h2><div className="mt-5 flex flex-col gap-3 text-sm text-[#c4ccc1]"><a href="#quote" data-testid="link-footer-diesel">Diesel mechanic</a><a href="#quote" data-testid="link-footer-servicing">Diesel servicing</a><a href="#quote" data-testid="link-footer-maintenance">Vehicle maintenance</a><a href="#quote" data-testid="link-footer-breakdown">Vehicle breakdown</a><a href="#quote" data-testid="link-footer-repairs">Vehicle repairs</a></div></div><div><h2 className="mono-face text-[10px] font-bold uppercase tracking-[.15em] text-[#a4d45a]">Find us online</h2><a href="https://www.facebook.com/dieselmechbendigo" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[#c4ccc1] hover:text-[#a4d45a]" data-testid="link-footer-facebook"><Facebook size={17} /> Facebook</a><div className="mt-8 border-l-2 border-[#a4d45a] pl-4 text-xs leading-5 text-[#9ea99c]">Bendigo and surrounding areas<br />Victoria, Australia</div></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-xs text-[#879185] sm:flex-row"><span>© {new Date().getFullYear()} JH Mechanical. Diesel mechanic, Bendigo.</span><span className="mono-face text-[10px] uppercase tracking-[.12em]">Keep your work moving.</span></div></div>
      </footer>
      <a href={phoneHref} className="fixed bottom-4 right-4 z-30 flex items-center gap-2 bg-[#a4d45a] px-4 py-3 text-xs font-bold uppercase tracking-[.08em] text-[#1c201d] shadow-xl md:hidden" data-testid="link-floating-call"><PhoneCall size={16} /> Call JH</a>
    </div>
  );
}

export default Home;