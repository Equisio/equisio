// components/HorseCard.tsx
import React from 'react'

interface Horse {
  id: string
  name: string
  breed: string
  age: number
  price: number
  description: string
  image_url: string
  video_url?: string
  contact_email: string
  category: 'Dressage' | 'Stallion' | 'Mare' | 'Foal'
  location: string
  plan?: 'Premium' | 'Gold' | 'Basic'
}

interface Props {
  horse: Horse
}

const planColors: Record<string, string> = {
  Premium: '#cce0ff', // Light blue
  Gold: '#fff3b0',    // Soft gold
  Basic: '#f2f2f2'    // Light gray
}

const HorseCard: React.FC<Props> = ({ horse }) => {
  const background = planColors[horse.plan || 'Basic']

  return (
    <div
      style={{
        background,
        padding: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'default',
      }}
    >
      <h2 style={{ margin: '0 0 0.5rem' }}>{horse.name}</h2>
      <p><strong>Category:</strong> {horse.category}</p>
      <p><strong>Location:</strong> {horse.location}</p>
      <p><strong>Breed:</strong> {horse.breed}</p>
      <p><strong>Age:</strong> {horse.age} years</p>
      <p><strong>Price:</strong> €{horse.price.toLocaleString()}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}><strong>Description:</strong> {horse.description}</p>
      <p><strong>Plan:</strong> {horse.plan || 'Basic'}</p>

      {horse.image_url && (
        <img
          src={horse.image_url}
          alt={horse.name}
          style={{
            width: '100%',
            maxHeight: '350px',
            objectFit: 'cover',
            borderRadius: '8px',
            margin: '1rem 0',
          }}
        />
      )}

      {horse.video_url && (
        <video
          controls
          style={{
            width: '100%',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <source src={horse.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <p style={{ marginTop: '1rem' }}>
        <strong>Contact:</strong>{' '}
        <a
          href={`mailto:${horse.contact_email}`}
          style={{ color: '#0077cc', textDecoration: 'underline' }}
        >
          {horse.contact_email}
        </a>
      </p>
    </div>
  )
}

export default HorseCard
