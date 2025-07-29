import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

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
    <>
      <main
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/login.jpg')" }} // 👈 pon tu imagen en /public/login-bg.jpg
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

        {/* Caja con transparencia */}
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6 drop-shadow-lg">
            {isSignup ? 'Create Your Account' : 'Log In to Equisio'}
          </h2>

          {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/30 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/30 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/30 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/30 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/30 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-200">
            {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-yellow-300 hover:underline font-medium"
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

