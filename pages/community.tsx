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
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: "url('/community.jpeg')" }}
      >
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Contenido principal */}
        <div className="relative z-10 max-w-2xl w-full bg-white/90 text-black p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-yellow-600 drop-shadow">
            Join the Equisio Community
          </h1>
          <p className="mb-6 text-gray-700 leading-relaxed drop-shadow">
            Whether you're an experienced rider or just discovering the equestrian world, this is where voices meet. Share insights, post experiences, and connect with a global community that lives and breathes horses.
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts, questions or advice here..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={4}
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              Post
            </button>
          </form>

          {/* Comentarios */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-center text-gray-600 italic">No posts yet — be the first to say something!</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm"
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


