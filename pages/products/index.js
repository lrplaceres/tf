import Layout from "@/components/Layout";
import Head from "next/head";

import Link from "next/link";

function index() {
  return (
    <>
      <Head>
        <title>TF | Products</title>
      </Head>
      <Layout>
        products
        <hr />
        <Link href="/products/new">New</Link>
      </Layout>
    </>
  );
}

export default index;