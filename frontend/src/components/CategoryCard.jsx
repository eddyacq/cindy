import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
          Shop now <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}
