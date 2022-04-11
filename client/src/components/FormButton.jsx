
import React from 'react'

function FormButton({handleOnClick, bgColor, textColor, title}) {
  return (
        <button onClick={handleOnClick} className={`uppercase ${bgColor} hover:bg-${bgColor}-500 text-md ${textColor} font-bold px-4 py-2 my-4 rounded-lg shadow-md`}>
            {title}
        </button>
  )
}

export default FormButton