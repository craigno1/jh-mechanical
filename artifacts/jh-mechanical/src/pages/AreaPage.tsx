import { ChevronRight, PhoneCall, MapPin, CheckCircle2, ArrowUpRight, CircleAlert, Wrench } from 'lucide-react';
import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { SeoHead } from '@/components/layout/SeoHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NotFound from '@/pages/not-found';
import { Link } from 'wouter';
import { getSiteUrl } from '@/lib/site-url';
import { getBusinessId, getBusinessSchema } from '@/lib/business-schema';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

export default function AreaPage({ slug }: { slug: string }) {
  const data = areas[slug];
  
  if (!data) {
    return <NotFound />;
  }

  const siteUrl = getSiteUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getBusinessSchema(siteUrl),
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${siteUrl}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Service Areas', 'item': `${siteUrl}/#areas` },
          { '@type': 'ListItem', 'position': 3, 'name': data.cityName, 'item': `${siteUrl}/service-areas/${data.slug}` }
        ]
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/service-areas/${data.slug}#service`,
        'name': `Diesel mechanic services in ${data.cityName}`,
        'description': data.metaDescription,
        'provider': {
          '@id': getBusinessId(siteUrl),
        },
        'areaServed': {
          '@type': 'City',
          'name': data.cityName
        }
      }
    ]
  };

  return (
    <div className="jh-readable noise min-h-[100dvh] bg-[#f6f4ed] text-[#242a24] flex flex-col">
      <SeoHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonicalUrl={`${siteUrl}/service-areas/${data.slug}`}
        schema={schema}
      />
      <Header />
      
      <main id="main-content" className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-[#1c201d] px-5 pt-8 text-[#9ea99c] lg:px-8">
          <div className="mx-auto flex max-w-[1240px] items-center gap-2 text-xs font-medium uppercase tracking-widest">
            <Link href="/" className="hover:text-[#83c438] transition-colors" data-testid="breadcrumb-home">Home</Link>
            <ChevronRight size={14} />
            <a href="/#areas" className="hover:text-[#83c438] transition-colors" data-testid="breadcrumb-areas">Service Areas</a>
            <ChevronRight size={14} />
            <span className="text-[#83c438]">{data.cityName}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-[#1c201d] px-5 pb-12 pt-8 text-[#f2f0e8] sm:pb-16 sm:pt-12 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div className="reveal">
              <span className="eyebrow mb-4"><MapPin size={14} className="inline mr-1" /> Servicing {data.cityName}</span>
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
                <a href={phoneHref} className="flex items-center justify-center gap-3 bg-[#83C438] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#1c201d] transition-colors hover:bg-[#94d14b]" data-testid="area-hero-call">
                  <PhoneCall size={17} /> Call {phone}
                </a>
                <Link href="/#quote" className="flex items-center justify-center gap-3 border border-[#5a6559] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] transition-colors hover:border-[#83C438]" data-testid="area-hero-quote">
                  Get a quote <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative aspect-[4/3.5] overflow-hidden border border-[#3b443b] bg-[#242a25]">
              <img src={data.heroImg} alt={`${data.cityName} Diesel Mechanic Services`} className="absolute inset-0 h-full w-full object-cover opacity-90" />
              <div className="absolute bottom-5 left-5 bg-[#1c201d]/90 px-3 py-2 border border-[#3b443b]">
                <p className="mono-face text-xs uppercase tracking-widest text-[#83c438]">{data.cityName} Area</p>
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms / Signs Section */}
        <section className="border-y border-[#d9d4c8] bg-[#eeece3]">
          <div className="mx-auto grid max-w-[1240px] items-center gap-8 px-5 py-10 sm:grid-cols-2 lg:px-8">
            <div>
              <span className="eyebrow">Local operating conditions</span>
              <h2 className="display-face mt-3 text-3xl font-bold uppercase leading-tight sm:text-4xl text-[#1c201d]">
                Issues worth watching
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#5e665c]">
                The type of work and the local terrain often dictate the wear on heavy machinery. If you notice any of these signs, we can help.
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
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
              {data.sections.map((section, index) => (
                <div key={index} className="bg-[#eeece3] p-8 border border-[#d9d4c8]">
                  <h2 className="display-face text-3xl font-bold uppercase tracking-tight text-[#1c201d] mb-5 border-b-2 border-[#83c438] pb-4 inline-block">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
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
                <span className="eyebrow text-[#83c438]">Ready to call?</span>
                <h3 className="display-face mt-4 text-3xl font-bold uppercase leading-tight mb-5">
                  What we<br />need to know
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
                  <a href={phoneHref} className="text-2xl font-bold hover:text-[#83c438] transition-colors" data-testid="area-sidebar-phone">{phone}</a>
                </div>
              </div>

              {/* Related Services */}
              {data.relatedServices && data.relatedServices.length > 0 && (
                <div className="bg-[#eeece3] p-6 border border-[#d9d4c8]">
                  <h4 className="display-face text-xl font-bold uppercase mb-4 text-[#1c201d] border-b-2 border-[#83c438] pb-2 inline-block">Services</h4>
                  <ul className="space-y-3">
                    {data.relatedServices.map(slug => services[slug]).filter(Boolean).map(service => (
                      <li key={service.slug}>
                        <Link href={`/services/${service.slug}`} className="flex items-center gap-2 text-sm font-semibold text-[#5e665c] hover:text-[#83c438] transition-colors" data-testid={`link-related-service-${service.slug}`}>
                          <Wrench size={16} className="text-[#83c438]" /> {service.h1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-[#262d27] px-5 py-16 text-[#f2f0e8] lg:px-8 border-t border-[#485348]">
          <div className="mx-auto max-w-[1080px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_.7fr] items-center">
              <div>
                <span className="eyebrow text-[#83c438]">Get Back to Work</span>
                <h2 className="display-face mt-4 text-4xl font-bold uppercase leading-tight sm:text-5xl">
                  Dependable support in<br />
                  <span className="text-[#83c438]">{data.cityName}</span>
                </h2>
                <p className="mt-5 text-sm leading-6 text-[#bdc5ba] max-w-md">
                  Whether you are planning a scheduled service or dealing with an unexpected breakdown, we give practical answers and durable repairs. Call us with your vehicle details.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href={phoneHref} className="flex items-center justify-center gap-3 bg-[#83c438] px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#1c201d] hover:bg-[#94d14b] transition-colors" data-testid="area-footer-call">
                    Call {phone}
                  </a>
                  <Link href="/#quote" className="flex items-center justify-center gap-3 border border-[#485348] px-6 py-4 text-sm font-bold uppercase tracking-widest hover:border-[#83c438] transition-colors" data-testid="area-footer-quote">
                    Request a Quote
                  </Link>
                </div>
              </div>
              
              <div className="grid gap-px bg-[#485348]">
                {[
                  ['Local Knowledge', 'Understanding the conditions and common routes.'],
                  ['Straight Answers', 'Clear advice, no confusing jargon.'],
                  ['Sensible Repairs', 'Repairs built to endure hard work.']
                ].map(([title, desc], i) => (
                  <div key={title} className="bg-[#262d27] p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 size={18} className="text-[#83c438]" />
                      <h3 className="display-face text-2xl font-bold uppercase">{title}</h3>
                    </div>
                    <p className="text-sm text-[#aeb7aa] pl-7">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
