import FormNewUser from "@/components/FormNewUser";
import Layout from "@/components/Layout";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function newUser() {
  return (
    <>
      <Head>
        <title>TF | Nuevo Usuario</title>
      </Head>
      <Layout>
        <FormNewUser />
      </Layout>
    </>
  );
}

export default newUser;

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
