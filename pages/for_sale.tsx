import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import HorseCard from '@/components/HorseCard'

export default function ForSale() {
  const [horses, setHorses] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    const fetchHorses = async () => {
      const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('status', 'approved') // Mostrar solo anuncios validados

      if (error) {
        console.error('Error fetching horses:', error.message)
      } else {
        setHorses(data || [])
        setFiltered(data || [])
      }
    }

    fetchHorses()
  }, [])

  useEffect(() => {
    const filteredHorses = horses.filter((horse) => {
      const matchesCategory = categoryFilter === 'All' || horse.category === categoryFilter
      const matchesLocation = horse.location?.toLowerCase().includes(locationFilter.toLowerCase())
      return matchesCategory && matchesLocation
    })

    setFiltered(filteredHorses)
  }, [categoryFilter, locationFilter, horses])

  return (
    <div
      style={{
        backgroundImage: 'url("/horses_for_sale.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '5rem 1rem 2rem',
      }}
    >
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">Horses for Sale</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Dressage">Dressage</option>
            <option value="Stallion">Stallion</option>
            <option value="Mare">Mare</option>
            <option value="Foal">Foal</option>
          </select>

          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded-md flex-1"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-600">No horses match your filters. Try different options.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((horse) => (
              <HorseCard key={horse.id} horse={horse} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



     




