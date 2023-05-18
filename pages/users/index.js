import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";

function index({ users }) {
  return (
    <>
      <Layout>
        <Link href="/users/new">New</Link>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              {/*TODO: incluir delete con confirmacion */}
              {/*TODO: incluir deshabilitar/habilitar con confirmacion */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i.toString()}>
                <td><Link href={`/users/${user.uid}`}>{user.username}</Link></td>
                <td>{user.role}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
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
    }, // will be passed to the page component as props
  };
}
