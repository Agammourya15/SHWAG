import React from 'react'
import WomenClothingAccessories from '../assets/WomenClothingAccessories.mp4'   

const Video = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video 
        className="w-full h-full object-cover"
        src={WomenClothingAccessories} 
        autoPlay 
        loop 
        muted 
        playsInline
      />
    </div>
  )
}

export default Video