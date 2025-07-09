import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
        style={{ backgroundImage: "url('/home.jpg')" }}>
        <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4">
            Where Excellence Meets Authenticity
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            The premium platform for buying and selling purebred horses, verified and trusted worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/for_sale">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded">
                Browse Horses
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded">
                Sell Your Horse
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
