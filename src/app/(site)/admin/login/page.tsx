'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { BRAND } from '@/lib/brand'
import { DEMO_ACCOUNTS, DEMO_SETUP_HINT } from '@/lib/demo'
import DemoLoginButtons from '@/components/shared/DemoLoginButtons'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const login = async (loginEmail: string, loginPassword: string, isDemo = false) => {
    setError('')
    if (isDemo && !isSupabaseConfigured) {
      setError(DEMO_SETUP_HINT)
      return
    }
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
      if (authError) {
        setError(isDemo ? DEMO_SETUP_HINT : 'Invalid email or password.')
        return
      }
      const { data: isAdmin } = await supabase.rpc('is_admin')
      if (!isAdmin) {
        await supabase.auth.signOut()
        setError('This account does not have admin access.')
        return
      }
      router.replace('/admin')
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  const demoLogin = () => {
    const { email: demoEmail, password: demoPassword } = DEMO_ACCOUNTS.admin
    setEmail(demoEmail)
    setPassword(demoPassword)
    login(demoEmail, demoPassword, true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white rounded-2xl p-2 mb-4 shadow-lg">
            <Image src={BRAND.logo} alt={BRAND.name} width={56} height={56} className="object-contain rounded-xl" />
          </div>
          <h1 className="text-3xl font-bold text-white">{BRAND.name}</h1>
          <p className="text-blue-200 text-sm mt-1">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to manage leads and website content</p>

          {!isSupabaseConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 mb-4">
              Database not connected yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> to enable login.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <DemoLoginButtons roles={['admin']} labels={{ admin: { label: 'Website Admin', desc: 'Courses, blogs & leads' } }} onSelect={demoLogin} loadingRole={loading ? 'admin' : null} disabled={loading} />
          </div>
        </div>

        <p className="text-center text-blue-200 text-xs mt-6">{BRAND.name} &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
