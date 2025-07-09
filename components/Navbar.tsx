import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-black bg-opacity-70 text-white p-4 fixed w-full top-0 z-50">
      <ul className="flex space-x-6 justify-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/for_sale">Horses for Sale</Link></li>
        <li><Link href="/community">Community</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}
