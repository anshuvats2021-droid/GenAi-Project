import { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { AuthError, AuthField, AuthLayout } from './AuthLayout.jsx';

export function LoginPage() {
  const { login, status, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = status === 'loading';

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login({ email, password });
      navigate('/', { replace: true });
    } catch {
      // The request error is displayed from the auth state below.
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to Downbot"
      description="Pick up right where your ideas left off."
    >
      <form className="space-y-[18px]" onSubmit={handleSubmit}>
        <AuthField
          label="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <label className="block">
          <span className="mb-2 block text-[13px] font-medium text-[#35433e] dark:text-[#d5ded8]">Password</span>
          <span className="flex h-[50px] items-center rounded-xl border border-[#e5e9e6] bg-white px-3.5 transition focus-within:border-[#377c69] focus-within:ring-4 focus-within:ring-[#377c69]/10 dark:border-[#39453f] dark:bg-[#1d2722] dark:focus-within:border-[#6f9c86]">
            <input
              className="min-w-0 flex-1 bg-transparent text-[14px] text-[#24352f] outline-none placeholder:text-[#a3ada7] dark:text-[#e5eee8] dark:placeholder:text-[#84938a]"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-[#909d96] transition hover:text-[#476457] dark:text-[#9aa99f] dark:hover:text-[#d5e4d9]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>

        <AuthError message={error} />

        <button
          className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#214e42] text-[14px] font-medium text-white transition hover:bg-[#193e34] focus:outline-none focus:ring-4 focus:ring-[#377c69]/20 disabled:cursor-not-allowed disabled:opacity-65"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'One moment…' : 'Sign in'}
          {!isLoading && <ArrowRight size={16} />}
        </button>
      </form>

      <p className="mt-7 text-center text-[13px] text-[#7c8983]">
        New to Downbot?{' '}
        <Link className="font-medium text-[#28634f] hover:text-[#193e34] dark:text-[#a7c7ae] dark:hover:text-[#d5e4d9]" to="/register" onClick={clearError}>
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
