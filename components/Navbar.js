import Link from "next/link"


function Navbar() {
  return (
    <nav>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/users">Users</Link></li>
      <li><Link href="/products">Products</Link></li>
    </nav>
  )
}

export default Navbar