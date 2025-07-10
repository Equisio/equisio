import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function HorsesForSale() {
  const { t } = useTranslation('common')

  return (
    <>
      <Navbar />
      <main
        className="relative min-h-screen bg-cover bg-center px-4 pt-20 text-white"
        style={{ backgroundImage: "url('/horses_for_sale.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('forSale.title')}
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">{t('forSale.subtitle')}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded shadow">
              {t('forSale.dressage')}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded shadow">
              {t('forSale.stallion')}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded shadow">
              {t('forSale.breeding')}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded shadow">
              {t('forSale.foal')}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

