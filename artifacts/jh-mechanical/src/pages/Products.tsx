import rags from '@/assets/optimized/car-rags_1791199475174.webp';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import brake from '@/assets/optimized/brakecleaner_1791199475173.webp';
import degreaser from '@/assets/optimized/degreaser_1791199475174.webp';
import tyre from '@/assets/optimized/tyre-shine_1791199475172.webp';
import glass from '@/assets/optimized/Glass-cleaner_1791199475175.webp';
import adblue from '@/assets/optimized/adblue_1791199475173.webp';
import hand from '@/assets/optimized/hand-cleaner-bottles_1791199475175.webp';
import wash from '@/assets/optimized/windscreen-wash-fluid_1791199475172.webp';
import penrite from '@/assets/optimized/perite-oils_1791199475175.webp';
import tritech from '@/assets/optimized/trytechoils_1791199475171.webp';
import power from '@/assets/optimized/powermaxd-products_1791199475170.webp';
import wurth from '@/assets/optimized/wuurth-products_1791199475173.webp';
import dpf from '@/assets/optimized/dpf-cleanr_1791199475174.webp';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SeoHead } from '@/components/layout/SeoHead';
import { getSiteUrl } from '@/lib/site-url';
import { getBusinessSchema } from '@/lib/business-schema';

const phone = '03 5448 8149';
const phoneHref = 'tel:+61354488149';

const products = [
  { name: 'Bags of rags - 10kg', image: rags },
  { name: 'Brake cleaner - 20L drums & cans', image: brake },
  { name: 'Degreaser - 20L drums & cans', image: degreaser },
  { name: 'Tyre shine cans', image: tyre },
  { name: 'Glass cleaner', image: glass },
  { name: 'AdBlue', image: adblue },
  { name: 'Hand cleaner - 500ml, 2.5L, 5L, 20L', image: hand },
  { name: 'Windscreen wash - 20L drums & 5L', image: wash },
  { name: 'Penrite oils', image: penrite },
  { name: 'Tri-Tech oils', image: tritech },
  { name: 'Power Maxed products', image: power },
  { name: 'Wurth products', image: wurth },
  { name: 'DPF system cleaner', image: dpf },
];

function Products() {
  const siteUrl = getSiteUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getBusinessSchema(siteUrl),
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/products#webpage`,
        name: 'Products: Consumables for Vehicles',
        url: `${siteUrl}/products`,
      },
    ],
  };

  return (
    <div className="jh-readable noise flex min-h-[100dvh] flex-col bg-[#f6f4ed]">
      <SeoHead
        title="Products: Consumables for Vehicles"
        description="Vehicle consumables available from JH Mechanical in Bendigo, including oils, AdBlue, cleaners, rags and DPF system cleaner. Ask us by phone."
        canonicalUrl={`${siteUrl}/products`}
        schema={schema}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-[#1c201d] px-5 pb-10 pt-12 text-[#f2f0e8] sm:pb-12 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <span className="eyebrow">Bendigo diesel workshop</span>
            <h1 className="display-face mt-5 max-w-4xl text-[2.65rem] font-bold uppercase leading-[.88] tracking-[-.03em] sm:text-[4.6rem]">
              Products: <span className="text-[#83C438]">Consumables for Vehicles</span>
            </h1>
            <p className="mt-7 max-w-2xl border-l-2 border-[#83C438] pl-5 text-base leading-7 text-[#bdc5ba]">
              Vehicle products available to buy from us: everyday supplies that keep a working vehicle clean, topped up and running. They can be purchased by request or as part of a job. They are not available to buy through this website, so call us to discuss what you need.
            </p>
          </div>
        </section>

        <section className="px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map(({ name, image }, i) => (
                <div key={name} className="relative isolate flex min-h-[170px] overflow-hidden border border-[#485348] p-4 text-[#f2f0e8]" data-testid={`tile-product-${i}`}>
                  <ResponsiveImage src={image} sizes="(min-width: 1304px) 298px, (min-width: 1024px) calc((100vw - 112px) / 4), (min-width: 640px) calc((100vw - 56px) / 2), calc(100vw - 40px)" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#111611]/45 via-[#111611]/45 to-[#111611]/95" />
                  <h2 className="display-face mt-auto text-2xl font-bold uppercase leading-[1.1] text-[#f2f0e8] drop-shadow-[0_2px_4px_rgba(0,0,0,.9)]">{name}</h2>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#dedbd0] px-5 py-10 sm:py-14 lg:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <p className="max-w-2xl text-base leading-7 text-[#3f473d]">
              You never know when you will need these important items on the road. From oils and AdBlue to cleaners and bags of rags, keeping the right consumables on hand helps you stay prepared for everyday vehicle care. Ask us about the products and sizes suitable for your vehicle.
            </p>
            <a href={phoneHref} className="inline-flex w-fit items-center bg-[#262d27] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#f2f0e8] hover:bg-[#313c32]" data-testid="link-products-call">
              Call {phone}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Products;
