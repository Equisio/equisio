// pages/my_account.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function MyAccount() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    fetchUser()
  }, [])

  return (
    <>
      <main
        className="min-h-screen bg-cover bg-center pt-24 px-6"
        style={{ backgroundImage: "url('/account_bg.jpg')" }}
      >
        <div className="bg-white bg-opacity-90 max-w-3xl mx-auto p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-yellow-500">My Account</h1>

          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <div className="mb-6">
                <p className="text-lg">
                  Email: <span className="font-medium">{user.email}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link href="/my_ads">
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-lg transition shadow">
                    View My Ads
                  </button>
                </Link>

                <Link href="/horse_form">
                  <button className="bg-black text-white hover:bg-gray-800 font-semibold py-2 px-6 rounded-lg transition shadow">
                    Publish New Horse
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-red-500 font-medium text-center">
              You must be logged in to view your account.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
