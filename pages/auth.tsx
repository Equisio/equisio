import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
        style={{ backgroundImage: "url('/login.jpg')" }} 
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg max-w-md w-full shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account? <a href="/auth#signup" className="text-blue-600 underline">Sign up</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
