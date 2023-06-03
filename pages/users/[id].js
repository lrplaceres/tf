import FormEditUser from "@/components/FormEditUser";
import Layout from "@/components/Layout";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session.role != "administrador") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
