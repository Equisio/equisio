import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Community() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      setComments([comment, ...comments])
      setComment('')
    }
  }

  return (
    <>
      <main
        className="relative min-h-screen bg-cover bg-no-repeat bg-[center_35%] flex items-center justify-center px-4 py-20"
        style={{ backgroundImage: "url('/community.jpeg')" }}
      >
        {/* Capa oscura para mejorar contraste */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Contenedor principal */}
        <div className="relative z-10 w-full max-w-3xl bg-white/90 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mb-4">
            Join the Equisio Community
          </h1>
          <p className="text-center text-gray-700 mb-6 leading-relaxed">
            Whether you're an experienced rider or just discovering the equestrian world, this is where voices meet.
            Share insights, post experiences, and connect with a global community that lives and breathes horses.
          </p>

          {/* Formulario de publicación */}
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts, questions or advice here..."
              className="w-full p-4 text-gray-800 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={4}
            />
            <button
              type="submit"
              className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
            >
              Post
            </button>
          </form>

          {/* Lista de comentarios */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500 italic">No posts yet — be the first to say something!</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800">{c}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

