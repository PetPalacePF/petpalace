import ResetFilter from '../../assets/resetfilter.png'
import PlusIcon from '../../assets/plusicon.png'

const Products = () => {
  return(
    <>
      <div className='border-b-2 border-[#A1A2A2] mb-4'>
        <h1 className='font-semibold text-2xl pb-1'>Products</h1>
      </div>

      <div className='flex gap-4'>
        <div
            className='border-2 border-violetamain rounded-lg w-[33px] h-[33px] flex items-center justify-center font-semibold text-violetamain'
        >
          <img src={ResetFilter} />
        </div>
        <button 
          className='border-2 border-violetamain rounded-lg w-[33px] h-[33px] flex items-center justify-center font-semibold text-violetamain'>
          <img src={PlusIcon} />
        </button>
      </div>
    </>
  );
};

export default Products;
