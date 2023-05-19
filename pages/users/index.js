import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

function index({ users }) {
  return (
    <>
      <Head>
        <title>TF | Users</title>
      </Head>
      <Layout>
        <Link href="/users/new">New</Link>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5}>empty</td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={i.toString()}>
                  <td>
                    <Link href={`/users/${user.uid}`}>{user.username}</Link>
                  </td>
                  <td>{user.role}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => delUser(user.uid)}>Delete</button>
                    <button>Passw</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Layout>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data: users } = await axios.get("http://localhost:3000/api/users");
  return {
    props: {
      users,
    },
  };
}
