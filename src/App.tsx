import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Clock3, ExternalLink, MapPin, Menu, Phone, Star, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import interiorImage from './assets/signature-cafe-interior.png';

const queryClient = new QueryClient();
const mapsUrl = 'https://maps.app.goo.gl/NMFXZtpCdBsb3Q1g6';
const phoneUrl = 'tel:+918130107523';

function ReservationDialog({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[hsl(183_42%_16%/.65)] p-3 sm:items-center" role="dialog" aria-modal="true" data-testid="dialog-reservation">
      <div className="w-full max-w-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 shadow-2xl sm:p-9">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]" data-testid="text-reservation-eyebrow">A little planning</p>
            <h2 className="font-display mt-2 text-4xl leading-none">Keep a table warm.</h2>
          </div>
          <button className="rounded-full p-2 hover:bg-[hsl(var(--muted))]" onClick={onClose} aria-label="Close reservation" data-testid="button-close-reservation"><X size={20} /></button>
        </div>
        {sent ? (
          <div className="border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-5" data-testid="status-reservation-sent">
            <p className="eyebrow text-[hsl(var(--accent))]">Request noted</p>
            <p className="font-display mt-3 text-2xl">We’ll look forward to having you.</p>
            <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">For a confirmed table, please call us at <a className="underline underline-offset-4" href={phoneUrl} data-testid="link-reservation-phone">+91 81301 07523</a>.</p>
            <button className="solid-button mt-6 bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))]" onClick={onClose} data-testid="button-finish-reservation">Back to the café</button>
          </div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="space-y-5" data-testid="form-reservation">
            <label className="block"><span className="eyebrow mb-2 block">Your name</span><input required className="w-full border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-base outline-none placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--accent))]" placeholder="What should we call you?" data-testid="input-reservation-name" /></label>
            <div className="grid grid-cols-2 gap-5">
              <label className="block"><span className="eyebrow mb-2 block">Day</span><input required type="date" className="w-full border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]" data-testid="input-reservation-date" /></label>
              <label className="block"><span className="eyebrow mb-2 block">People</span><select className="w-full border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]" data-testid="select-reservation-party"><option>2 people</option><option>3 people</option><option>4 people</option><option>5+ people</option></select></label>
            </div>
            <button type="submit" className="solid-button mt-3 flex w-full items-center justify-between bg-[hsl(var(--secondary))] px-5 py-4 text-left font-semibold text-[hsl(var(--secondary-foreground))]" data-testid="button-submit-reservation"><span>Send reservation request</span><ArrowUpRight size={18} /></button>
            <p className="text-xs leading-5 text-[hsl(var(--muted-foreground))]">Requests are held lightly. For same-day plans, calling is the surest way to find us.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell grain">
      <header className={`fixed left-0 right-0 top-0 z-30 border-b transition-all duration-300 ${scrolled ? 'border-[hsl(var(--border))] bg-[hsl(var(--background)/.94)] backdrop-blur-md' : 'border-transparent'}`} data-testid="header-site">
        <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button onClick={() => jumpTo('top')} className="flex items-center gap-3 text-left" data-testid="button-logo">
            <span className="flex h-9 w-9 items-center justify-center border border-[hsl(var(--primary))] font-display text-xl">S</span>
            <span className="hidden sm:block"><span className="block font-display text-lg leading-none">Signature</span><span className="eyebrow mt-1 block text-[.54rem]">Cafe Delhi</span></span>
          </button>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <button className="eyebrow link-arrow flex items-center gap-2" onClick={() => jumpTo('the-space')} data-testid="link-the-space">The space <ArrowDownRight size={13} /></button>
            <button className="eyebrow link-arrow flex items-center gap-2" onClick={() => jumpTo('visit')} data-testid="link-visit">Visit us <ArrowDownRight size={13} /></button>
            <a className="solid-button flex items-center gap-2 bg-[hsl(var(--primary))] px-4 py-3 text-xs font-semibold text-[hsl(var(--primary-foreground))]" href={phoneUrl} data-testid="link-call-header"><Phone size={14} /> Call us</a>
          </nav>
          <button className="flex items-center gap-2 border border-[hsl(var(--border))] px-3 py-2 text-xs font-semibold md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={18} /> : <Menu size={18} />} <span className="eyebrow">{menuOpen ? 'Close' : 'Menu'}</span></button>
        </div>
        {menuOpen && <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-5 md:hidden" data-testid="nav-mobile">
          <button className="block w-full border-b border-[hsl(var(--border))] py-4 text-left font-display text-2xl" onClick={() => jumpTo('the-space')} data-testid="link-mobile-space">The space</button>
          <button className="block w-full border-b border-[hsl(var(--border))] py-4 text-left font-display text-2xl" onClick={() => jumpTo('visit')} data-testid="link-mobile-visit">Visit us</button>
          <a className="mt-4 flex items-center gap-2 text-sm font-semibold" href={phoneUrl} data-testid="link-mobile-call"><Phone size={15} /> +91 81301 07523</a>
        </div>}
      </header>

      <section id="top" className="relative min-h-[760px] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" data-testid="section-hero">
        <div className="mx-auto grid min-h-[760px] max-w-[1400px] items-end gap-10 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:px-12 lg:pb-20">
          <div className="relative z-10">
            <p className="eyebrow reveal text-[hsl(var(--secondary))]" data-testid="text-hero-kicker">A neighborhood café in north Delhi</p>
            <h1 className="reveal reveal-delay-1 font-display mt-5 max-w-3xl text-[clamp(4.2rem,11vw,10.5rem)] leading-[.82] tracking-[-.055em]" data-testid="text-hero-title">Worth the<br /><em className="font-normal text-[hsl(var(--secondary))]">detour.</em></h1>
            <div className="reveal reveal-delay-2 mt-9 flex max-w-xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xs text-[1.05rem] leading-7 text-[hsl(var(--primary-foreground)/.7)]" data-testid="text-hero-description">Come for a slow morning, a good conversation, or simply the feeling of having found somewhere.</p>
              <button className="link-arrow flex shrink-0 items-center gap-3 text-sm font-semibold text-[hsl(var(--secondary))]" onClick={() => jumpTo('the-space')} data-testid="button-discover-space">Discover the space <ArrowDownRight size={18} /></button>
            </div>
          </div>
          <div className="reveal reveal-delay-3 relative ml-auto w-full max-w-[500px] lg:mb-2">
            <div className="absolute -left-3 -top-3 h-full w-full border border-[hsl(var(--secondary)/.35)] sm:-left-5 sm:-top-5" />
            <div className="image-hover relative aspect-[4/5] overflow-hidden bg-[hsl(183_30%_25%)]">
              <img src={interiorImage} alt="Sunlit table and warm interior details at Signature Cafe Delhi" className="h-full w-full object-cover" data-testid="img-hero-interior" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-[hsl(183_42%_16%/.75)] to-transparent p-5 pt-24">
                <span className="eyebrow text-[hsl(var(--primary-foreground)/.8)]">Wongdhen House<br />Majnu-ka-tilla</span>
                <span className="font-display text-4xl italic text-[hsl(var(--secondary))]">01</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 hidden items-center gap-3 text-[hsl(var(--primary-foreground)/.5)] lg:flex"><span className="h-px w-12 bg-[hsl(var(--primary-foreground)/.4)]" /><span className="eyebrow">Scroll to wander in</span></div>
      </section>

      <div className="overflow-hidden border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4" data-testid="strip-hours">
        <div className="marquee flex min-w-max items-center gap-10 whitespace-nowrap px-4">
          {['Open daily · 8 AM — 10 PM', 'Signature Cafe Delhi', 'A quiet corner in Majnu-ka-tilla', 'Open daily · 8 AM — 10 PM', 'Signature Cafe Delhi', 'A quiet corner in Majnu-ka-tilla'].map((item, index) => <span key={`${item}-${index}`} className="eyebrow flex items-center gap-10">{item}<span className="text-[hsl(var(--accent))]">•</span></span>)}
        </div>
      </div>

      <section id="the-space" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" data-testid="section-space">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]" data-testid="text-space-kicker">A place to settle into</p>
            <h2 className="font-display mt-5 max-w-md text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl" data-testid="text-space-title">A little<br /><em className="font-normal text-[hsl(var(--accent))]">unhurried.</em></h2>
          </div>
          <div className="max-w-2xl lg:pt-10">
            <p className="text-2xl leading-snug tracking-[-.02em] sm:text-3xl" data-testid="text-space-copy">There are places you visit, and places that make room for you. Signature is the latter — tucked inside Wongdhen House, where the neighborhood does the welcoming.</p>
            <div className="mt-12 grid gap-8 border-t border-[hsl(var(--border))] pt-7 sm:grid-cols-2">
              <div><p className="eyebrow text-[hsl(var(--muted-foreground))]">The mood</p><p className="mt-3 font-display text-2xl">Come as you are.</p><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">No occasion required. Stay for the part of the day that needs softening.</p></div>
              <div><p className="eyebrow text-[hsl(var(--muted-foreground))]">The rhythm</p><p className="mt-3 font-display text-2xl">Slow, with care.</p><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Open from the first light breakfasts to the last easy conversations.</p></div>
            </div>
          </div>
        </div>
        <div className="image-hover mt-20 grid gap-4 sm:grid-cols-[1.35fr_.65fr] sm:items-end">
          <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(var(--primary))]"><img src={interiorImage} alt="The intimate, sunlit room at Signature Cafe Delhi" className="h-full w-full object-cover" data-testid="img-space-main" /></div>
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[hsl(var(--accent))] p-8 text-center text-[hsl(var(--accent-foreground))] sm:aspect-[3/4]">
            <div className="absolute inset-5 border border-[hsl(var(--accent-foreground)/.4)]" />
            <div><p className="font-display text-5xl italic sm:text-6xl">Find<br />your<br />corner.</p><p className="eyebrow mt-8">Majnu-ka-tilla · Delhi</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--primary))] px-5 py-24 text-[hsl(var(--primary-foreground))] sm:px-8 sm:py-32 lg:px-12" data-testid="section-invitation">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <p className="eyebrow text-[hsl(var(--secondary))]" data-testid="text-invitation-kicker">The invitation</p>
          <div><h2 className="font-display max-w-4xl text-5xl leading-[.9] tracking-[-.04em] sm:text-8xl" data-testid="text-invitation-title">Make an afternoon<br /><em className="font-normal text-[hsl(var(--secondary))]">of it.</em></h2><p className="mt-9 max-w-lg text-lg leading-7 text-[hsl(var(--primary-foreground)/.68)]" data-testid="text-invitation-copy">Bring a book. Bring a friend. Follow the lane until the city sounds a little farther away.</p><button className="solid-button mt-9 flex items-center gap-4 bg-[hsl(var(--secondary))] px-5 py-4 text-sm font-semibold text-[hsl(var(--secondary-foreground))]" onClick={() => setReservationOpen(true)} data-testid="button-reserve-hero">Reserve a table <ArrowUpRight size={18} /></button></div>
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" data-testid="section-visit">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div><p className="eyebrow text-[hsl(var(--accent))]" data-testid="text-visit-kicker">Come find us</p><h2 className="font-display mt-5 text-5xl leading-[.9] sm:text-7xl" data-testid="text-visit-title">Easy to miss.<br /><em className="font-normal text-[hsl(var(--accent))]">Hard to forget.</em></h2><div className="mt-10 border-t border-[hsl(var(--border))] pt-6"><p className="flex items-start gap-3 text-lg leading-7" data-testid="text-address"><MapPin className="mt-1 shrink-0 text-[hsl(var(--accent))]" size={19} /> Wongdhen House, Majnu-ka-tilla,<br />New Aruna Colony, Delhi 110054</p><a href={mapsUrl} target="_blank" rel="noreferrer" className="link-arrow mt-7 flex w-fit items-center gap-3 font-semibold underline decoration-[hsl(var(--secondary))] decoration-2 underline-offset-4" data-testid="link-directions">Get directions <ExternalLink size={16} /></a></div></div>
          <div className="flex flex-col justify-between gap-12">
            <div className="border-y border-[hsl(var(--border))] py-6"><div className="flex items-center justify-between"><span className="eyebrow">Every day</span><Clock3 size={18} className="text-[hsl(var(--accent))]" /></div><p className="font-display mt-4 text-4xl" data-testid="text-hours">8 AM — 10 PM</p><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">The door is open daily.</p></div>
            <div className="border-b border-[hsl(var(--border))] pb-7"><div className="flex items-center justify-between"><span className="eyebrow">What people say</span><div className="flex items-center gap-1 text-[hsl(var(--secondary-foreground))]" data-testid="status-google-rating"><Star size={16} fill="currentColor" /><span className="font-semibold">4.3</span></div></div><p className="font-display mt-4 max-w-md text-3xl leading-tight">“The kind of place you’re glad you stumbled upon.”</p><p className="eyebrow mt-4 text-[hsl(var(--muted-foreground))]">Google rating</p></div>
            <div className="flex flex-col gap-3 sm:flex-row"><a href={phoneUrl} className="outline-button flex flex-1 items-center justify-between border border-[hsl(var(--primary))] px-5 py-4 text-sm font-semibold" data-testid="link-call-visit">Call the café <Phone size={17} /></a><button onClick={() => setOrderOpen((open) => !open)} className="solid-button flex flex-1 items-center justify-between bg-[hsl(var(--secondary))] px-5 py-4 text-sm font-semibold text-[hsl(var(--secondary-foreground))]" data-testid="button-order-online">Order online <ArrowUpRight size={17} /></button></div>
            {orderOpen && <div className="border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-5 text-sm leading-6" data-testid="status-order-info">For the freshest availability and pickup details, call us directly at <a className="font-semibold underline underline-offset-4" href={phoneUrl} data-testid="link-order-phone">+91 81301 07523</a>. We’ll point you in the right direction.</div>}
          </div>
        </div>
      </section>

      <footer className="bg-[hsl(var(--secondary))] px-5 py-12 sm:px-8 lg:px-12" data-testid="footer-site">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="font-display text-4xl leading-none">Signature</p><p className="eyebrow mt-3">Cafe Delhi</p></div>
          <div className="flex flex-col gap-2 text-sm sm:items-end"><p data-testid="text-footer-address">Wongdhen House · Majnu-ka-tilla · Delhi 110054</p><p className="font-mono text-xs" data-testid="text-footer-hours">OPEN DAILY / 08:00 — 22:00</p></div>
          <button onClick={() => jumpTo('top')} className="flex items-center gap-2 text-sm font-semibold sm:self-start" data-testid="button-back-top">Back to top <ArrowUpRight size={16} /></button>
        </div>
      </footer>
      {reservationOpen && <ReservationDialog onClose={() => setReservationOpen(false)} />}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;