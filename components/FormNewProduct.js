import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function FormNewProduct() {
  const router = useRouter();

  const [product, setProduct] = useState({
    uid: uuidv4(),
    name: "",
    photo: "",
    description: "",
    price: "",
    cost: "",
    category: "Shots",
    enabled: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", product);
      router.push("/products");
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          minLength={3}
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" name="photo" onChange={handleChange} />
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="3"
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor="cost">Cost</label>
        <input type="number" id="cost" name="cost" onChange={handleChange} />
        <br />
        <label htmlFor="category">Category</label>
        <select name="category" id="category" onChange={handleChange}>
          <option value="Shots">Shots</option>
          <option value="Cigarros">Tabacos y Cigarros</option>
          <option value="Cocteleria">Cocteler&iacute;a</option>
          <option value="Cremas">Cremas</option>
          <option value="Licores">Licores</option>
          <option value="Cognac">Cognac</option>
          <option value="Brandy">Brandy</option>
          <option value="Whisky">Whisky</option>
          <option value="Rones">Rones</option>
          <option value="Premium">Premium</option>
          <option value="Ofertas">Ofertas especiales</option>
          <option value="Cervezas">Cervezas</option>
        </select>
        <br />
        <label htmlFor="enabled">Enabled</label>
        <select name="enabled" id="role" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">NO</option>
        </select>
        <br />
        <br />
        <br />
        <button type="reset">Clear</button>
        <button disabled={!product.name || !product.price}>Accept</button>
      </form>
    </>
  );
}

export default FormNewProduct;
