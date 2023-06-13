import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
    
    var mykey = config.MY_KEY;
    
    const [query, setQuery] = useState('');
    const [container, setContainer] = useState([]);
    const [endPoint, setEndpoint] = useState('');

    const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=+${query}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': mykey,
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };
    
    const fetchData = () => {
        fetch(url, options)
            .then(response => response.json())
            .then(data => query && setContainer(data.hints))
            .catch(error => {
                console.log(error);
            })
    }
    
    useEffect(() => {
        fetchData()
    }, [endPoint])

    function handleChange(event) {
        setQuery(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault(); // prevent page refresh on form submit
        setEndpoint(query)
    }

    return (
        <div className="App">
            <h1>Search your favourite Food 🍕</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" value={query} />
                <button type="submit">Submit</button>
            </form>
            <div className="element">
                {
                    container.map((item, index) => {
                        return (
                            <div key={index} className='element-div'>
                                <img src={item.food.image} alt='image not found: 404' />
                                <p>{item.food.label}</p>
                            </div>
                        )
                    })
                }
            </div>
            {/* <img src="https://m.media-amazon.com/images/I/41Xe96WtZoL._SX300_SY300_QL70_FMwebp_.jpg" alt="" /> */}
        </div>
    )
}

export default App

/* 
api used: https://rapidapi.com/edamam/api/edamam-food-and-grocery-database/
 */