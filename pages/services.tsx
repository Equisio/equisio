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
          <form method="POST" action="/api/contact">
          <input type="text" name="companyName" placeholder="Company Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Describe your service" required></textarea>
          <button type="submit">Send</button>
          </form> 
        </div>
      </main>
      <Footer />
    </>
  )
}

