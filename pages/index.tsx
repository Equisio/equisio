import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const { t } = useTranslation('common')

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
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={handleToggleForm}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded"
            >
              {showForm ? t('home.closeForm') : t('home.browse')}
            </button>
            <Link href="/contact">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded">
                {t('home.sell')}
              </button>
            </Link>
          </div>

          {showForm && (
            <form className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-xl mb-10 space-y-4">
              <h2 className="text-2xl font-bold mb-2 text-center">{t('home.formTitle')}</h2>

              <input type="text" placeholder={t('home.horseName')} className="w-full p-2 border rounded" required />
              <input type="text" placeholder={t('home.breed')} className="w-full p-2 border rounded" required />
              <input type="number" placeholder={t('home.age')} className="w-full p-2 border rounded" required />
              <input type="number" placeholder={t('home.price')} className="w-full p-2 border rounded" required />
              <textarea placeholder={t('home.description')} className="w-full p-2 border rounded" rows={4}></textarea>

              <select className="w-full p-2 border rounded">
                <option value="">{t('home.typePlaceholder')}</option>
                <option value="doma">{t('home.dressage')}</option>
                <option value="semental">{t('home.stallion')}</option>
                <option value="cria">{t('home.breeding')}</option>
                <option value="potro">{t('home.foal')}</option>
              </select>

              <input type="file" accept="image/*" className="w-full" multiple />
              <input type="email" placeholder={t('home.email')} className="w-full p-2 border rounded" required />

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded"
              >
                {t('home.submit')}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

// i18n translations for static generation
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

