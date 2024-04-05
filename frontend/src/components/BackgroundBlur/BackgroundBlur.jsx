const BackgroundBlur = ({children, showCart, onClick}) => {

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