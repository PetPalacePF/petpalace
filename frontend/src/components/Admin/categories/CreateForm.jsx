import useInputCreateCategories from '../../../hooks/input/useInputCreateCategories'
import postCategory from '../../../utils/postCategory'

const CreateForm = ({ setAllCategories, allCategories }) => {
  
    const { handleChange, formData, error, setError, resetForm } = useInputCreateCategories()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await postCategory(formData)
        resetForm()
        if(data.message) {
            console.log(data)
            setError(data.response.data.error)
            setTimeout(() => {
                setError()
            }, 5000)
            return
        }
        console.log(data)
        setAllCategories({
            ...allCategories,
            allIds: [ ...allCategories.allIds, data.id ],
            byId: {
                ...allCategories.byId,
                [data.id]: {
                    ...data,
                    products: []
                } 
            }
        })
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='fixed bg-white z-50 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 h-[350px] w-[300px] rounded-lg p-6 flex flex-col justify-between'
            >
                <div>
                    {
                        error &&
                        <div className='w-full text-[15px] bg-red-600 font-medium text-white text-center uppercase mb-4 py-1'>
                            <p>{error}</p>
                        </div>
                    }
                    <label
                        className='text-sm font-medium block'
                    >Name</label>
                    <input 
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='mt-1 px-2 box-border rounded-lg border border-[#ccc] outline-none text-[15px] w-full'
                    />
                </div>
                <button
                    className='bg-violetamain text-white w-full py-1 uppercase font-medium'
                >Create</button>
            </form>
        </>
    )
}

export default CreateForm