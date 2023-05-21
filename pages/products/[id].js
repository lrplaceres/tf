import FormNewProduct from "@/components/FormNewProduct";
import Layout from "@/components/Layout";
import Head from "next/head";

function edit() {
  return (
    <>
      <Head>
        <title>TF | Editar Producto</title>
      </Head>
      <Layout>
        <FormNewProduct />
      </Layout>
    </>
  );
}

export default edit;