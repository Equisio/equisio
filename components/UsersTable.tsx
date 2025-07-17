import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Profile {
  id: string
  full_name: string
  country: string
  is_active: boolean
}

export default function UsersTable() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('profiles').select('*')

    if (error) {
      console.error('Error fetching profiles:', error.message)
      setError('Error al cargar los usuarios.')
    } else {
      setProfiles(data || [])
      setError(null)
    }
    setLoading(false)
  }

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: !current })
      .eq('id', id)

    if (!error) {
      setProfiles(profiles.map(p => p.id === id ? { ...p, is_active: !current } : p))
    } else {
      console.error('Error actualizando estado activo:', error.message)
    }
  }

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">👤 Usuarios Registrados</h2>

      {loading ? (
        <p className="text-gray-600">Cargando usuarios...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : profiles.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre completo</th>
              <th className="px-4 py-2 text-left">País</th>
              <th className="px-4 py-2 text-left">Activo</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-xs text-gray-600">{profile.id}</td>
                <td className="px-4 py-2">{profile.full_name || '-'}</td>
                <td className="px-4 py-2">{profile.country || '-'}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => toggleActive(profile.id, profile.is_active)}
                    className={`px-2 py-1 rounded text-white ${profile.is_active ? 'bg-green-600' : 'bg-gray-400'}`}
                  >
                    {profile.is_active ? '✅' : '❌'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

