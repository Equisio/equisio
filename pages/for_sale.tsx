import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ForSale() {
  return (
    <>
      <Navbar />
      <main
        style={{ backgroundImage: "url('/horses_for_sale.jpeg')" }}
        className="bg-cover bg-center min-h-screen"
      >
        <div className="bg-black bg-opacity-70 min-h-screen px-4 py-20 text-white">

          {/* Título */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold">Horses for Sale</h1>
            <p className="mt-2 text-lg">Discover and list horses available for sale around the world.</p>
          </section>

          {/* Lista de anuncios */}

          {/* Añade más tarjetas según lo necesites */}

          {/* Formulario para subir caballo */}
          <section className="bg-white p-6 rounded shadow max-w-xl mx-auto text-black">
            <h3 className="text-2xl font-bold mb-4">List Your Horse</h3>
            <form className="flex flex-col space-y-3">
              <input type="text" placeholder="Horse Name" className="p-2 border rounded" />
              <input type="text" placeholder="Breed" className="p-2 border rounded" />
              <input type="number" placeholder="Age" className="p-2 border rounded" />
              <input type="text" placeholder="Price (€)" className="p-2 border rounded" />
              <textarea placeholder="Description" className="p-2 border rounded h-24" />
              <input type="file" className="p-2 border rounded bg-gray-100" />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
              >
                Submit Horse for Sale
              </button>
            </form>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
