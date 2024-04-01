import { useState, useEffect } from "react";
import axios from "axios";
import validation from "../../utils/validation"
import { Link } from "react-router-dom";


const ProductForm = () => {
  const [productInfo, setProductInfo] = useState({
    brand: "",
    name: "",
    img: null,
    description: "",
    price: "",
    stock: "",
    rating: "",
    enabled: true,
    categories: "" 
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({})

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        
        const categoriesWithData = response.data.map(category => {
          // Extraigo los nombres de los productos de cada categoría
          const products = category.products.map(product => product.name);
          // Retorno la categoría con los nombres de los productos
          return {
            id: category.id,
            name: category.name,
            products: products
          };
        });
        setCategories(categoriesWithData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Defino la lógica de validación
    const error = validation[name] ? validation[name](value) : null;
  
    // Actualizo el estado de productInfo con el nuevo valor del campo y también actualizas el estado de `errors` con el resultado de la validación
    setProductInfo({ ...productInfo, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleImageChange = (e) => {
    setProductInfo({ ...productInfo, img: e.target.files[0] });
  };

  const uploadImageCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "w72q2kja"); // aquí pongo el upload_preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/petpalacecloudinary/image/upload",
        formData
      ); // En la URL incluyo el Cloud name.
      return response.data.url;
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Subo la imagen a Cloudinary
      const imgUrl = await uploadImageCloudinary(productInfo.img);

      // Guardo el producto en la base de datos, incluyendo la URL de la imagen
      await axios.post("http://localhost:5000/products", {
        ...productInfo,
        img: imgUrl
      });

      // Restablezco el estado después de enviar el formulario
      setProductInfo({
        brand: "",
        name: "",
        img: null,
        description: "",
        price: "",
        stock: "",
        rating: "",
        enabled: true,
        categories: []
      });

      // Establece el mensaje de éxito
    setSuccessMessage("Product created successfully!");
    // Limpia el mensaje de error si se estableció anteriormente
    setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    // Establece el mensaje de error
    setErrorMessage("Error: cannot create products with empty fields");
    // Limpia el mensaje de éxito si se estableció anteriormente
    setSuccessMessage("");
    }
  };

  return (
        <div className="container mx-auto mt-20 space-y-1">
          <h2 className="text-2xl font-bold mb-4 text-center">Create New Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">

          <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              name="brand"
              value={productInfo.brand}
              onChange={handleChange}
              placeholder="Enter the brand..."
              className="input-field"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
            />
            {errors.brand  && <div>{errors.brand}</div>}
            
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={productInfo.name}
              onChange={handleChange}
              placeholder="Enter the name..."
             className="input-field"
             style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
            />
            {errors.name  && <div>{errors.name}</div>}
            
            <label htmlFor="img">Image:</label>
            
            <input
              type="file"
              name="img"
              onChange={handleImageChange}
              accept="image/*"
              className="input-field"
            />
            {errors.img  && <div>{errors.img}</div>}
            <label htmlFor="description">Description:</label>
            
            <textarea
              name="description"
              value={productInfo.description}
              onChange={handleChange}
              placeholder="Description"
              className="input-field"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '1px' }}
            />
            {errors.description  && <div>{errors.description}</div>}
            
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              value={productInfo.price}
              onChange={handleChange}
              placeholder="Enter the price..."
              className="input-field"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
              min="0"
            />
            {errors.price  && <div>{errors.price}</div>}
            
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              name="stock"
              value={productInfo.stock}
              onChange={handleChange}
              placeholder="Enter the stock"
              className="input-field"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}

            />
            {errors.stock  && <div>{errors.stock}</div>}
            
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              name="rating"
              value={productInfo.rating}
              onChange={handleChange}
              placeholder="Rating (0-5)..."
              className="input-field"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
              min="0"
              max="5"
            />
            {errors.rating  && <div>{errors.rating}</div>}
            
            <label htmlFor="categories">Category:</label>
            <select
              name="categories"
              value={productInfo.categories}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category  && <div>{errors.category}</div>}
            <br />

            <div className="flex justify-between">
            <Link to="/" className="container">
          <button style={{ border: 'none',
           borderRadius: '20px',
            padding: '10px 20px', 
            cursor: 'pointer', 
            backgroundColor: '#8e0b0b', 
            color: 'white', 
            marginRight: '10px' }}
            >Back</button>
        </Link>
            <button type="submit" style={{ border: 'none',
             borderRadius: '20px',
              padding: '5px 80px',
               cursor: 'pointer',
                backgroundColor: '#0450a1',
                 color: 'white' }}
                 >Create Product</button>
                 
                 </div>
                 {successMessage && 
                 <div style={{
                  color: '#4caf50', 
                  backgroundColor: '#dff0d8', 
                  border: '1px solid #4caf50', 
                  padding: '10px', 
                  margin: '10px auto',
                  borderRadius: '4px',
                  fontWeight: 'bold', 
                  width: 'fit-content'
                }}>{successMessage}</div>}
                 {errorMessage && <div style={{
            color: '#ff0000', 
            backgroundColor: '#ffd2d2', 
            border: '1px solid #ff0000', 
            padding: '10px', 
            margin: '10px auto', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            width: 'fit-content'
          }}>{errorMessage}</div>}
          </form>
        </div>
      );
};

export default ProductForm;