import { LogOut, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export function AuthenticatedView({ user }) {
  const { logout, status, error } = useAuth();
  const firstName = user.name.split(' ')[0];

  return (
    <main className="min-h-screen bg-[#f5f7f6] px-5 py-6 dark:bg-[#101613] sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Downbot home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183e35] text-white">
              <Sparkles size={18} />
            </span>
            <span className="text-[19px] font-semibold tracking-[-0.04em] text-[#183e35] dark:text-[#dce9e1]">downbot</span>
          </Link>
          <button
            type="button"
            onClick={() => logout()}
            disabled={status === 'loading'}
            className="inline-flex items-center gap-2 rounded-xl border border-[#e4e9e5] bg-white px-4 py-2.5 text-[13px] font-medium text-[#52635a] transition hover:border-[#cbd8cf] hover:text-[#21372e] disabled:opacity-60 dark:border-[#36443b] dark:bg-[#1b241f] dark:text-[#c2d0c8] dark:hover:border-[#52665a] dark:hover:text-[#ecf3ee]"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#e6f0e9] text-[#326d5b] dark:bg-[#263a30] dark:text-[#a7c7ae]">
            <Sparkles size={24} strokeWidth={1.7} />
          </div>
          <p className="text-[13px] font-medium text-[#668276] dark:text-[#91b2a1]">Your workspace is ready</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#21372e] dark:text-[#e5eee8] sm:text-5xl">
            Good to see you, {firstName}.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-[#7b8982] dark:text-[#a5b3ab]">
            You’re signed in as {user.email}. Your Downbot workspace is ready for what comes next.
          </p>
          {error && <p role="alert" className="mt-5 text-sm text-[#aa4d43] dark:text-[#f0b5ac]">{error}</p>}
          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#e3e9e5] bg-white px-4 py-2 text-[12px] text-[#78877f] dark:border-[#36443b] dark:bg-[#1b241f] dark:text-[#b6c4bb]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78a58a]" />
            Authentication is set up
          </div>
        </section>

        <footer className="flex justify-center pb-2 text-[11px] text-[#a2aaa5] dark:text-[#86948c]">
          A good place for what comes next.
        </footer>
      </div>
    </main>
  );
}
