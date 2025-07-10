// pages/index.tsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  const handleToggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      <Navbar />
      <main
        className="relative min-h-screen bg-cover bg-center text-white px-4 pt-20"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4">
            Where Excellence Meets Authenticity
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            The premium platform for buying and selling purebred horses, verified and trusted worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={handleToggleForm}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded"
            >
              {showForm ? 'Close Form' : 'Browse Horses'}
            </button>
            <Link href="/contact">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded">
                Sell Your Horse
              </button>
            </Link>
          </div>

          {/* Formulario dinámico */}
          {showForm && (
            <form className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-xl mb-10 space-y-4">
              <h2 className="text-2xl font-bold mb-2 text-center">List Your Horse</h2>

              <input type="text" placeholder="Horse Name" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Breed" className="w-full p-2 border rounded" required />
              <input type="number" placeholder="Age" className="w-full p-2 border rounded" required />
              <input type="number" placeholder="Price (€)" className="w-full p-2 border rounded" required />
              <textarea placeholder="Description" className="w-full p-2 border rounded" rows={4}></textarea>

              <select className="w-full p-2 border rounded">
                <option value="">Select Type</option>
                <option value="doma">En Doma</option>
                <option value="semental">Semental</option>
                <option value="cria">Yegua para Cría</option>
                <option value="potro">Potro</option>
              </select>

              <input type="file" accept="image/*" className="w-full" multiple />
              <input type="email" placeholder="Contact Email" className="w-full p-2 border rounded" required />

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded"
              >
                Submit Horse for Sale
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

