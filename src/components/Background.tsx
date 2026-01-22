export const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700">
      {/* Abstract 3D shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Large C shape - top left */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
        
        {/* N shape - mid left */}
        <div className="absolute top-[20%] left-[-3%] w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-[35%] left-[5%] w-64 h-64 bg-blue-300/30 rounded-full blur-3xl" />
        
        {/* Curved tube - mid right */}
        <div className="absolute top-[30%] right-[10%] w-72 h-96 bg-blue-800/40 rounded-full blur-3xl transform rotate-45" />
        
        {/* Large curved shape - bottom left */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-3xl" />
        
        {/* Small wavy shapes - bottom right */}
        <div className="absolute bottom-[15%] right-[15%] w-48 h-48 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[25%] right-[25%] w-40 h-40 bg-blue-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-blue-200/40 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

