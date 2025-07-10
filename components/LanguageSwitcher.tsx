// components/LanguageSwitcher.tsx
'use client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const changeLanguage = (lang: string) => {
    const path = router.asPath
    router.push(path, path, { locale: lang })
    setOpen(false)
  }

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300"
      >
        Language 🌐
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="block w-full px-4 py-2 text-left hover:bg-yellow-100"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
