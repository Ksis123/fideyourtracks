import React, {useState} from 'react'
import ScaleLoader from "react-spinners/ScaleLoader"

function Spinner() {

  let [color] = useState("#ff6d38");
  return (
    <div className='absolute inset-0 bg-[#201c19ae] opacity-80 z-50 flex items-center justify-center'>
        <ScaleLoader
        color={color}
        height={120}
        width={35}
        radius={10}
        margin={4}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner