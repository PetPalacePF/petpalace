import { useState, useEffect } from 'react';
import { Card } from './Card';
import { getAllProducts } from '../../utils/getAllProducts';

export default function Cards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  console.log(products);
  // const { products } = products;

  // const displayedProducts = productsArr.slice(0, 4);


  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-5">
      {products.products?.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}