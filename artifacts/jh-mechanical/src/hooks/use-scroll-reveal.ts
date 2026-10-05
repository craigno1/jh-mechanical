import { useEffect, useRef } from 'react';

/** Progressive enhancement: content stays visible without JS or animation support. */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || motion.matches || !('IntersectionObserver' in window) ||
        typeof HTMLElement.prototype.animate !== 'function') return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      let batchIndex = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (motion.matches) continue;
        const animation = entry.target.animate(
          [
            { opacity: 0.25, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 420,
            delay: Math.min(batchIndex++ * 40, 80),
            easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
          },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        animation.oncancel = () => animations.delete(animation);
      }
    }, { rootMargin: '0px 0px 60px 0px', threshold: 0 });

    // Leave the hero and anything already visible untouched to protect initial paint.
    root.querySelectorAll(
      'section:not(:first-child) h2, .service-card, figure[data-testid^="testimonial-"], [data-scroll-reveal] > div',
    ).forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(element);
      }
    });

    const stop = () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const onMotionChange = () => { if (motion.matches) stop(); };
    motion.addEventListener('change', onMotionChange);
    return () => {
      stop();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return ref;
}
