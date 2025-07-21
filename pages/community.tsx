import { useState } from 'react'
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
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-20 text-white text-center relative"
        style={{ backgroundImage: "url('/community.jpeg')" }}
      >
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

        {/* Fondo translúcido tipo "glassmorphism" */}
        <div className="relative z-10 max-w-2xl w-full bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 drop-shadow">Join the Equisio Community</h1>
          <p className="text-lg mb-6 drop-shadow text-white">
            Whether you're an experienced rider or just discovering the equestrian world, this is where voices meet.
            Share insights, post experiences, and connect with a global community that lives and breathes horses.
          </p>

          {/* Formulario de publicación */}
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts, questions or advice here..."
              className="w-full p-4 text-black rounded-md bg-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={4}
            />
            <button
              type="submit"
              className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              Post
            </button>
          </form>

          {/* Lista de comentarios */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-center text-white italic drop-shadow">No posts yet — be the first to say something!</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-white bg-opacity-90 text-gray-800 border border-gray-200 p-4 rounded-lg shadow-sm"
                >
                  <p>{c}</p>
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
