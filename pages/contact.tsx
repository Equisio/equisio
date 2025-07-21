import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <main
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        {/* Overlay oscuro para mejorar el contraste */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

        {/* Contenido principal */}
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6 py-12 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
            Contact Us
          </h1>

          <p className="text-lg md:text-xl text-gray-100 mb-8">
            We’d love to hear from you! Whether you have a question about our services,
            want to collaborate, or need help finding the right horse, feel free to reach out.
          </p>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md text-left max-w-md mx-auto">
            <p className="mb-3 text-base">
              <strong className="text-yellow-300">Email:</strong>{' '}
              <a href="mailto:equisio_for_sale@gmail.com" className="underline">
                equisio_for_sale@gmail.com
              </a>
            </p>
            <p className="text-base">
              <strong className="text-yellow-300">Instagram:</strong>{' '}
              <a
                href="https://www.instagram.com/equisio_for_sale"
                className="underline text-yellow-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                @equisio_for_sale
              </a>
            </p>
          </div>

          <p className="mt-10 text-gray-200 text-lg max-w-xl mx-auto">
            At <span className="text-yellow-300 font-medium">Equisio</span>, we believe that strong
            connections create successful partnerships. Reach out and let’s take the first step together.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}

