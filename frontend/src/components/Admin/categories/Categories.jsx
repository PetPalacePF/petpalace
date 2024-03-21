import Category from './Category'

const Categories = ({allCategories}) => {

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
             name={allCategories.byId[idCategory].name}
             products={allCategories.byId[idCategory].products}
           />
         ))
       }
    </tbody>
  </table>
  )

}

export default Categories