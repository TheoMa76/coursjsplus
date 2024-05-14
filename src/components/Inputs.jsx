import React from 'react'

export default function Inputs({placeholder,type,value}) {
  return (
    <div>
     <input
                type={type}
                placeholder={placeholder}
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 '
                value={value}
            />
    </div>
  )
}
