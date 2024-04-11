import { useEffect } from "react"

const BackgroundBlur = ({children, showCart, onClick}) => {

  useEffect(() => {

    document.body.style.overflow = "hidden";
    document.body.style.marginRight = "16px";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0";
    };
    
  }, []);

  return (
    <>
        <div  
            className={`fixed right-0 top-0 h-screen w-screen bg-black ${ showCart ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0 backdrop-blur-0' } z-40 transition-all`}
            onClick={onClick}
        />
        { children }
    </>
  )
}

export default BackgroundBlur