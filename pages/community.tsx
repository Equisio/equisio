import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Community() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim() !== '') {
      setComments([comment, ...comments])
      setComment('')
    }
  }

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen bg-cover bg-center text-white p-8"
        style={{ backgroundImage: "url('/community.png')" }}
      >
        <div className="bg-black bg-opacity-60 rounded-lg max-w-3xl mx-auto p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 drop-shadow">
            Join the Equisio Community
          </h1>
          <p className="text-center mb-6 text-lg drop-shadow">
            Whether you're an experienced rider or just discovering the equestrian world, here is where
            voices meet. Share insights, post experiences, and connect with a global community that
            lives and breathes horses.
          </p>

          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts, questions or advice here..."
              className="w-full p-4 text-gray-800 border border-gray-300 rounded-md resize-none"
              rows={4}
            />
            <button
              type="submit"
              className="mt-2 bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600"
            >
              Post
            </button>
          </form>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-300">No posts yet — start the conversation!</p>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="bg-white bg-opacity-90 text-black p-4 rounded shadow border">
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
