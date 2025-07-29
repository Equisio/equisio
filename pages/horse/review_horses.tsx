import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import Footer from '@/components/Footer'

interface Horse {
  id: string
  title: string
  description: string
  image_url: string
  location: string
  price: number
  created_at: string
  user_id: string
}

export default function ReviewHorses() {
  const [horses, setHorses] = useState<Horse[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const { data: session } = await supabase.auth.getSession()
      const user = session?.session?.user
      if (!user) return router.push('/')

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (!profile?.is_admin) return router.push('/')

      setIsAuthorized(true)
      fetchHorses()
    }

    checkAdminAndFetch()
  }, [])

  const fetchHorses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('horses')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setHorses(data || [])

    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('horses')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      alert('Error updating status')
      console.error(error)
    } else {
      setHorses(prev => prev.filter(h => h.id !== id))
    }
  }

  if (!isAuthorized) return null

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center text-yellow-600 mb-8">Review Horse Submissions</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading horses...</p>
      ) : horses.length === 0 ? (
        <p className="text-center text-gray-500 italic">No pending horses to review.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {horses.map(horse => (
            <div key={horse.id} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={horse.image_url}
                alt={horse.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{horse.title}</h2>
              <p className="text-sm mb-2">{horse.location}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-4">{horse.description}</p>
              <p className="text-lg font-bold mb-4">€{horse.price}</p>
              <div className="flex gap-3">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => updateStatus(horse.id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => updateStatus(horse.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  )
}
