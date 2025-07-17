import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Horse {
  id: string
  title: string
  owner_email: string
  status: string
  category: string
  location: string
}

export default function HorsesTable() {
  const [horses, setHorses] = useState<Horse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHorses()
  }, [])

  const fetchHorses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('horses')
      .select('*')

    if (error) {
      console.error('Error fetching horses:', error.message)
    } else {
      setHorses(data || [])
    }
    setLoading(false)
  }

  const approveHorse = async (id: string) => {
    const { error } = await supabase
      .from('horses')
      .update({ status: 'approved' })
      .eq('id', id)

    if (error) {
      console.error('Error approving horse:', error.message)
    } else {
      fetchHorses()
    }
  }

  const deleteHorse = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this horse?')
    if (!confirm) return

    const { error } = await supabase
      .from('horses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting horse:', error.message)
    } else {
      fetchHorses()
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">📋 Horse Ads Management</h2>

      {loading ? (
        <p>Loading horses...</p>
      ) : horses.length === 0 ? (
        <p>No horse ads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Owner</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {horses.map((horse) => (
                <tr key={horse.id} className="border-t">
                  <td className="px-4 py-2">{horse.title}</td>
                  <td className="px-4 py-2">{horse.owner_email}</td>
                  <td className="px-4 py-2">{horse.category}</td>
                  <td className="px-4 py-2">{horse.location}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        horse.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {horse.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {horse.status !== 'approved' && (
                      <button
                        onClick={() => approveHorse(horse.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => deleteHorse(horse.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

     




