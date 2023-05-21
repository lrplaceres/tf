import FormNewUser from "@/components/FormNewUser";
import Layout from "@/components/Layout";
import Head from "next/head";

function newUser() {
  return (
    <>
      <Head>
        <title>TF | New User</title>
      </Head>
      <Layout>
          <FormNewUser />
      </Layout>
    </>
  );
}

export default newUser;
