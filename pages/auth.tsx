import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/my_account')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const full_name = `${firstName} ${lastName}`

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signupError) {
      setLoading(false)
      setError('Signup failed: ' + signupError.message)
      return
    }

    const { error: dbError } = await supabase.from('profiles').insert([{
      id: data.user?.id,
      full_name,
      country
    }])

    setLoading(false)

    if (dbError) {
      setError('Database error saving user: ' + dbError.message)
    } else {
      alert('Check your email to confirm your registration.')
      setIsSignup(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Centered Auth Box */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
            {isSignup ? 'Create Your Account' : 'Log In to Equisio'}
          </h2>

          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-700">
            {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:underline font-medium"
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>

      {/* Footer fixed at bottom */}
      <Footer />
    </div>
  )
}

