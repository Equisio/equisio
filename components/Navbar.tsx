// components/Navbar.tsx
import Link from 'next/link'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-black bg-opacity-70 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold">
            <Link href="/">Equisio</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/for_sale">Horses for Sale</Link>
            <Link href="/community">Community</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 px-4 py-2 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/for_sale" onClick={() => setIsOpen(false)}>Horses for Sale</Link>
          <Link href="/community" onClick={() => setIsOpen(false)}>Community</Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  )
}
