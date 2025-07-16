import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <main
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-24"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        {/* Overlay negro con opacidad */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Contenido centrado encima del fondo */}
        <div className="relative z-10 max-w-4xl text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-6">
            The Story Behind Equisio
          </h1>
          <p className="text-lg md:text-xl leading-relaxed px-4 md:px-8">
            <strong>Equisio</strong> was born from a passion for the equestrian world, with the aim of assisting individuals who wish to acquire a specimen, while modernizing the market through new technologies.
            <br /><br />
            We are dedicated to connecting horse lovers, riders, and breeders through a platform that values trust, transparency, and quality above all else.
            <br /><br />
            Whether you're an amateur seeking your first horse, or a professional looking to expand your stable, Equisio offers curated listings and personalized support every step of the way.
            <br /><br />
            <span className="italic text-yellow-300 font-medium">
              Join our growing global community — where excellence meets authenticity.
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}


