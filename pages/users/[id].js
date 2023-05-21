import FormEditUser from "@/components/FormEditUser";
import Layout from "@/components/Layout";
import Head from "next/head";

function edit() {
  return (
    <>
      <Head>
        <title>TF | Edit Users</title>
      </Head>
      <Layout>
        <FormEditUser />
      </Layout>
    </>
  );
}

export default edit;
