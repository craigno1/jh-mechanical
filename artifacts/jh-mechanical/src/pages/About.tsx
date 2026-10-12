import { ResponsiveImage } from '@/components/ResponsiveImage';
import { Link } from 'wouter';
import { ArrowUpRight, CheckCircle2, MapPin, PhoneCall, ShieldCheck, Wrench } from 'lucide-react';
import storefrontImg from '@/assets/optimized/image_1788154164791.webp';
import teamImg from '@/assets/optimized/image_1788177487503.webp';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SeoHead } from '@/components/layout/SeoHead';
import { getSiteUrl } from '@/lib/site-url';
import { getBusinessId, getBusinessSchema } from '@/lib/business-schema';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

function About() {
  const siteUrl = getSiteUrl();
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      getBusinessSchema(siteUrl),
      {
        '@type': 'AboutPage',
        '@id': `${siteUrl}/about#webpage`,
        name: 'About JH Mechanical',
        url: `${siteUrl}/about`,
        mainEntity: {
          '@id': getBusinessId(siteUrl),
        },
      },
    ],
  };

  return (
    <div className="jh-readable noise min-h-[100dvh] bg-[#f6f4ed] text-[#242a24] flex flex-col">
      <SeoHead
        title="About JH Mechanical | Local Diesel Mechanic in Bendigo"
        description="Meet JH Mechanical, a practical and dependable Bendigo diesel mechanic supporting trucks, fleets and heavy vehicles across central Victoria."
        canonicalUrl={`${siteUrl}/about`}
        schema={aboutSchema}
      />
      <Header />
      
      <main id="main-content" className="flex-1">
         <section className="bg-[#1c201d] px-5 pb-8 pt-12 text-[#f2f0e8] sm:pb-10 sm:pt-16 lg:px-8">
           <div className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[1fr_.9fr]">
             <div>
               <span className="eyebrow">About JH Mechanical</span>
               <h1 className="display-face mt-5 max-w-3xl text-[2.65rem] font-bold uppercase leading-[.86] tracking-[-.03em] sm:text-[4.9rem]">
                 Local know-how.<br /><span className="text-[#83C438]">Properly applied.</span>
               </h1>
               <p className="mt-7 max-w-md border-l-2 border-[#83C438] pl-5 text-base leading-7 text-[#b9c1b7]">
                 JH Mechanical is a Bendigo-based diesel mechanic for the people and businesses who rely on their vehicles to get the job done.
               </p>
             </div>
             <div className="reveal reveal-delay-1">
               <div className="relative aspect-[4/3] overflow-hidden bg-[#242a25]">
                 <ResponsiveImage src={teamImg} sizes="(min-width: 1144px) 510px, (min-width: 1024px) calc((100vw - 96px) / 2), calc(100vw - 40px)" alt="JH Mechanical owner and family beside a service vehicle" className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
               </div>
             </div>
           </div>
         </section>

          <section className="px-5 py-12 sm:py-[4.5rem] lg:px-8">
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative min-h-[410px] overflow-hidden bg-[#242a25] shadow-sm">
              <ResponsiveImage src={storefrontImg} sizes="(min-width: 1144px) 465px, (min-width: 1024px) calc((100vw - 112px) * .45), calc(100vw - 40px)" alt="JH Mechanical workshop" className="absolute inset-0 h-full w-full object-cover opacity-90" />
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

        <section className="bg-[#262d27] px-5 py-12 text-[#f2f0e8] sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1080px]">
            <div className="grid gap-px bg-[#4b574b] sm:grid-cols-3">
              <div className="bg-[#262d27] p-7">
                <ShieldCheck className="text-[#83C438]" size={28} />
                <h2 className="display-face mt-8 text-3xl font-bold uppercase">Clear advice</h2>
                <p className="mt-3 text-sm leading-6 text-[#adb8aa]">You should understand the problem and the plan before work begins.</p>
              </div>
              <div className="bg-[#262d27] p-7">
                <MapPin className="text-[#83C438]" size={28} />
                <h2 className="display-face mt-8 text-3xl font-bold uppercase">Local service</h2>
                <p className="mt-3 text-sm leading-6 text-[#adb8aa]">Bendigo based, covering the places central Victorian operators actually travel.</p>
              </div>
              <div className="bg-[#262d27] p-7">
                <CheckCircle2 className="text-[#83C438]" size={28} />
                <h2 className="display-face mt-8 text-3xl font-bold uppercase">Work that lasts</h2>
                <p className="mt-3 text-sm leading-6 text-[#adb8aa]">Maintenance and repairs approached with the next job, not just today, in mind.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#dedbd0] px-5 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Need a hand?</span>
              <h2 className="display-face mt-4 text-[2.65rem] font-bold uppercase leading-[.88] tracking-[-.02em] sm:text-[4.9rem]">
                Let’s talk<br /><span className="text-[#83C438]">diesel.</span>
              </h2>
            </div>
            <div>
              <p className="max-w-xs text-sm leading-6 text-[#5f665c]">
                Call for a straightforward conversation about servicing, repairs, maintenance or a breakdown.
              </p>
              <a href={phoneHref} className="mt-5 flex items-center gap-3 text-xl font-bold text-[#262d27] transition-colors hover:text-[#83C438]" data-testid="link-about-final-phone">
                <PhoneCall size={19} className="text-[#83C438]" /> {phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;
