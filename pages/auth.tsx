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
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/my_account')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const full_name = `${firstName} ${lastName}`

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name, country }
      }
    })

    if (error) {
      setError(error.message)
    } else {
      alert('Check your email to confirm your account.')
      setIsSignup(false)
    }
  }

  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
        style={{ backgroundImage: "url('/login.jpg')" }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg max-w-md w-full shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">
            {isSignup ? 'Create an Account' : 'Login'}
          </h1>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded bg-gray-100"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              {isSignup ? 'Create Account' : 'Login'}
            </button>
          </form>

          <div className="text-sm text-center mt-4">
            {isSignup ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-yellow-500 underline hover:text-yellow-600"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p>
                Don’t have an account?{' '}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-yellow-500 underline hover:text-yellow-600"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
