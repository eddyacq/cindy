import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({ className = '', defaultValue = '' }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search products..."
        className="input pl-11"
      />
    </form>
  )
}
