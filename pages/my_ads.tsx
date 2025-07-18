import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

interface Horse {
  id: number
  name: string
  breed: string
  age: number
  price: number
  description: string
  image_url: string
  video_url?: string
  contact_email: string
  plan: 'Premium' | 'Gold' | 'Basic'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function MyAds() {
  const [horses, setHorses] = useState<Horse[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserAds = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push('/')
        return
      }

      const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('contact_email', user.email)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading your ads:', error)
      } else {
        setHorses(data || [])
      }

      setLoading(false)
    }

    fetchUserAds()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this horse?')) return

    const { error } = await supabase.from('horses').delete().eq('id', id)
    if (error) {
      alert('Failed to delete the ad.')
    } else {
      setHorses(prev => prev.filter(h => h.id !== id))
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Loading your ads...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#d4af37', marginBottom: '1rem' }}>My Horse Listings</h1>
      {horses.length === 0 ? (
        <p>You have not published any horses yet.</p>
      ) : (
        horses.map(horse => (
          <div
            key={horse.id}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '10px',
              marginBottom: '1rem',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h2>{horse.name} ({horse.plan})</h2>
            <p><strong>Breed:</strong> {horse.breed}</p>
            <p><strong>Age:</strong> {horse.age}</p>
            <p><strong>Price:</strong> €{horse.price}</p>
            <p><strong>Description:</strong> {horse.description}</p>
            <p>
              <strong>Status:</strong>{' '}
              {horse.status === 'approved' ? (
                <span style={{ color: 'green' }}>Aprobado ✅</span>
              ) : horse.status === 'pending' ? (
                <span style={{ color: 'orange' }}>Pendiente ⏳</span>
              ) : (
                <span style={{ color: 'red' }}>Rechazado ❌</span>
              )}
            </p>
            {horse.image_url && <img src={horse.image_url} alt={horse.name} style={{ maxWidth: '100%', marginTop: '1rem' }} />}
            {horse.video_url && <video src={horse.video_url} controls style={{ maxWidth: '100%', marginTop: '1rem' }} />}
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => handleDelete(horse.id)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

