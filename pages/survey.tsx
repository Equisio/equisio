import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function Survey() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <main className="p-8 max-w-2xl mx-auto mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Equisio Interest Survey</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Which equestrian discipline do you practice?</label>
              <select className="w-full p-2 border rounded" required>
                <option value="">Select an option</option>
                <option>Dressage</option>
                <option>Show Jumping</option>
                <option>Eventing</option>
                <option>Endurance</option>
                <option>Reining</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">How could we help you in buying a horse?</label>
              <textarea className="w-full p-2 border rounded" rows={3} required></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Are you a professional or an amateur?</label>
              <div className="flex gap-4">
                <label><input type="radio" name="level" value="professional" required /> Professional</label>
                <label><input type="radio" name="level" value="amateur" required /> Amateur</label>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">What price range would you consider for buying a horse?</label>
              <select className="w-full p-2 border rounded" required>
                <option value="">Select a range</option>
                <option>Under €5,000</option>
                <option>€5,000 – €10,000</option>
                <option>€10,000 – €20,000</option>
                <option>Over €20,000</option>
              </select>
            </div>

            <button type="submit" className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-300">
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold text-xl">
            Thank you for your response! 🐎
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
