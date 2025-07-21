import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Horse {
  id: string
  title: string
  category: string
  breed?: string
  age?: number
  price?: number
  location?: string
  description?: string
  contact_email?: string
  contact_phone?: string
  image_url?: string
}

export default function HorseDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [horse, setHorse] = useState<Horse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchHorse(id)
    }
  }, [id])

  const fetchHorse = async (horseId: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('horses')
      .select('*')
      .eq('id', horseId)
      .single()

    if (error || !data) {
      console.error('Horse not found:', error)
      setHorse(null)
    } else {
      setHorse(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>
  }

  if (!horse) {
    return <div className="p-6 text-center text-red-600">Horse not found.</div>
  }

  const whatsappLink = horse.contact_phone
    ? `https://wa.me/${horse.contact_phone.replace(/\D/g, '')}`
    : null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">{horse.title}</h1>

      {horse.image_url ? (
        <img
          src={horse.image_url}
          alt={horse.title}
          className="w-full h-80 object-cover rounded-lg mb-6 shadow"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 rounded flex items-center justify-center text-gray-500 mb-6">
          No image available
        </div>
      )}

      <div className="space-y-2 text-gray-700">
        <p><strong>Category:</strong> {horse.category}</p>
        <p><strong>Breed:</strong> {horse.breed || 'N/A'}</p>
        <p><strong>Age:</strong> {horse.age ?? 'N/A'}</p>
        <p><strong>Price:</strong> {horse.price ? `€${horse.price.toLocaleString()}` : 'Contact for price'}</p>
        <p><strong>Location:</strong> {horse.location || 'N/A'}</p>
        <p><strong>Description:</strong> {horse.description || 'No description provided.'}</p>

        <div className="space-y-2 mt-6">
          <p>
            <strong>Contact Email:</strong>{' '}
            <a href={`mailto:${horse.contact_email}`} className="text-blue-600 underline">
              {horse.contact_email}
            </a>
          </p>

          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded mt-2 transition"
            >
              Contact via WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

