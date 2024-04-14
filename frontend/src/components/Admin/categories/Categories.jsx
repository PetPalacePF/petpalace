import React from 'react';
import Category from './Category';

const Categories = ({ allCategories, setAllCategories, filteredCategories }) => {
  // Define qué categorías mostrar
  const categoriesToDisplay = filteredCategories.length > 0 ? filteredCategories : allCategories.allIds;

  return (
    <div className="mt-10">
      <table className="w-full text-left border-collapse">
        <thead className=''>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapea las categorías a mostrar */}
          {categoriesToDisplay.map(idCategory => (
            <Category
              key={idCategory}
              id={idCategory}
              name={allCategories.byId[idCategory].name}
              products={allCategories.byId[idCategory].products}
              setAllCategories={setAllCategories}
              allCategories={allCategories}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
