import React, { useState } from 'react'

export default function Counter() {

    const [count,setCount] = useState(0);
    
    const handleIncrement = () => {
        setCount(count + 1)
    };

    const handleDecrement = () => {
        if(count > 0){
            setCount(count - 1)
        }
    };
  
    return (
    <div>
        <h2 className="text-3xl font-bold text-red-700">Counter : {count}</h2>
        <button onClick={handleIncrement}>Augmenter</button>
        <button onClick={handleDecrement}>Enlever</button>
    </div>
  )
}
