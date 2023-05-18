import Layout from "@/components/Layout"
import Link from "next/link"


function index() {
  return (
    <>
    <Layout>
        products
        <hr />
        <Link href="/products/new">New</Link>
    </Layout>
    </>
  )
}

export default index