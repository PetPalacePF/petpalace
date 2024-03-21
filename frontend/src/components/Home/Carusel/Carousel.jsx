/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import img1 from "../../../../public/Carousel_1.jpg"
import img2 from "../../../../public/Carousel_2.jpg"
import img3 from "../../../../public/Carousel_3.jpeg"

function Carousel() {

  const images = [
    img1, img2, img3
  ]

  const [img, setImg] = useState(0)

  function next() {
    if (img < images.length - 1) setImg(img + 1)
    else setImg(0)
  }

  function back() {
    if (img > 0) setImg(img - 1)
    else setImg(images.length - 1)
  }

  useEffect(() => {
    const time = setTimeout(next, 6000)
    return () => clearTimeout(time)
  }, [img])

  return (
    <div>
      <div className='h-full w-full slideshowContainer' >
        <img key={img} src={images[img]} className='w-full max-h-35vw object-cover object-center block mx-auto fade' />
        <a className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 text-white font-bold text-xl cursor-pointer prev transition-colors duration-300 hover:text-gray-300" onClick={back}>&#10094;</a>
<a className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 text-white font-bold text-xl cursor-pointer next transition-colors duration-300 hover:text-gray-300" onClick={next}>&#10095;</a>
        <div className='absolute bottom-20 left-0 right-0 mx-auto text-center dotContainer'>
          {images.length ?
            images.map((e, k) =>
              <span key={k + 1} className={`inline-block w-3 h-3 mx-1 rounded-full cursor-pointer ${img !== k ? 'bg-gray-400 bg-opacity-50' : 'bg-gray-700 bg-opacity-50'}`} onClick={() => setImg(k)}></span>
            )
            :
            <p>Image not found</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Carousel