'use client'

interface Props { suggestions: string[] }

export default function SuggestionList({ suggestions }: Props) {
  if (!suggestions.length) return null

  return (
    <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--accent)]/20 space-y-2">
      <div className="text-xs text-[var(--accent)]">💡 Suggestions</div>
      {suggestions.map((tip, i) => (
        <div key={i} className="text-sm text-gray-300 flex gap-2">
          <span className="text-[var(--accent)]">→</span>
          {tip}
        </div>
      ))}
    </div>
  )
}
