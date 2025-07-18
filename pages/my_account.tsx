import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export default function MyAccount() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session?.user) {
        router.push('/')
        return
      }

      const user = session.user
      setUserEmail(user.email)

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (profile?.is_admin) setIsAdmin(true)
      setLoading(false)
    }

    fetchUserInfo()
  }, [router])

  if (loading) return <p className="p-6">Cargando...</p>

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-xl mx-auto bg-gray-50 p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">My Account</h1>
        <p className="mb-6">Email: <strong>{userEmail}</strong></p>

        <div className="flex flex-wrap gap-4">
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            onClick={() => router.push('/my_ads')}
          >
            View My Ads
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => router.push('/publish')}
          >
            Publish New Horse
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
          >
            Logout
          </button>

          {isAdmin && (
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => router.push('/admin')}
            >
              Ir al Panel de Administración
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


