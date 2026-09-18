import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Gauge,
  MapPin,
  Navigation,
  PhoneCall,
  Quote,
  ShieldCheck,
  Truck,
  Upload,
  Wrench,
} from 'lucide-react';
import heroImg from '@assets/image_1788154192187.png';
import gallery1 from '@assets/image_1788154081149.png';
import gallery2 from '@assets/image_1788154100216.png';
import gallery3 from '@assets/image_1788154109579.png';
import gallery4 from '@assets/image_1788154125619.png';
import gallery5 from '@assets/image_1788154241783.png';
import repairsTileImg from '@assets/image_1789720432544.png';
import breakdownTileImg from '@assets/image_1789720831776.png';
import maintenanceTileImg from '@assets/image_1789721445475.png';
import mechanicTileImg from '@assets/Screenshot_2026-09-18_184252_1789721472137.png';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SeoHead } from '@/components/layout/SeoHead';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { getSiteUrl } from '@/lib/site-url';
import { getBusinessSchema } from '@/lib/business-schema';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

const faqs = [
  { q: 'What types of vehicles do you work on?', a: 'JH Mechanical works with diesel trucks, light commercial vehicles, fleet vehicles and a range of heavy vehicles. Call with the make, model and issue and we will tell you the best next step.' },
  { q: 'Do you help with vehicle breakdowns?', a: 'Yes. Breakdown help is available across Bendigo and surrounding areas, subject to location and availability. Call (03) 5448 8149 first so we can understand what has happened and get you moving safely.' },
  { q: 'How often should my diesel vehicle be serviced?', a: 'It depends on the vehicle, the work it does and its operating conditions. We can help set a sensible service rhythm around kilometres, engine hours or your fleet schedule.' },
  { q: 'Can I get an instant quote?', a: 'Send through your name, phone number and a short description of the job using the form below. Adding a photo can help us understand the issue before we speak.' },
  { q: 'Which areas around Bendigo do you cover?', a: 'JH Mechanical services Bendigo and surrounding Victoria, including Heathcote, Seymour, Macedon, Shepparton, Lockington, Melbourne and Sunbury.' },
];

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  return (
    <div className="relative overflow-hidden bg-[#262d27] p-6 text-[#f2f0e8] shadow-[0_20px_60px_rgba(20,27,21,.2)] sm:p-8 lg:p-10">
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[22px] border-[#83C438]/10" />
      <div className="relative">
        {!submitted ? (
          <>
            <div className="mb-7">
              <span className="eyebrow">Free instant quote</span>
              <h2 className="display-face mt-3 text-4xl font-bold uppercase leading-[.94] tracking-tight text-[#f2f0e8] sm:text-5xl">Tell us what<br /><span className="text-[#83C438]">needs doing.</span></h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#b9c0b6]">A few details helps us call you back prepared. No hard sell, no run-around.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">Your name<input required name="name" type="text" placeholder="e.g. Chris Taylor" className="mt-2 block w-full border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-name" /></label>
                <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">Best phone number<input required name="phone" type="tel" placeholder="04xx xxx xxx" className="mt-2 block w-full border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-phone" /></label>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">What can we help with?<textarea required name="job" rows={4} placeholder="Tell us about the vehicle and the job..." className="mt-2 block w-full resize-none border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-job" /></label>
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-[#687467] bg-[#303930] px-4 py-3.5 text-sm text-[#d6ddd1] transition-colors hover:border-[#83C438]">
                <Upload size={18} className="shrink-0 text-[#83C438]" /><span className="min-w-0 truncate">{fileName || 'Add a photo of the vehicle or issue (optional)'}</span><input type="file" accept="image/*" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} data-testid="input-quote-photo" />
              </label>
              <button type="submit" className="flex w-full items-center justify-center gap-3 bg-[#83C438] px-5 py-4 text-sm font-bold uppercase tracking-[.1em] text-[#1c201d] transition-colors hover:bg-[#94d14b]" data-testid="button-submit-quote">Send quote request <ArrowUpRight size={17} /></button>
              <p className="text-center text-[11px] leading-5 text-[#899487]">We will use these details only to respond to your enquiry. For urgent breakdown help, call <a href={phoneHref} className="font-bold text-[#83C438]" data-testid="link-quote-phone">{phone}</a>.</p>
            </form>
          </>
        ) : (
          <div className="flex min-h-[445px] flex-col justify-center">
            <CheckCircle2 size={44} className="text-[#83C438]" />
            <span className="eyebrow mt-7">Request received</span>
            <h2 className="display-face mt-3 text-5xl font-bold uppercase leading-[.94]">Thanks —<br /><span className="text-[#83C438]">we have it.</span></h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#c1c9bd]">Your details are ready for the JH Mechanical team. For a faster answer, call us directly on <a href={phoneHref} className="font-semibold text-[#83C438]" data-testid="link-confirmation-phone">{phone}</a>.</p>
            <button onClick={() => setSubmitted(false)} className="mt-8 w-fit border border-[#5a6759] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] hover:border-[#83C438]" data-testid="button-new-quote">Send another request</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const scrollToQuote = () => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const siteUrl = getSiteUrl();

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      getBusinessSchema(siteUrl),
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        url: `${siteUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
      },
    ],
  };

  const servicesList = [
    { ...services['diesel-mechanic'], icon: Wrench, image: mechanicTileImg },
    { ...services['diesel-servicing'], icon: Gauge, image: gallery4 },
    { ...services['vehicle-maintenance'], icon: ClipboardCheck, image: maintenanceTileImg },
    { ...services['vehicle-breakdown'], icon: CircleAlert, image: breakdownTileImg },
    { ...services['vehicle-repairs'], icon: Truck, image: repairsTileImg },
  ];

  return (
    <div className="jh-readable noise min-h-[100dvh] overflow-hidden bg-[#f6f4ed]">
      <SeoHead
        title="JH Mechanical | Diesel Mechanic Bendigo & Surrounding Victoria"
        description="Dependable diesel mechanic services in Bendigo and surrounding Victoria. JH Mechanical handles servicing, repairs, maintenance and heavy vehicle breakdown help."
        canonicalUrl={`${siteUrl}/`}
        schema={homeSchema}
      />
      <Header />
      
      <main id="main-content">
        <section className="relative bg-[#1c201d] text-[#f2f0e8]">
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
            <div className="reveal">
              <h1 className="display-face max-w-3xl text-[2.65rem] font-bold uppercase leading-[.87] tracking-[-.03em] sm:text-[4.6rem] lg:text-[5.6rem]">Victoria's trusted<br /><span className="text-[#83C438]">diesel mechanic.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#bdc5ba] sm:text-lg">Straightforward diesel servicing, repairs and breakdown help for trucks, fleets and heavy vehicles across Bendigo and surrounding Victoria.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={scrollToQuote} className="flex items-center justify-center gap-3 bg-[#83C438] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#1c201d] hover:bg-[#94d14b]" data-testid="button-hero-quote">Get a free quote <ArrowUpRight size={17} /></button>
                <a href={phoneHref} className="flex items-center justify-center gap-3 border border-[#5a6559] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] hover:border-[#83C438]" data-testid="link-hero-call"><PhoneCall size={17} className="text-[#83C438]" /> Call {phone}</a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#353b35] pt-5 text-xs text-[#aab3a8]">
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#83C438]" /> Local and dependable</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#83C438]" /> Heavy vehicle focused</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#83C438]" /> No fuss, clear advice</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[500px] lg:ml-auto">
              <div className="relative aspect-[4/4.5] overflow-hidden border border-[#3b443b] bg-[#1c201d]">
                <img src={heroImg} alt="JH Mechanical working on a heavy vehicle" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111511]/90 via-[#111511]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="display-face text-3xl font-bold uppercase text-[#f2f0e8]">Keep your work moving</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[#849083] lg:flex"><span className="h-px w-16 bg-[#526052]" />01 / 04</div>
        </section>

        <section className="border-b border-[#d9d4c8] bg-[#eeece3]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-7 sm:grid-cols-3 sm:gap-5 lg:px-8">
            <div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-[#83C438]" size={22} /><div><h2 className="display-face text-xl font-bold uppercase">Less time off the road</h2><p className="mt-1 text-sm leading-5 text-[#5c6259]">Efficient diagnosis and repairs that respect your schedule.</p></div></div>
            <div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-[#83C438]" size={22} /><div><h2 className="display-face text-xl font-bold uppercase">Advice you can trust</h2><p className="mt-1 text-sm leading-5 text-[#5c6259]">Clear recommendations, without the jargon or pressure.</p></div></div>
            <div className="flex gap-4"><Navigation className="mt-1 shrink-0 text-[#83C438]" size={22} /><div><h2 className="display-face text-xl font-bold uppercase">Bendigo based</h2><p className="mt-1 text-sm leading-5 text-[#5c6259]">A local operator for local businesses and drivers.</p></div></div>
          </div>
        </section>

        <section id="services" className="bg-[#f6f4ed] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><h2 className="display-face text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl text-[#1c201d]">Our services</h2></div><p className="max-w-md text-sm leading-6 text-[#61675d] lg:mb-1">From routine diesel servicing to an unexpected breakdown, JH Mechanical keeps heavy vehicles safe, reliable and ready to earn their keep.</p></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {servicesList.map(({ slug, h1, subtitle, icon: Icon, image }, index) => (
                <Link href={`/services/${slug}`} key={slug} className={`service-card group relative isolate flex min-h-[267px] overflow-hidden border border-[#485348] p-5 text-[#f2f0e8] lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : index === 4 ? 'lg:col-start-4' : ''}`}>
                  <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#111611]/70 via-[#111611]/48 to-[#111611]/95" />
                  <div className="flex w-full flex-col">
                    <div className="flex items-start justify-between"><Icon size={39} strokeWidth={1.7} className="text-[#83C438] drop-shadow-[0_2px_3px_rgba(0,0,0,.8)]" /><ArrowUpRight size={21} className="text-[#f2f0e8] drop-shadow-[0_2px_3px_rgba(0,0,0,.8)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
                    <h3 className="display-face mt-auto pt-3 text-[2rem] font-bold uppercase leading-[1.1] tracking-[-.01em] text-[#f2f0e8] drop-shadow-[0_2px_4px_rgba(0,0,0,.9)] transition-colors group-hover:text-[#83C438] lg:text-[2.2rem]">{h1}</h3>
                    <p className="mt-3 text-sm leading-5 text-[#f2f0e8] drop-shadow-[0_1px_3px_rgba(0,0,0,.95)]">{subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#262d27] px-5 py-10 text-[#f2f0e8] sm:py-14 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div><span className="eyebrow">The JH difference</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.92] sm:text-6xl">Capable hands.<br /><span className="text-[#83C438]">No drama.</span></h2><p className="mt-6 max-w-md text-sm leading-6 text-[#b9c1b7]">When your vehicle is part of how you make a living, you need more than a quick patch. You need someone who listens, knows diesel and tells you the truth about the job.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-[#83C438] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[#83C438]" data-testid="link-about-difference">Meet JH Mechanical <ArrowUpRight size={16} /></Link></div>
            <div className="grid gap-px bg-[#485348] sm:grid-cols-2">
              {[['01', 'Local knowledge', 'Bendigo based, with a practical understanding of the work and roads around central Victoria.'], ['02', 'Straight talking', 'We explain what is happening, what matters now and what can wait.'], ['03', 'Work-ready thinking', 'Repairs and maintenance decisions made around uptime, not guesswork.'], ['04', 'One call away', 'When the unexpected happens, you can speak to a real mechanic about the next move.']].map(([number, title, text]) => <div key={number} className="bg-[#262d27] p-6 sm:p-7"><span className="mono-face text-base text-[#83C438]">{number}</span><h3 className="display-face mt-8 text-3xl font-bold uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-[#aeb7aa]">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="quote" className="bg-[#dedbd0] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
             <div className="pt-3"><span className="eyebrow">Let’s get moving</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.9] sm:text-7xl">Good work<br />starts with<br /><span className="text-[#83C438]">a chat.</span></h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#5f665d]">Have a job in mind or a vehicle that will not cooperate? Send the details through and we will get back to you.</p><div className="mt-9 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#262d27] text-[#83C438]"><PhoneCall size={18} /></span><div><p className="mono-face text-[13px] uppercase tracking-[.12em] text-[#73796f]">Prefer to call?</p><a href={phoneHref} className="text-lg font-bold text-[#252b25]" data-testid="link-quote-section-phone">{phone}</a></div></div><p className="mt-5 border-l-2 border-[#83C438] pl-4 text-base font-semibold text-[#3f473d]">If it's not on the services list, just ask!</p></div>
            <QuoteForm />
          </div>
        </section>

        <section className="bg-[#f6f4ed] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h2 className="display-face text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl text-[#1c201d]">Recent Work</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 overflow-hidden bg-[#242a25]"><img src={gallery1} alt="Recent diesel mechanic work in Bendigo" className="h-full w-full object-cover min-h-[300px] opacity-90 transition-transform duration-700 hover:scale-105" loading="lazy" /></div>
              <div className="overflow-hidden bg-[#242a25]"><img src={gallery2} alt="JH Mechanical working on a heavy vehicle" className="h-full w-full object-cover min-h-[300px] opacity-90 transition-transform duration-700 hover:scale-105" loading="lazy" /></div>
              <div className="overflow-hidden bg-[#242a25]"><img src={gallery3} alt="Truck maintenance in central Victoria" className="h-full w-full object-cover min-h-[250px] opacity-90 transition-transform duration-700 hover:scale-105" loading="lazy" /></div>
              <div className="overflow-hidden bg-[#242a25]"><img src={gallery4} alt="Diesel servicing" className="h-full w-full object-cover min-h-[250px] opacity-90 transition-transform duration-700 hover:scale-105" loading="lazy" /></div>
              <div className="overflow-hidden bg-[#242a25]"><img src={gallery5} alt="Heavy vehicle repair" className="h-full w-full object-cover min-h-[250px] opacity-90 transition-transform duration-700 hover:scale-105" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <section id="areas" className="bg-[#e9e7de] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-9 lg:grid-cols-[.8fr_1.2fr]">
            <div><span className="eyebrow">Where we work</span><h2 className="display-face mt-4 text-5xl font-bold uppercase leading-[.92] sm:text-6xl">Central Victoria<br /><span className="text-[#83C438]">covered.</span></h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#626a60]">Based at Unit 3/39 Collins St in Kangaroo Flat, JH Mechanical helps keep vehicles moving across Bendigo and the wider region.</p><a href="https://www.google.com/maps/search/?api=1&query=Unit%203%2F39%20Collins%20St%2C%20Kangaroo%20Flat%20VIC%203555" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[#30372f] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[#30372f]" data-testid="link-map-directions"><MapPin size={16} className="text-[#83C438]" /> Open workshop map <ArrowUpRight size={15} /></a></div>
            <div className="relative min-h-[360px] overflow-hidden border border-[#c3c5ba] bg-[#e1e3d8] shadow-[0_12px_25px_rgba(55,68,54,.08)] sm:min-h-[410px]">
              <iframe
                title="JH Mechanical workshop at Unit 3/39 Collins Street, Kangaroo Flat"
                src="https://www.google.com/maps?q=Unit%203%2F39%20Collins%20St%2C%20Kangaroo%20Flat%20VIC%203555&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0 opacity-90 sepia-[.1] contrast-[.9]"
              />
              <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-sm bg-[#f8f9f1]/95 px-3 py-2 shadow-md">
                <p className="mono-face text-[9px] uppercase tracking-[.14em] text-[#6d776b]">Service radius</p>
                <p className="mt-0.5 text-xs font-semibold text-[#3d493d]">Central Victoria</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#c8c8bd] pt-7 lg:col-start-2">
              {Object.values(areas).map((area) => (
                <Link href={`/service-areas/${area.slug}`} key={area.slug} className="text-xl font-semibold text-[#3d453c] underline decoration-[#99bd62] decoration-2 underline-offset-4 hover:text-[#83C438]">
                  {area.cityName}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f4ed] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1240px]"><div className="max-w-3xl"><span className="eyebrow">What people say</span><h2 className="display-face mt-4 text-[2.65rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-[4.9rem] lg:text-[5rem]">Good operators<br /><span className="text-[#83C438]">notice good work.</span></h2></div><div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[['“The kind of mechanic you want when the truck is your livelihood. Clear about the issue and got us back on the road.”', 'Illustrative placeholder', 'Fleet operator · Bendigo'], ['“No fuss, no guessing. JH explained what needed doing and what could wait — exactly what you want from a local trade.”', 'Illustrative placeholder', 'Owner-driver · Heathcote'], ['“A practical answer when we needed one. The follow-up advice was as valuable as the repair itself.”', 'Illustrative placeholder', 'Workshop customer · Central Victoria']].map(([quote, name, role], index) => <figure key={index} className="border-t-2 border-[#83C438] bg-[#eeece3] p-6 sm:p-8" data-testid={`testimonial-${index}`}><Quote size={25} className="text-[#83C438]" /><blockquote className="mt-6 text-lg font-medium leading-7 text-[#333a32]">{quote}</blockquote><figcaption className="mt-8 border-t border-[#d2d0c5] pt-4"><p className="text-sm font-bold text-[#333a32]">{name}</p><p className="mt-1 text-xs text-[#71786e]">{role}</p></figcaption></figure>)}
          </div><p className="mt-6 text-xs text-[#81877c]">Testimonials shown above are illustrative placeholders for the finished website.</p></div>
        </section>

        <section id="faq" className="bg-[#dedbd0] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[768px]">
            <div className="text-center"><span className="eyebrow">Got questions?</span><h2 className="display-face mt-4 text-[2.65rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-[4.9rem]">Frequently asked questions.</h2></div>
            <div className="mt-10 divide-y divide-[#c1beaf] border-y border-[#c1beaf]">
              {faqs.map((faq, i) => (
                <details key={i} className="group" open={i === openFaq} onToggle={(e) => { if (e.currentTarget.open) setOpenFaq(i); }}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-lg font-bold text-[#2d332c] list-none transition-colors hover:text-[#83C438]"><span className="pr-4">{faq.q}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#b2b0a3] text-[#83C438] group-open:bg-[#83C438] group-open:text-[#1c201d]"><ArrowUpRight size={16} className="transition-transform group-open:rotate-45" /></span></summary>
                  <p className="pb-6 text-sm leading-6 text-[#5b615a] pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-sm text-[#5b615a]">Have a different question?</p>
              <a href={phoneHref} className="inline-flex items-center gap-2 border-b-2 border-[#83C438] pb-1 text-lg font-bold text-[#2d332c] transition-colors hover:text-[#83C438]"><PhoneCall size={18} /> {phone}</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
