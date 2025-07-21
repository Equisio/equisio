import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Survey() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    discipline: '',
    help_text: '',
    level: '',
    price_range: ''
  })
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/')
        return
      }
      setUserId(session.user.id)
    }
    getSession()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('survey_responses').insert([{
      user_id: userId,
      ...form
    }])

    setLoading(false)

    if (error) {
      console.error('Survey submit error:', error)
      alert('There was an error submitting your response.')
    } else {
      setSubmitted(true)
    }
  }

  return (
    <>
      <main className="p-8 max-w-2xl mx-auto mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Equisio Interest Survey</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Which equestrian discipline do you practice?</label>
              <select name="discipline" value={form.discipline} onChange={handleChange} className="w-full p-2 border rounded" required>
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
              <textarea
                name="help_text"
                value={form.help_text}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Are you a professional or an amateur?</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="professional"
                    checked={form.level === 'professional'}
                    onChange={handleChange}
                    required
                  />{' '}
                  Professional
                </label>
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="amateur"
                    checked={form.level === 'amateur'}
                    onChange={handleChange}
                    required
                  />{' '}
                  Amateur
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">What price range would you consider for buying a horse?</label>
              <select
                name="price_range"
                value={form.price_range}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a range</option>
                <option>Under €5,000</option>
                <option>€5,000 – €10,000</option>
                <option>€10,000 – €20,000</option>
                <option>Over €20,000</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold text-xl mt-10">
            Thank you for your response! 🐎
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
