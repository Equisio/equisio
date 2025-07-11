import Link from 'next/link'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'




export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-black bg-opacity-70 text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold tracking-wide">
            <Link href="/" onClick={closeMenu}>Equisio</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
            <Link href="/for_sale" className="hover:text-yellow-400 transition">Horses for Sale</Link>
            <Link href="/community" className="hover:text-yellow-400 transition">Community</Link>
            <Link href="/services" className="hover:text-yellow-400 transition">Services</Link>
            <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} bg-black bg-opacity-90`}>
        <div className="flex flex-col items-start px-6 py-4 space-y-4 text-lg font-medium">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/for_sale" onClick={closeMenu}>Horses for Sale</Link>
          <Link href="/community" onClick={closeMenu}>Community</Link>
          <Link href="/services" onClick={closeMenu}>Services</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}

