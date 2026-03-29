'use client'
import { useState } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function PasswordInput({ value, onChange }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter password to analyze..."
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-[var(--surface)] border border-[#2a2a3a] rounded-xl px-5 py-4 text-lg font-mono
                   text-white placeholder-gray-600 outline-none focus:border-[var(--accent)]
                   transition-colors pr-16"
      />
      <button
        onClick={() => setShow(s => !s)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-sm transition-colors"
        tabIndex={-1}
        type="button"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? '🙈' : '👁'}
      </button>
    </div>
  )
}
