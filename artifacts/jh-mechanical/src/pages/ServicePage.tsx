import { useRoute } from 'wouter';
import { ArrowUpRight, CheckCircle2, ChevronRight, PhoneCall, Wrench, CircleAlert, Settings, MapPin } from 'lucide-react';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { SeoHead } from '@/components/layout/SeoHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NotFound from '@/pages/not-found';
import { Link } from 'wouter';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

export default function ServicePage({ slug }: { slug: string }) {
  const data = services[slug];
  
  if (!data) {
    return <NotFound />;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${window.location.origin}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': `${window.location.origin}/#services` },
          { '@type': 'ListItem', 'position': 3, 'name': data.h1, 'item': `${window.location.origin}/services/${data.slug}` }
        ]
      },
      {
        '@type': 'Service',
        'name': data.h1,
        'provider': {
          '@type': 'AutoRepair',
          'name': 'JH Mechanical',
          'telephone': '03 5448 8149'
        },
        'description': data.metaDescription
      }
    ]
  };

  return (
    <div className="jh-readable noise min-h-[100dvh] bg-[#f6f4ed] text-[#242a24] flex flex-col">
      <SeoHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonicalUrl={`${window.location.origin}/services/${data.slug}`}
        schema={schema}
      />
      <Header />
      
      <main id="main-content" className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-[#1c201d] px-5 pt-8 text-[#9ea99c] lg:px-8">
          <div className="mx-auto flex max-w-[1240px] items-center gap-2 text-xs font-medium uppercase tracking-widest">
            <Link href="/" className="hover:text-[#83c438] transition-colors" data-testid="breadcrumb-home">Home</Link>
            <ChevronRight size={14} />
            <a href="/#services" className="hover:text-[#83c438] transition-colors" data-testid="breadcrumb-services">Services</a>
            <ChevronRight size={14} />
            <span className="text-[#83c438]">{data.h1}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-[#1c201d] px-5 pb-12 pt-8 text-[#f2f0e8] sm:pb-16 sm:pt-12 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div className="reveal">
              <h1 className="display-face max-w-3xl text-[2.65rem] font-bold uppercase leading-[.86] tracking-[-.03em] sm:text-[4.6rem] text-[#83c438]">
                {data.h1}
              </h1>
              <p className="display-face mt-4 text-2xl font-bold uppercase tracking-wide text-[#f2f0e8] sm:text-3xl">
                {data.subtitle}
              </p>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#b9c1b7]">
                {data.intro}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={phoneHref} className="flex items-center justify-center gap-3 bg-[#83C438] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#1c201d] transition-colors hover:bg-[#94d14b]" data-testid="service-hero-call">
                  <PhoneCall size={17} /> Call {phone}
                </a>
                <Link href="/#quote" className="flex items-center justify-center gap-3 border border-[#5a6559] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] transition-colors hover:border-[#83C438]" data-testid="service-hero-quote">
                  Get a quote <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative aspect-[4/3.5] overflow-hidden border border-[#3b443b] bg-[#242a25]">
              <img src={data.heroImg} alt={data.h1} className="absolute inset-0 h-full w-full object-cover opacity-90" />
            </div>
          </div>
        </section>

        {/* Symptoms / Signs Section */}
        <section className="border-y border-[#d9d4c8] bg-[#eeece3]">
          <div className="mx-auto grid max-w-[1240px] items-center gap-8 px-5 py-10 sm:grid-cols-2 lg:px-8">
            <div>
              <span className="eyebrow">Signs you need help</span>
              <h2 className="display-face mt-3 text-3xl font-bold uppercase leading-tight sm:text-4xl text-[#1c201d]">
                When to call us
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#5e665c]">
                Heavy vehicles usually give warning signs before catastrophic failure. If you are experiencing any of these issues, it is time for a proper diagnostic look.
              </p>
            </div>
            <ul className="grid gap-3 sm:gap-4">
              {data.symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-3 rounded-sm bg-[#f8f7f2] p-4 shadow-sm border border-[#e2dfd5]">
                  <CircleAlert className="shrink-0 mt-0.5 text-[#83c438]" size={18} />
                  <span className="text-sm font-medium text-[#3b413a]">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Content Sections */}
        <section className="px-5 py-12 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1240px] grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="space-y-12">
              {data.sections.map((section, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#262d27] text-[#83c438]">
                      {index === 0 ? <Wrench size={20} /> : <Settings size={20} />}
                    </span>
                    <h2 className="display-face text-3xl font-bold uppercase tracking-tight text-[#1c201d]">{section.title}</h2>
                  </div>
                  <div className="space-y-4 pl-14">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-base leading-7 text-[#5e665c]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sidebar CTA & Links */}
            <div className="space-y-8">
              <div className="bg-[#262d27] p-8 text-[#f2f0e8] border border-[#3b443b]">
                <span className="eyebrow text-[#83c438]">Have ready</span>
                <h3 className="display-face mt-4 text-3xl font-bold uppercase leading-tight mb-5">
                  Speed up<br />the process
                </h3>
                <ul className="space-y-4 mb-8">
                  {data.callReady.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 border-b border-[#3b443b] pb-4 last:border-0 last:pb-0">
                      <CheckCircle2 size={18} className="shrink-0 text-[#83c438] mt-0.5" />
                      <span className="text-sm leading-6 text-[#bdc5ba]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#1c201d] p-5 border border-[#3b443b]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#83c438] mb-2">Speak to a mechanic</p>
                  <a href={phoneHref} className="text-2xl font-bold hover:text-[#83c438] transition-colors" data-testid="service-sidebar-phone">{phone}</a>
                </div>
              </div>

              {/* Related Areas */}
              {data.relatedAreas && data.relatedAreas.length > 0 && (
                <div className="bg-[#eeece3] p-6 border border-[#d9d4c8]">
                  <h4 className="display-face text-xl font-bold uppercase mb-4 text-[#1c201d] border-b-2 border-[#83c438] pb-2 inline-block">Areas we cover</h4>
                  <ul className="space-y-3">
                    {data.relatedAreas.map(slug => areas[slug]).filter(Boolean).map(area => (
                      <li key={area.slug}>
                        <Link href={`/service-areas/${area.slug}`} className="flex items-center gap-2 text-sm font-semibold text-[#5e665c] hover:text-[#83c438] transition-colors" data-testid={`link-related-area-${area.slug}`}>
                          <MapPin size={16} className="text-[#83c438]" /> {area.cityName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer CTA Banner */}
        <section className="bg-[#83c438] px-5 py-12 lg:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="display-face text-4xl font-bold uppercase leading-tight text-[#1c201d]">
                Ready to get started?
              </h2>
              <p className="mt-2 text-sm font-medium text-[#2f4216]">
                Talk directly to a mechanic about your heavy vehicle.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a href={phoneHref} className="flex flex-1 items-center justify-center gap-2 bg-[#1c201d] px-6 py-4 text-sm font-bold uppercase tracking-[.1em] text-[#f2f0e8] hover:bg-[#262d27] transition-colors" data-testid="service-footer-call">
                <PhoneCall size={18} className="text-[#83c438]" /> Call Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
