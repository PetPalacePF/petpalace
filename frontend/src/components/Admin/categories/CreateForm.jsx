import useInputCreateCategories from '../../../hooks/input/useInputCreateCategories'

import postCategory from '../../../utils/postCategory'

const CreateForm = () => {
  
    const { handleChange, formData } = useInputCreateCategories()
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await postCategory(formData)
        if(data.message) return console.log('ERROR')
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div>
                <label>Name</label>
                <input 
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <button>Send</button>
        </form>
    )
}

export default CreateForm