// pages/for_sale.tsx
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ForSale() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Horses for Sale</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Doma</h2>
          {/* Aquí se mostrarán los caballos con status = "En doma" */}
          <div className="grid md:grid-cols-3 gap-6">{/* Cards */}</div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Sementales</h2>
          <div className="grid md:grid-cols-3 gap-6">{/* Cards */}</div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Yeguas para Cría</h2>
          <div className="grid md:grid-cols-3 gap-6">{/* Cards */}</div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Potros</h2>
          <div className="grid md:grid-cols-3 gap-6">{/* Cards */}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}
