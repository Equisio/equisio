import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import UsersTable from '@/components/UsersTable'
import HorsesTable from '@/components/HorsesTable'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        console.error('No se pudo obtener el usuario:', userError?.message)
        router.push('/')
        return
      }

      // Buscar si el usuario es admin en su perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Error cargando el perfil:', profileError.message)
        router.push('/')
        return
      }

      if (profile?.is_admin) {
        setIsAdmin(true)
      } else {
        router.push('/')
      }

      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600 animate-pulse">
          Cargando panel de administración...
        </div>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-yellow-600 mb-10">
          Panel de Administración
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">👤 Usuarios Registrados</h2>
          <UsersTable />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">🐎 Anuncios de Caballos</h2>
          <HorsesTable />
        </section>
      </div>
    </main>
  )
}

