import FormNewUser from "@/components/FormNewUser";
import Layout from "@/components/Layout";
import axios from "axios";

function edit() {
  return (
    <>
      <Layout>
        <FormNewUser />
      </Layout>
    </>
  );
}

export default edit;

export async function getServerSideProps(context) {
  const { data: user } = await axios.get(
    "http://localhost:3000/api/users/" + context.query.id
  );
  return {
    props: { user }, // will be passed to the page component as props
  };
}
