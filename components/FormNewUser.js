import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";

function FormNewUser() {
  const router = useRouter();

  const [user, setUser] = useState({
    uid: uuidv4(),
    name: "",
    email: "",
    username: "",
    password: "",
    retype: "",
    role: "dependiente",
    enabled: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO: validacion js de los datos antes de enviar

    if (user.password != user.retype) {
      alert("No match");
      return;
    }

    try {
      user.password = bcrypt.hashSync(
        user.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      const res = await axios.post("/api/users", user);
      router.push("/users");
      //console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          minLength={3}
          maxLength={35}
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
          required
        />
        <br />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          minLength={3}
          maxLength={35}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          minLength={6}
          maxLength={35}
          autoComplete="off"
          required
        />
        <br />
        <label htmlFor="retype">Retype</label>
        <input
          type="password"
          name="retype"
          id="retype"
          onChange={handleChange}
          minLength={3}
          maxLength={35}
          autoComplete="off"
          required
        />
        <br />
        <label htmlFor="role">Role</label>
        <select name="role" id="role" onChange={handleChange}>
          <option value="dependiente">Dependiente</option>
          <option value="cantinero">Cantinero</option>
          <option value="cocinero">Cocinero</option>
          <option value="administrador">Administrador</option>
        </select>
        <br />

        <button type="reset">Clear</button>
        
        <button
          type="submit"
          disabled={
            !user.name || !user.username || !user.password || !user.retype
          }
        >
          Accept
        </button>
      </form>

      
    </>
  );
}

export default FormNewUser;
