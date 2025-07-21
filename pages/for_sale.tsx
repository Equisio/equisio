import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface Horse {
  id: string
  title: string
  owner_email: string
  status: string
  category: string
  location: string
  image_url?: string
}

export default function ForSalePage() {
  const [horses, setHorses] = useState<Horse[]>([])
  const [filtered, setFiltered] = useState<Horse[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    location: '',
  })

  useEffect(() => {
    fetchHorses()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, horses])

  const fetchHorses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('horses')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching horses:', error.message)
    } else {
      setHorses(data || [])
    }
    setLoading(false)
  }

  const applyFilters = () => {
    let filteredData = horses
    if (filters.category) {
      filteredData = filteredData.filter(h => h.category === filters.category)
    }
    if (filters.location) {
      filteredData = filteredData.filter(h => h.location.toLowerCase().includes(filters.location.toLowerCase()))
    }
    setFiltered(filteredData)
  }

  const uniqueCategories = Array.from(new Set(horses.map(h => h.category)))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Horses for Sale</h1>

      {/* Filtros */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block font-semibold mb-1">Filter by Category</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.category}
            onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Search by Location</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="e.g., Madrid, Paris..."
            value={filters.location}
            onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <p className="text-center">Loading horses...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">No horses match your filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(horse => (
            <Link key={horse.id} href={`/horse/${horse.id}`}>
              <a className="block bg-white rounded-lg shadow p-4 border hover:shadow-lg transition">
                {horse.image_url ? (
                  <img
                    src={horse.image_url}
                    alt={horse.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500 mb-4">
                    No image
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1 text-yellow-700">{horse.title}</h3>
                <p className="text-sm text-gray-600 mb-1">📍 {horse.location}</p>
                <p className="text-sm text-gray-600 mb-1">🏷 {horse.category}</p>
                <p className="text-sm text-gray-500">Posted by: {horse.owner_email}</p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}



