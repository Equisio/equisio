import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export default function HorseForm() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sessionChecked, setSessionChecked] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    category: '',
    location: '',
    title: '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('You must be logged in to publish a horse.')
        router.push('/')
      } else {
        setUser(session.user)
      }
      setSessionChecked(true)
    }

    fetchSession()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0])
    }
  }

  const determinePlan = (price: number): 'Premium' | 'Gold' | 'Basic' => {
    if (price > 25000) return 'Premium'
    if (price >= 10000) return 'Gold'
    return 'Basic'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      alert('Please select an image.')
      return
    }

    const imageName = `${uuidv4()}-${imageFile.name}`
    const { error: uploadError } = await supabase.storage
      .from('horse-images')
      .upload(imageName, imageFile)

    if (uploadError) {
      alert('Failed to upload image.')
      return
    }

    const imageUrl = supabase.storage.from('horse-images').getPublicUrl(imageName).data.publicUrl

    let videoUrl = ''
    if (videoFile) {
      const videoName = `${uuidv4()}-${videoFile.name}`
      const { error: videoUploadError } = await supabase.storage
        .from('horse-videos')
        .upload(videoName, videoFile)

      if (videoUploadError) {
        alert('Failed to upload video.')
        return
      }

      videoUrl = supabase.storage.from('horse-videos').getPublicUrl(videoName).data.publicUrl
    }

    const priceNumber = Number(formData.price)
    const plan = determinePlan(priceNumber)

    const { error: insertError } = await supabase.from('horses').insert([{
      ...formData,
      age: Number(formData.age),
      price: priceNumber,
      image_url: imageUrl,
      video_url: videoUrl,
      plan,
      owner_id: user.id,        // ✅ campo correcto
      status: 'pending'         // ✅ queda a la espera de aprobación
    }])

    if (insertError) {
      alert('Failed to publish the horse.')
    } else {
      alert('Horse submitted for review. You’ll be notified once it’s approved.')
      router.push('/for_sale')
    }
  }

  if (!sessionChecked) return null

  return (
    <div style={{
      backgroundImage: 'url("/horse_form.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'rgba(255,255,255,0.95)',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#d4af37' }}>
          Publish Your Horse
        </h2>

        {['title', 'name', 'breed', 'category', 'location', 'age', 'price', 'contact_email', 'contact_phone'].map(field => (
          <input
            key={field}
            type={['age', 'price'].includes(field) ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
        ))}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />

        {/* Upload Imagen */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
            Upload Horse Image <span style={{ color: 'red' }}>*</span>
          </label>
          <div
            style={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            {imageFile ? (
              <p style={{ color: 'green' }}>✅ {imageFile.name}</p>
            ) : (
              <p>Click to select or drag & drop image file here</p>
            )}
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ display: 'none' }}
          />
        </div>

        {/* Upload Video */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
            Upload Horse Video (Optional)
          </label>
          <div
            style={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('videoUpload')?.click()}
          >
            {videoFile ? (
              <p style={{ color: 'green' }}>🎥 {videoFile.name}</p>
            ) : (
              <p>Click to select or drag & drop video file here</p>
            )}
          </div>
          <input
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: 'none' }}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#ffea00',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Submit for Review
        </button>
      </form>
    </div>
  )
}



