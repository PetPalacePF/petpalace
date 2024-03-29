
import { useEffect, useState } from "react"
import { getAllProducts } from "../../utils/getAllProducts"
import { Card } from "../Cards/Card"
import getCategories from "../../utils/getCategories"

export const Shop = ({ setProducts, products }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllProducts(setProducts)
    getCategories(setCategories)
  }, [])

  return (
    <div className="flex flex-row">
      <div className="bg-purple-300 text-white font-bold flex flex-col gap-4 h-fixed p-6 w-[200px]">
        <h1 className="text-2xl">Categories</h1>
        <div>
          {categories?.map((category) => (
            <div key={category.id} className="flex gap-2">
              <ul>{category.name}</ul>
            </div>
          ))}
        </div>
      </div>
      {/* <SearchResults searchResults={searchResults} loading={loading} error={error} /> */}

      <div className="mt-20 flex flex-wrap justify-center">
        {products?.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 p-2">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
