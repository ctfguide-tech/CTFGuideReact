
import Link from 'next/link'

export function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-white  hover:text-slate-100"
    >
      {children}
    </a>
  )
}
