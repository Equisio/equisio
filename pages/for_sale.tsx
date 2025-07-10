// pages/for_sale.tsx
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ForSale() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black px-4 pt-24">
        <h1 className="text-4xl font-bold text-center text-yellow-500 mb-10">
          Horses for Sale
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-8">
          Browse through our selection of quality horses listed by trusted sellers. If you're looking to buy a horse, this is the place to start.
        </p>

        {/* Aquí se mostrarán los caballos listados próximamente */}
        <div className="border rounded p-4 shadow-md max-w-2xl mx-auto text-center">
          <p>There are no horses listed yet. Be the first to submit your horse for sale!</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

