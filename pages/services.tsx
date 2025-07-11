import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <>
      <Navbar />
      <main
        style={{ backgroundImage: "url('/services_principal.jpeg')" }}
        className="bg-cover bg-center min-h-screen"
      >
        <div className="bg-black bg-opacity-60 min-h-screen px-4 py-20">

          {/* Cabecera */}
          <section className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold"> Equestrian Partners</h1>
            <p className="mt-2 text-lg">
              Explore quality services offered by our collaborators worldwide.
            </p>
          </section>

          {/* Tacos de publicidad */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Bloque 1 */}
            <div className="bg-white text-black rounded shadow p-4">
              <img
                src="/services_rui.jpeg"
                className="w-full h-48 object-cover rounded mb-3"
                alt="Rui Leathercraft"
              />
              <h2 className="text-xl font-semibold">Rui Leathercraft</h2>
              <p className="text-sm">Custom handmade leather branding from Seville.</p>
            </div>

            {/*Bloque 2 */ }
            <div className="bg-white text-black rounded shadow p-4">
              <img
                src="/Equivet.jpeg"
                className="w-full h-48 object-cover rounded mb-3"
                alt="Equivet"
              />
              <h2 className="text-xl font-semibold">Equivet</h2>
              <p className="text-sm">Veterinary services for equines - Mobile clinic
Emergency services 24 hours (654288988)</p>
            </div>

            {/*Bloque 3 */ }
            <div className="bg-white text-black rounded shadow p-4">
              <img
                src="/service_veinhorse.jpg"
                className="w-full h-48 object-cover rounded mb-3"
                alt="Veinhorse"
              />
              <h2 className="text-xl font-semibold">Veinhorse</h2>
              <p className="text-sm">International transport service</p>
            </div>

          </section>

          {/* Formulario de contacto para empresas */}
          <section className="mt-20 max-w-xl mx-auto bg-white p-6 rounded shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Promote your service</h3>
            <form className="flex flex-col space-y-3">
              <input type="text" placeholder="Company Name" className="p-2 border rounded" />
              <input type="email" placeholder="Email" className="p-2 border rounded" />
              <textarea
                placeholder="Describe your service"
                className="p-2 border rounded h-24"
              />
              <input type="file" className="p-2 border rounded bg-gray-100" />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
              >
                Submit
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

