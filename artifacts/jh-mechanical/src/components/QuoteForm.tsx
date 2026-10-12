import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Upload } from 'lucide-react';

const phone = '(03) 5448 8149';
const phoneHref = 'tel:+61354488149';
const maxPhotoBytes = 5 * 1024 * 1024;
const photoTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const formsEnabled = import.meta.env.VITE_NETLIFY_FORMS_ENABLED === 'true';

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const sending = useRef(false);

  function validatePhoto(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    const message = file && !photoTypes.includes(file.type)
      ? 'Please choose a JPG, PNG, WebP or GIF image.'
      : file && file.size > maxPhotoBytes
        ? 'Please choose a photo smaller than 5 MB.'
        : '';
    input.setCustomValidity(message);
    setFileName(file?.name || '');
    setError(message);
    if (message) input.reportValidity();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setError('');
    if (!formsEnabled) {
      setError('Online enquiries are available on our Netlify-hosted website only. Please call us to request a quote.');
      return;
    }
    const data = new FormData(form);
    for (const field of ['name', 'phone', 'job']) {
      const value = String(data.get(field) || '').trim();
      if (!value) {
        setError('Please enter your name, phone number and a description of the job.');
        return;
      }
      data.set(field, value);
    }
    sending.current = true;
    setPending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 35000);
    try {
      const response = await fetch(import.meta.env.BASE_URL, {
        method: 'POST',
        body: data,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission rejected');
      setSubmitted(true);
    } catch {
      setError('We couldn’t confirm your quote request was received. Your details are still here. Please try again, or call us before resending if you’re unsure.');
    } finally {
      window.clearTimeout(timeout);
      sending.current = false;
      setPending(false);
    }
  }

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
            <form name="quote-request" method="POST" encType="multipart/form-data" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} className="space-y-4" aria-busy={pending}>
              <input type="hidden" name="form-name" value="quote-request" />
              <div hidden aria-hidden="true">
                <label>Leave this field empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <fieldset disabled={pending} className="min-w-0 space-y-4">
                <legend className="sr-only">Quote request details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">Your name<input required name="name" type="text" maxLength={120} autoComplete="name" placeholder="e.g. Chris Taylor" className="mt-2 block w-full border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-name" /></label>
                  <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">Best phone number<input required name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="04xx xxx xxx" className="mt-2 block w-full border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-phone" /></label>
                </div>
                <label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#c8cec4]">What can we help with?<textarea required name="job" maxLength={5000} rows={4} placeholder="Tell us about the vehicle and the job..." className="mt-2 block w-full resize-none border border-[#515c51] bg-[#1c211d] px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#f2f0e8] placeholder:text-[#768176]" data-testid="input-quote-job" /></label>
                <label className="flex cursor-pointer items-center gap-3 border border-dashed border-[#687467] bg-[#303930] px-4 py-3.5 text-sm text-[#d6ddd1] transition-colors hover:border-[#83C438] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#83C438]">
                  <Upload size={18} className="shrink-0 text-[#83C438]" /><span className="min-w-0 truncate">{fileName || 'Add a photo of the vehicle or issue (optional)'}</span><input name="photo" type="file" accept={photoTypes.join(',')} className="sr-only" onChange={validatePhoto} aria-describedby="quote-photo-help" data-testid="input-quote-photo" />
                </label>
                <p id="quote-photo-help" className="text-xs leading-5 text-[#b9c0b6]">JPG, PNG, WebP or GIF, up to 5 MB. Vehicle or issue photos only; please don’t upload personal documents.</p>
                <button type="submit" className="flex w-full items-center justify-center gap-3 bg-[#83C438] px-5 py-4 text-sm font-bold uppercase tracking-[.1em] text-[#1c201d] transition-colors hover:bg-[#94d14b] disabled:cursor-wait disabled:opacity-70" data-testid="button-submit-quote">{pending ? 'Sending request…' : 'Send quote request'} <ArrowUpRight size={17} /></button>
              </fieldset>
              {pending && <p role="status" className="text-sm text-[#d6ddd1]">Sending your request. Please wait.</p>}
              {error && <p role="alert" className="border-l-2 border-[#83C438] pl-3 text-sm leading-6 text-[#f2f0e8]" data-testid="quote-error">{error}</p>}
              <p className="text-center text-[11px] leading-5 text-[#b9c0b6]">We will use these details only to respond to your enquiry. For urgent breakdown help, call <a href={phoneHref} className="font-bold text-[#83C438]" data-testid="link-quote-phone">{phone}</a>.</p>
            </form>
          </>
        ) : (
          <div className="flex min-h-[445px] flex-col justify-center">
            <div role="status">
              <CheckCircle2 size={44} className="text-[#83C438]" />
              <span className="eyebrow mt-7 block">Request submitted</span>
              <h2 className="display-face mt-3 text-5xl font-bold uppercase leading-[.94]">Thanks —<br /><span className="text-[#83C438]">request sent.</span></h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[#c1c9bd]">Your quote request has been submitted. The JH Mechanical team will review your details and contact you to discuss the job. For urgent help, call <a href={phoneHref} className="font-semibold text-[#83C438]" data-testid="link-confirmation-phone">{phone}</a>.</p>
            </div>
            <button onClick={() => { setSubmitted(false); setFileName(''); setError(''); }} className="mt-8 w-fit border border-[#5a6759] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#f2f0e8] hover:border-[#83C438]" data-testid="button-new-quote">Send another request</button>
          </div>
        )}
      </div>
    </div>
  );
}
