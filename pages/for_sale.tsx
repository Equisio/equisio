// pages/for_sale.tsx
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ForSale() {
  return (
    <>
      <Navbar />
      <main
        className="relative min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/horses_for_sale.jpeg')" }} // ← Reemplaza por tu imagen
      >
        {/* Capa de opacidad para legibilidad */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 py-20 px-6 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400">
            Horses for Sale
          </h1>
          <p className="text-lg md:text-xl mb-10">
            Discover top horses available worldwide, organized by type and purpose.
          </p>

          {/* Botones de categorías */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
            <a href="#doma" className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-8 rounded">
              Doma
            </a>
            <a href="#sementales" className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-8 rounded">
              Sementales
            </a>
            <a href="#yeguas" className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-8 rounded">
              Yeguas para Cría
            </a>
            <a href="#potros" className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-8 rounded">
              Potros
            </a>
          </div>

          {/* Secciones vacías por ahora */}
          <section id="doma" className="mb-16 text-left">
            <h2 className="text-2xl font-bold mb-4">Caballos en Doma</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cards dinámicas aquí más adelante */}
            </div>
          </section>

          <section id="sementales" className="mb-16 text-left">
            <h2 className="text-2xl font-bold mb-4">Sementales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cards dinámicas aquí más adelante */}
            </div>
          </section>

          <section id="yeguas" className="mb-16 text-left">
            <h2 className="text-2xl font-bold mb-4">Yeguas para Cría</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cards dinámicas aquí más adelante */}
            </div>
          </section>

          <section id="potros" className="mb-16 text-left">
            <h2 className="text-2xl font-bold mb-4">Potros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cards dinámicas aquí más adelante */}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
