import React from 'react';
import "./TodoSearch.css";

function TodoSearch({
    searchValue,
    setSearchValue,
}) {
    
    return (
        <input
            className= 'TodoSearch'
            placeholder="Ir al supermercado"
            value= {searchValue}
            onChange={(event) => {
                setSearchValue(event.target.value);
            }}
        />
    );
}
export { TodoSearch };