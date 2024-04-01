const BackgroundBlur = ({children, onClick}) => {
  return (
    <>
        <div  
            className="fixed right-0 top-0 h-screen w-screen bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            onClick={onClick}
        />
        { children }
    </>
  )
}

export default BackgroundBlur