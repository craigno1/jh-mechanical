import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Facebook, MapPin, PhoneCall, ShieldCheck, Wrench } from 'lucide-react';
import logoPath from '@assets/image_1788154033698.png';
import storefrontImg from '@assets/image_1788154164791.png';

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
  return (
    <div className="noise min-h-[100dvh] bg-[#f6f4ed] text-[#242a24]">
      <AboutSeo />
      <header className="border-b border-[#303530] bg-[#1c201d] text-[#f2f0e8]">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex shrink-0 rounded-sm bg-[#fdfcf7] p-2 transition-opacity hover:opacity-90" data-testid="link-about-home-logo">
            <img src={logoPath} alt="JH Mechanical" className="h-[36px] w-auto sm:h-[44px] object-contain" />
          </Link>
          <div className="flex items-center gap-3"><Link href="/" className="hidden items-center gap-2 text-sm text-[#bec5b8] hover:text-[#83C438] sm:flex" data-testid="link-about-back"><ArrowLeft size={15} /> Back to home</Link><a href={phoneHref} className="flex items-center gap-2 bg-[#83C438] px-3 py-2 sm:px-4 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-[.08em] text-[#1c201d] hover:bg-[#94d14b]" data-testid="link-about-call"><PhoneCall size={14} className="sm:h-[15px] sm:w-[15px]" /> <span className="hidden sm:inline">Call </span>{phone}</a></div>
        </div>
      </header>
      <main>
        <section className="bg-[#1c201d] px-5 pb-20 pt-16 text-[#f2f0e8] sm:pb-28 sm:pt-24 lg:px-8"><div className="mx-auto grid max-w-[1240px] items-end gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><span className="eyebrow">About JH Mechanical</span><h1 className="display-face mt-6 max-w-3xl text-[3.8rem] font-bold uppercase leading-[.86] tracking-[-.03em] sm:text-[7rem]">Local know-how.<br /><span className="text-[#83C438]">Properly applied.</span></h1></div><p className="max-w-md border-l-2 border-[#83C438] pl-5 text-base leading-7 text-[#b9c1b7]">JH Mechanical is a Bendigo-based diesel mechanic for the people and businesses who rely on their vehicles to get the job done.</p></div></section>
        <section className="px-5 py-20 sm:py-28 lg:px-8">
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
              <h2 className="display-face mt-4 text-[3.8rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-7xl lg:text-[6.2rem]">Mechanics are<br /><span className="text-[#83C438]">about trust.</span></h2>
              <div className="mt-7 space-y-5 text-sm leading-7 text-[#5e665c]">
                <p>When a truck or work vehicle is off the road, the pressure is real. JH Mechanical keeps the process simple: listen carefully, diagnose properly, explain the options and do the work that needs doing.</p>
                <p>That means no unnecessary jargon and no disappearing behind a workshop counter. Just experienced, practical help for diesel vehicles, fleets and heavy-vehicle owners across Bendigo and the surrounding region.</p>
                <p>Whether you are planning a service, chasing an intermittent fault or standing beside a vehicle that has stopped, you can call and talk through the next step.</p>
              </div>
              <a href={phoneHref} className="mt-8 inline-flex items-center gap-3 bg-[#262d27] px-5 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] hover:bg-[#313c32]" data-testid="link-about-story-call"><PhoneCall size={17} className="text-[#83C438]" /> Talk to JH Mechanical</a>
            </div>
          </div>
        </section>
        <section className="bg-[#262d27] px-5 py-20 text-[#f2f0e8] sm:py-24 lg:px-8"><div className="mx-auto max-w-[1080px]"><div className="grid gap-px bg-[#4b574b] sm:grid-cols-3"><div className="bg-[#262d27] p-7"><ShieldCheck className="text-[#83C438]" size={28} /><h2 className="display-face mt-8 text-3xl font-bold uppercase">Clear advice</h2><p className="mt-3 text-sm leading-6 text-[#adb8aa]">You should understand the problem and the plan before work begins.</p></div><div className="bg-[#262d27] p-7"><MapPin className="text-[#83C438]" size={28} /><h2 className="display-face mt-8 text-3xl font-bold uppercase">Local service</h2><p className="mt-3 text-sm leading-6 text-[#adb8aa]">Bendigo based, covering the places central Victorian operators actually travel.</p></div><div className="bg-[#262d27] p-7"><CheckCircle2 className="text-[#83C438]" size={28} /><h2 className="display-face mt-8 text-3xl font-bold uppercase">Work that lasts</h2><p className="mt-3 text-sm leading-6 text-[#adb8aa]">Maintenance and repairs approached with the next job, not just today, in mind.</p></div></div></div></section>
        <section className="bg-[#dedbd0] px-5 py-20 sm:py-24 lg:px-8"><div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"><div><span className="eyebrow">Need a hand?</span><h2 className="display-face mt-4 text-[3.8rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-7xl">Let’s talk<br /><span className="text-[#83C438]">diesel.</span></h2></div><div><p className="max-w-xs text-sm leading-6 text-[#5f665c]">Call for a straightforward conversation about servicing, repairs, maintenance or a breakdown.</p><a href={phoneHref} className="mt-5 flex items-center gap-3 text-xl font-bold text-[#262d27]" data-testid="link-about-final-phone"><PhoneCall size={19} className="text-[#83C438]" /> {phone}</a></div></div></section>
      </main>
      <footer className="bg-[#1c201d] px-5 py-8 text-[#9ea99c] lg:px-8"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-4 text-xs sm:flex-row"><span>© {new Date().getFullYear()} JH Mechanical · Bendigo, Victoria</span><div className="flex gap-5"><Link href="/" className="hover:text-[#83C438]" data-testid="link-about-footer-home">Home</Link><a href="https://www.facebook.com/dieselmechbendigo" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#83C438]" data-testid="link-about-footer-facebook"><Facebook size={14} /> Facebook</a></div></div></footer>
    </div>
  );
}

export default About;