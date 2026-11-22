import { LockKeyhole, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export function BrandMark({ compact = false }) {
  return (
    <Link to="/login" className="inline-flex items-center gap-2.5" aria-label="Downbot home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183e35] text-white">
        <Sparkles size={18} strokeWidth={1.8} />
      </span>
      {!compact && <span className="text-[19px] font-semibold tracking-[-0.04em] text-[#183e35] dark:text-[#dce9e1]">downbot</span>}
    </Link>
  );
}

function ProductPreview() {
  return (
    <aside className="relative hidden min-h-[calc(100vh-40px)] overflow-hidden rounded-[26px] bg-[#193f36] p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-36 -top-32 h-[440px] w-[440px] rounded-full border border-white/[0.08]" />
      <div className="absolute -right-12 -top-8 h-[300px] w-[300px] rounded-full border border-white/[0.08]" />
      <div className="absolute -bottom-48 -left-36 h-[480px] w-[480px] rounded-full border border-white/[0.07]" />
      <div className="relative">
        <BrandMark compact />
      </div>
      <div className="relative mx-auto w-full max-w-[410px] py-12">
        <div className="mb-7 flex items-center gap-2 text-[12px] font-medium text-[#d0ddd7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a7c7ae]" />
          A calmer way to work with AI
        </div>
        <h2 className="text-[42px] font-medium leading-[1.14] tracking-[-0.045em] text-[#f4f6f1]">
          Good ideas
          <br />
          start with a
          <br />
          <span className="text-[#b5cebd]">better prompt.</span>
        </h2>
        <p className="mt-5 max-w-[340px] text-[14px] leading-6 text-[#c5d3cc]">
          One thoughtful space for the AI tools you love and the ideas you’re exploring.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dbe8df] text-[#244b40] dark:bg-[#345345] dark:text-[#dbe8df]">
              <Sparkles size={15} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-white">A little more focus</p>
              <p className="mt-0.5 text-[11px] text-[#b8c9c0]">Your next idea is closer than you think.</p>
            </div>
          </div>
        </div>
      </div>
      <p className="relative text-[11px] text-[#b8c9c0]">A good place for what comes next.</p>
    </aside>
  );
}

export function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <main className="min-h-screen bg-[#f5f7f6] p-3 dark:bg-[#101613] sm:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1440px] overflow-hidden rounded-[26px] bg-white shadow-[0_16px_70px_rgba(27,54,43,0.07)] dark:bg-[#171f1b] dark:shadow-[0_16px_70px_rgba(0,0,0,0.25)] sm:min-h-[calc(100vh-40px)] lg:grid-cols-[1fr_0.92fr]">
        <section className="flex flex-col px-6 py-7 sm:px-12 lg:px-[clamp(48px,8vw,128px)]">
          <div className="flex items-center justify-between">
            <BrandMark />
            <span className="text-xs text-[#84918a] dark:text-[#9ca9a2] sm:hidden">Your AI workspace</span>
          </div>

          <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center py-12">
            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf4ef] text-[#27695b] dark:bg-[#263a30] dark:text-[#a7c7ae]">
                <LockKeyhole size={19} strokeWidth={1.8} />
              </div>
              <p className="mb-2 text-[13px] font-medium text-[#668276] dark:text-[#91b2a1]">{eyebrow}</p>
              <h1 className="text-[32px] font-semibold tracking-[-0.045em] text-[#21372e] dark:text-[#e5eee8]">{title}</h1>
              <p className="mt-2 text-[14px] leading-6 text-[#7b8982] dark:text-[#a5b3ab]">{description}</p>
            </div>
            {children}
          </div>

          <p className="text-center text-[11px] text-[#a2aaa5] dark:text-[#86948c]">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </section>
        <div className="hidden p-3 pl-0 lg:block">
          <ProductPreview />
        </div>
      </div>
    </main>
  );
}

export function AuthField({ label, type, value, onChange, placeholder, autoComplete, minLength }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-[#35433e] dark:text-[#d5ded8]">{label}</span>
      <span className="flex h-[50px] items-center rounded-xl border border-[#e5e9e6] bg-white px-3.5 transition focus-within:border-[#377c69] focus-within:ring-4 focus-within:ring-[#377c69]/10 dark:border-[#39453f] dark:bg-[#1d2722] dark:focus-within:border-[#6f9c86]">
        <input
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[#24352f] outline-none placeholder:text-[#a3ada7] dark:text-[#e5eee8] dark:placeholder:text-[#84938a]"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required
        />
      </span>
    </label>
  );
}

export function AuthError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-[#fcf1ef] px-3 py-2.5 text-[12px] text-[#aa4d43] dark:bg-[#3b2623] dark:text-[#f0b5ac]">
      {message}
    </p>
  );
}
