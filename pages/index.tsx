// pages/index.tsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert('Signup failed: ' + error.message)
    } else {
      // Optionally insert into "profiles" table
      await supabase.from('profiles').insert([
        {
          id: data.user?.id, // same id as auth user
          email,
          first_name: firstName,
          last_name: lastName,
          country,
        },
      ])

      alert('Check your email to confirm your registration.')
      setShowSignup(false)
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setCountry('')
    }
  }

  return (
    <>
      <main
        className="relative min-h-screen bg-cover bg-center text-white px-6 pt-24"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow">
            Where Excellence Meets Authenticity
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Equisio is the premium platform for buying and selling horses and related services.
            Verified and trusted worldwide. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/for_sale">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-8 rounded-lg transition shadow-md">
                Browse Horses
              </button>
            </Link>
            <Link href="/horse_form">
              <button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-8 rounded-lg transition shadow-md">
                Sell Your Horse
              </button>
            </Link>
          </div>

          <div className="mt-4">
            {!showSignup ? (
              <button
                onClick={() => setShowSignup(true)}
                className="text-sm text-yellow-400 underline hover:text-yellow-300"
              >
                Don’t have an account? Sign Up
              </button>
            ) : (
              <form
                onSubmit={handleSignup}
                className="bg-white text-black p-6 rounded-lg shadow-md max-w-md mx-auto mt-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-center">Create an Account</h3>

                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <section className="bg-white text-gray-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Equisio?</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p>Every horse is professionally reviewed before appearing on our platform. We prioritize accuracy and credibility.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Exclusive Network</h3>
            <p>Join a curated marketplace where breeders, riders, and buyers from around the world connect through trust and excellence.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Search with Precision</h3>
            <p>Filter by discipline, bloodline, age, or price to find exactly what you're looking for—without compromise.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}



