import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Horse {
  id: string
  name: string
  breed: string
  price: number
  is_verified: boolean
  profile_id: string
}

export default function HorsesTable() {
  const [horses, setHorses] = useState<Horse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHorses()
  }, [])

  const fetchHorses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('horses')
      .select('id, name, breed, price, is_verified, profile_id')

    if (error) {
      console.error('Error fetching horses:', error.message)
      setError('Hubo un error al obtener los anuncios.')
    } else {
      setHorses(data || [])
      setError(null)
    }
    setLoading(false)
  }

  const toggleVerification = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('horses')
      .update({ is_verified: !current })
      .eq('id', id)

    if (!error) {
      setHorses(horses.map(h => h.id === id ? { ...h, is_verified: !current } : h))
    } else {
      console.error('Error toggling verification:', error.message)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este anuncio?')
    if (!confirmDelete) return

    const { error } = await supabase
      .from('horses')
      .delete()
      .eq('id', id)

    if (!error) {
      setHorses(horses.filter(h => h.id !== id))
    } else {
      console.error('Error deleting horse:', error.message)
    }
  }

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">🐎 Anuncios de Caballos</h2>

      {loading ? (
        <p className="text-gray-600">Cargando anuncios...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : horses.length === 0 ? (
        <p className="text-gray-500">No hay anuncios registrados.</p>
      ) : (
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Raza</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Verificado</th>
              <th className="px-4 py-2 text-left">Publicado por</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horses.map(h => (
              <tr key={h.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{h.name}</td>
                <td className="px-4 py-2">{h.breed}</td>
                <td className="px-4 py-2">
                  {h.price.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => toggleVerification(h.id, h.is_verified)}
                    className={`px-2 py-1 rounded text-white ${h.is_verified ? 'bg-green-600' : 'bg-gray-400'}`}
                  >
                    {h.is_verified ? '✅' : '❌'}
                  </button>
                </td>
                <td className="px-4 py-2 text-xs text-gray-600">{h.profile_id}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(h.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Eliminar
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

