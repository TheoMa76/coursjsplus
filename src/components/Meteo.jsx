import React, { useEffect, useState } from 'react'

export default function Meteo() {
    const [meteo, setMeteo] = useState(null);
    const [ville, setVille] = useState('');
    const [searchTerm,setInputVille] = useState("");

    const handleChange = (e) =>{
        console.log(e.target.value);
        setInputVille(e.target.value)
    }

        const handleSubmit = () => {
            fetch(`http://api.weatherapi.com/v1/current.json?key=a30b41515ad64a2a95671152241405&q=${searchTerm}&aqi=yes`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.current)
                    setMeteo(data.current);
                    setVille(data.location);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };

        return (
            <>
                <input type="search" className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ' value={searchTerm} onChange={handleChange} />
                <button onClick={handleSubmit}>Chercher</button>
                {meteo && (
                    <div>
                        <h2>Météo à {ville.name}</h2>
                        <p>Température actuelle : {meteo.temp_c}°C</p>
                        <p>Condition : {meteo.condition.text}</p>
                    </div>
                )}
            </>
        );
    }
