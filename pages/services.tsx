import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <>
      <main
        style={{ backgroundImage: "url('/services_principal.jpeg')" }}
        className="bg-cover bg-center min-h-screen"
      >
        <div className="bg-black bg-opacity-70 min-h-screen px-4 py-20 text-white">

          {/* Cabecera */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold">Equestrian Partners</h1>
            <p className="mt-3 text-lg text-gray-300">
              Explore quality services offered by our collaborators worldwide.
            </p>
          </section>

          {/* Tarjetas de servicios */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
            {/* Bloque 1 */}
            <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/services_rui.jpeg"
                className="w-full h-48 object-cover"
                alt="Rui Handmade"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">Rui Handmade</h2>
                <p className="text-sm text-gray-700">Custom handmade leather branding from Seville.</p>
              </div>
            </div>

            {/* Bloque 2 */}
            <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/Equivet.jpeg"
                className="w-full h-48 object-cover"
                alt="Equivet"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">Equivet</h2>
                <p className="text-sm text-gray-700">
                  Veterinary services for equines – Mobile clinic<br />
                  Emergency services 24 hours (654 288 988)
                </p>
              </div>
            </div>

            {/* Bloque 3 */}
            <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/service_veinhorse.jpg"
                className="w-full h-48 object-cover"
                alt="Veinhorse"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">Veinhorse</h2>
                <p className="text-sm text-gray-700">
                  • Transporte de caballos con conductor.<br />
                  • Transporte de mascotas.<br />
                  • Alquiler de furgonetas adaptadas.
                </p>
              </div>
            </div>

            {/* Bloque 4 */}
            <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/casa_vidal.jpg"
                className="w-full h-48 object-cover"
                alt="Casa Vidal"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">Casa Vidal</h2>
                <p className="text-sm text-gray-700">Official distributor and craftsmen since 1920</p>
              </div>
            </div>
          </section>

          {/* Formulario de promoción */}
          <section className="max-w-2xl mx-auto bg-white text-black rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">Promote your service</h3>
            <form method="POST" action="/api/contact" className="space-y-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                required
                className="w-full p-3 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full p-3 border rounded"
              />
              <textarea
                name="message"
                placeholder="Describe your service"
                required
                className="w-full p-3 border rounded h-32 resize-none"
              ></textarea>
              <input
                type="file"
                name="file"
                className="w-full p-2 border rounded bg-gray-50"
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded transition"
              >
                Send
              </button>
            </form>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}


