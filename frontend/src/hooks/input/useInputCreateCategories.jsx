import { useState } from "react";

const useInputCreateCategories = () => {

    const [formData, setFormData] = useState({
        name:'' 
    })
    
    const [error, setError] = useState('')

    const handleChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const resetForm = () => setFormData({name:''})

    return {
        formData,
        handleChange,
        resetForm,
        error,
        setError
    }
}

export default useInputCreateCategories