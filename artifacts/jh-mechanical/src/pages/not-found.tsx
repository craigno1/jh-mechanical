import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function LooseBolt() {
  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#353b35" strokeWidth="2">
        <circle cx="110" cy="110" r="96" />
        <circle cx="110" cy="110" r="70" strokeDasharray="4 8" />
      </g>
      <g transform="translate(110 110)">
        <path
          d="M0-62 L14-56 L20-42 L36-40 L42-26 L56-20 L56-6 L62 0 L56 6 L56 20 L42 26 L36 40 L20 42 L14 56 L0 62 L-14 56 L-20 42 L-36 40 L-42 26 L-56 20 L-56 6 L-62 0 L-56-6 L-56-20 L-42-26 L-36-40 L-20-42 L-14-56 Z"
          fill="#242a25"
          stroke="#5a6559"
          strokeWidth="2"
        />
        <circle r="22" fill="#1c201d" stroke="#83C438" strokeWidth="3" />
      </g>
      <g transform="translate(168 52) rotate(18)">
        <polygon points="0,-17 15,-8.5 15,8.5 0,17 -15,8.5 -15,-8.5" fill="#83C438" />
        <circle r="7" fill="#1c201d" />
      </g>
      <path d="M150 74 l-10 10 M160 82 l-6 6" stroke="#83C438" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function NotFound() {
  const homeHref = import.meta.env.BASE_URL;

  useEffect(() => {
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousTitle = document.title;
    document.title = 'Page not found | JH Mechanical';
    if (robots) robots.content = 'noindex, follow';
    return () => {
      // A generated 404 starts as noindex. Public-page navigation must
      // restore indexability rather than carrying that 404 value forward.
      if (robots) robots.content = 'index, follow';
      if (document.title === 'Page not found | JH Mechanical') document.title = previousTitle;
    };
  }, []);

  return (
    <div className="jh-readable noise min-h-[100dvh] overflow-hidden bg-[#f6f4ed]">
      <Header />
      <main id="main-content">
        <section className="relative bg-[#1c201d] text-[#f2f0e8]">
          <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:pb-28">
            <div className="reveal">
              <p className="eyebrow" data-testid="text-error-code">Error 404</p>
              <h1 className="display-face mt-6 max-w-3xl text-balance text-[2.5rem] font-bold uppercase leading-[.92] tracking-[-.02em] sm:text-[4rem] lg:text-[4.8rem]" data-testid="text-404-heading">
                404 - Whoops looks like there's a <span className="text-[#83C438]">loose part.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#bdc5ba] sm:text-lg" data-testid="text-404-message">
                Go back to the homepage and try again.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={homeHref} className="flex items-center justify-center gap-3 bg-[#83C438] px-6 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#1c201d] transition-colors hover:bg-[#94d14b] motion-reduce:transition-none" data-testid="link-404-home">
                  <ArrowLeft size={17} aria-hidden="true" /> Back to the homepage
                </a>
              </div>
            </div>
            <div className="reveal reveal-delay-2 mx-auto w-full max-w-[220px] sm:max-w-[300px] lg:ml-auto lg:max-w-[360px]">
              <LooseBolt />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
