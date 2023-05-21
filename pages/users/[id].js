import FormEditUser from "@/components/FormEditUser";
import Layout from "@/components/Layout";
import Head from "next/head";

function edit() {
  return (
    <>
      <Head>
        <title>TF | Editar Usuario</title>
      </Head>
      <Layout>
        <FormEditUser />
      </Layout>
    </>
  );
}

export default edit;
