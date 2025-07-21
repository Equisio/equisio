import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export default function MyAccount() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true)

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !session?.user) {
        setError('No se pudo obtener la sesión del usuario.')
        router.push('/')
        return
      }

      const user = session.user
      setUserEmail(user.email)

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (profileError) {
        setError('No se pudo cargar el perfil del usuario.')
        console.error(profileError)
      }

      if (profile?.is_admin) {
        setIsAdmin(true)
      }

      setLoading(false)
    }

    fetchUserInfo()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando tu cuenta...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6">Mi Cuenta</h1>

        <p className="mb-6 text-gray-700">
          Bienvenido/a, <strong>{userEmail}</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
            onClick={() => router.push('/my_ads')}
          >
            Ver mis anuncios
          </button>

          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => router.push('/publish')}
          >
            Publicar nuevo caballo
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
          >
            Cerrar sesión
          </button>

          {isAdmin && (
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              onClick={() => router.push('/admin')}
            >
              Panel de Administración
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
