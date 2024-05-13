import React from 'react'

export default function Inputs({placeholder,type,value}) {
  return (
    <div>
    <input type={type} 
                value={value}
                placeholder={placeholder}/>
    </div>
  )
}
