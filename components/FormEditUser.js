import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

function FormEditUser() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "dependiente",
    enabled: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (router.query.id) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/" + router.query.id);
    setUser(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/api/users/${router.query.id}`, user);
    router.push("/users");
  };

  const delUser = async (id) => {
    if (confirm("Do you really want to delete user?")) {
      await axios.delete(`/api/users/${id}`);
      router.push("/users");
    }
  };
  const changePassw = async (id) => {
    let sign = bcrypt.hashSync(
      prompt("Introduce a new password"),
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    await axios.post(`/api/users/${id}`, {passw:sign});
    router.push("/users");
  };

  const handleReset = () => {
    if (router.query.id) {
      getUser();
    }
  };

  return (
    <>
      <h2>Username: {user.username}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          minLength={3}
          maxLength={35}
          defaultValue={user.name}
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          maxLength={35}
          defaultValue={user.email}
          required
        />

        <br />
        <label htmlFor="role">Role</label>
        <select name="role" id="role" onChange={handleChange} value={user.role}>
          <option value="dependiente">Dependiente</option>
          <option value="cantinero">Cantinero</option>
          <option value="cocinero">Cocinero</option>
          <option value="administrador">Administrador</option>
        </select>
        <br />

        <label htmlFor="enabled">Enabled</label>
        <select
          name="enabled"
          id="role"
          onChange={handleChange}
          value={user.enabled}
        >
          <option value="1">Yes</option>
          <option value="0">NO</option>
        </select>
        <br />

        <button type="reset" onClick={handleReset}>
          Clear
        </button>

        <button type="submit" disabled={!user.name}>
          Update
        </button>
      </form>

      <br />
      <hr />
      <button onClick={() => delUser(user.uid)}>Delete</button>
      <button onClick={() => changePassw(user.uid)}>Change Passw</button>
    </>
  );
}

export default FormEditUser;
