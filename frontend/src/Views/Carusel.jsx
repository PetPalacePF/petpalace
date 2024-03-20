/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react"
import Carrusel_1 from "../assets/Carrusel_1.jpg"
import Carrusel_2 from "../assets/Carrusel_2.jpg"
import Carrusel_3 from "../assets/Carrusel_3.jpeg"

const images = [
    Carrusel_1, Carrusel_2, Carrusel_3
]

let count = 0;
export const Carusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const imgRef = useRef();

    const removeAnimation = () => {
        imgRef.current.classList.remove("fade-anim");
    }

    useEffect(() => {
        imgRef.current.addEventListener("animationend", removeAnimation);
        startSlider()
    }, [])

    const startSlider = () => {
        setInterval(() => {
            count = (count + 1) % images.length;
            setCurrentIndex(count);
            imgRef.current.classList.add("fade-anim");
        }, 6000)
    }

    return (
        <div className='container my-5'>
            <div ref={imgRef} className='overflow-hidden relative'>
                <div className='flex transition ease-out duration-400'>
                    <img src={images[currentIndex]} className="w-1920px h-680px" />
                    {/* {images.map((image, i) => (
                        <img src={image} key={i} className="w-1920px h-680px" />
                    ))} */}
                </div>
            </div>
        </div>
    )
}
