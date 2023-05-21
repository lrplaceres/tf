import FormNewProduct from "@/components/FormNewProduct";
import Layout from "@/components/Layout";
import Head from "next/head";

function newProduct() {
  return (
    <>
      <Head>
        <title>TF | Nuevo Producto</title>
      </Head>
      <Layout>
        <FormNewProduct />
      </Layout>
    </>
  );
}

export default newProduct;
