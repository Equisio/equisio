import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import UsersTable from '@/components/UsersTable'
import HorsesTable from '@/components/HorsesTable'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      const user = session?.user

      if (!user) {
        router.push('/')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (profile?.is_admin) {
        setIsAuthorized(true)
      } else {
        router.push('/')
      }

      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
        <Loader2 className="animate-spin w-8 h-8 mb-4" />
        <p>Cargando panel de administración...</p>
      </div>
    )
  }

  if (!isAuthorized) return null

  return (
    <main className="min-h-screen bg-gradient-to-tr from-yellow-50 to-white px-4 py-10 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-10 tracking-tight">
          🛠️ Panel de Administración
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Usuarios Registrados
          </h2>
          <UsersTable />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
             Anuncios de Caballos
          </h2>
          <HorsesTable />
        </section>
      </motion.div>
    </main>
  )
}
