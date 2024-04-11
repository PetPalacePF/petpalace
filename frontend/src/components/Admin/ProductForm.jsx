import { useState, useEffect } from "react";
import axios from "axios";
import validation from "../../utils/validation";
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
    categories: []
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");

        const categoriesWithData = response.data.map((category) => {
          const products = category.products.map((product) => product.name);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const error = validation[name] ? validation[name](value) : null;
    setProductInfo({ ...productInfo, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChangeCategory = (event) => {
    const { name, value } = event.target;
    const error = validation[name] ? validation[name](value) : null;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (name === "category") {
      const selectedCategory = value;

      if (
        !selectedCategory ||
        productInfo.categories.some((c) => c === selectedCategory)
      ) {
        return;
      }

      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        categories: [...prevProductInfo.categories, selectedCategory]
      }));
      setSelectedCategory("");
    }
  };

  const handleDelete = (index, type) => {
    if (type === "category") {
      const updatedCategories = [...productInfo.categories];
      updatedCategories.splice(index, 1);
  
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        categories: updatedCategories
      }));
  
      const categoryError = validation.category(updatedCategories);
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        categories: categoryError
      }));
    }
  };

  const handleImageChange = (e) => {
    setProductInfo({ ...productInfo, img: e.target.files[0] });
  };

  const uploadImageCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "w72q2kja");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/petpalacecloudinary/image/upload",
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = await uploadImageCloudinary(productInfo.img);

      await axios.post("http://localhost:5000/products", {
        ...productInfo,
        img: imgUrl
      });

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

      setSuccessMessage("Product created successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setErrorMessage("Error: cannot create products with empty fields");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mx-auto mt-20 space-y-1">
      <h2 className="text-2xl font-bold mb-4 text-center border-b-2 border-black pb-2">Create New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-purple-100 p-8 rounded-lg shadow-md">
        <label htmlFor="brand" className='block text-sm font-medium text-gray-700'>Brand:</label>
        <input
          type="text"
          name="brand"
          value={productInfo.brand}
          onChange={handleChange}
          placeholder="Enter the brand..."
          className="input-field mt-0.5 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.brand && <div>{errors.brand}</div>}
  
        <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name:</label>
        <input
          type="text"
          name="name"
          value={productInfo.name}
          onChange={handleChange}
          placeholder="Enter the name..."
          className="input-field mt-0.5 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.name && <div>{errors.name}</div>}
  
        <label htmlFor="img" className='block text-sm font-medium text-gray-700'>Image:</label>
        <input
          type="file"
          name="img"
          onChange={handleImageChange}
          accept="image/*"
          className="input-field"
        />
        {errors.img && <div>{errors.img}</div>}
  
        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description:</label>
        <textarea
          name="description"
          value={productInfo.description}
          onChange={handleChange}
          placeholder="Description"
          className="input-field mt-0.5 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.description && <div>{errors.description}</div>}
  
        <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Price:</label>
        <input
          type="number"
          name="price"
          value={productInfo.price}
          onChange={handleChange}
          placeholder="Enter the price..."
          className="input-field mt-0.5 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
          min="0"
        />
        {errors.price && <div>{errors.price}</div>}
  
        <label htmlFor="stock" className='block text-sm font-medium text-gray-700'>Stock:</label>
        <input
          type="number"
          name="stock"
          value={productInfo.stock}
          onChange={handleChange}
          placeholder="Enter the stock"
          className="input-field mt-0.5 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.stock && <div>{errors.stock}</div>}
  
        <label htmlFor="rating" className='block text-sm font-medium text-gray-700'>Rating:</label>
        <input
          type="number"
          name="rating"
          value={productInfo.rating}
          onChange={handleChange}
          placeholder="Rating (0-5)..."
          className="input-field mt-0.5 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
          min="0"
          max="5"
        />
        {errors.rating && <div>{errors.rating}</div>}
  
        <label htmlFor="categories" className='block text-sm font-medium text-gray-700'>Categories:</label>
        <select
          name="category"
          value={selectedCategory}
          onChange={handleChangeCategory}
        >
          <option value="">Select categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <div>{errors.category}</div>}
        
        <label className='block text-sm font-medium text-gray-700'>Categories selected:</label>
        <div>
          <ul>
            {productInfo.categories.map((categoryId, index) => {
              const category = categories.find((cat) => cat.id === parseInt(categoryId));
              return (
                <li key={index}>
                  {category ? category.name : "Categoria no encontrada"}
                  <button type="button" onClick={() => handleDelete(index, "category")}>
                    x
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {console.log("Selected categories:", productInfo.categories)}
        <br />
  
        <div className="flex justify-between">
          <Link to="/" className="container">
            <button
              style={{ border: 'none', borderRadius: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#8e0b0b', color: 'white', marginRight: '10px' }}
            >Back</button>
          </Link>
          <button
            type="submit"
            style={{ border: 'none', borderRadius: '20px', padding: '5px 80px', cursor: 'pointer', backgroundColor: '#0450a1', color: 'white' }}
          >Create Product</button>
        </div>
        {successMessage &&
          <div style={{
            color: '#4caf50', backgroundColor: '#dff0d8', border: '1px solid #4caf50', padding: '10px', margin: '10px auto', borderRadius: '4px', fontWeight: 'bold', width: 'fit-content'
          }}>{successMessage}</div>}
        {errorMessage &&
          <div style={{
            color: '#ff0000', backgroundColor: '#ffd2d2', border: '1px solid #ff0000', padding: '10px', margin: '10px auto', borderRadius: '4px', fontWeight: 'bold', width: 'fit-content'
          }}>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default ProductForm;