import FormNewProduct from "@/components/FormNewProduct";
import Layout from "@/components/Layout";
import Head from "next/head";

function newProduct() {
  return (
    <>
      <Head>
        <title>TF | New Product</title>
      </Head>
      <Layout>
        <fieldset>
          <legend>Form insert Product</legend>
        <FormNewProduct />
        </fieldset>
      </Layout>
    </>
  );
}

export default newProduct;
