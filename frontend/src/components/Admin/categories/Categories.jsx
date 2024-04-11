import Category from './Category'

const Categories = ({ allCategories, setAllCategories }) => {

  return (
      <table className="w-full text-left">
        <thead className='h-16'>
          <tr>
            <th>Name</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            allCategories.allIds.map(idCategory => (
              <Category
                key={idCategory}
                id={idCategory}
                name={allCategories.byId[idCategory].name}
                products={allCategories.byId[idCategory].products}
                setAllCategories={setAllCategories}
                allCategories={allCategories}
              />
            ))
          }
        </tbody>
      </table>
  )
}

export default Categories