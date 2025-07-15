import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <main
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        <h1 className="text-4xl font-bold mb-4 drop-shadow">Contact Us</h1>

        <p className="max-w-xl mb-6 drop-shadow text-lg">
          We'd love to hear from you! Whether you have a question about our services, want to collaborate, or need help finding the right horse, feel free to reach out.
        </p>

        <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-md w-full">
          <p className="mb-2"><strong>Email:</strong> equisio_for_sale@gmail.com</p>
          <p className="mb-2"><strong>Instagram:</strong> <a href="https://www.instagram.com/equisio_for_sale" className="underline text-yellow-400" target="_blank" rel="noopener noreferrer">@equisio_for_sale</a></p>
        </div>

        <p className="mt-6 max-w-xl drop-shadow text-lg">
          At Equisio, we believe that strong connections create successful partnerships. Reach out and let’s take the first step together.
        </p>
      </main>
      <Footer />
    </>
  )
}

