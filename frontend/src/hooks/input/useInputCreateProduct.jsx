import { useState } from "react";

const useInputCreateProduct = () => {
    const [ formData, setFormData ] = useState({
        brand:'',
        name:'',
        img:'',
        description:'',
        price:'',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const resetForm = () => {
        setFormData({
            brand:'',
            name:'',
            img:'',
            description:'',
            price:'',
        })
    }

    return {
        formData,
        handleChange,
        resetForm
    }
}