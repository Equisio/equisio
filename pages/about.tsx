import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <main
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white text-center px-4"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">
          How did Equisio originate?
        </h1>
        <p className="max-w-3xl text-lg md:text-xl drop-shadow mb-6 leading-relaxed">
          <strong>Equisio</strong> was born from a passion for the equestrian world, with the aim of assisting individuals who wish to acquire a specimen, while modernizing the market through new technologies.

          <br /><br />
          We are dedicated to connecting horse lovers, riders, and breeders through a platform
          that values trust, transparency, and quality above all else.
          <br /><br />
          Whether you're an amateur seeking your first horse, or a professional looking to expand your stable,
          Equisio offers curated listings and personalized support every step of the way.
          <br /><br />
          Join our growing global community — where excellence meets authenticity.
        </p>
      </main>
      <Footer />
    </>
  )
}

